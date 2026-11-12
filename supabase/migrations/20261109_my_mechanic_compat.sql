-- My Mechanic — NON-DESTRUCTIVE compatibility migration for the existing project ewdsginkjxltdlkysnri.
-- Verified on 2026-11-09 via the public REST API: all 8 tables and every column the app reads/writes
-- already exist. Only the RPC lookup_email_by_phone is missing (PGRST202). Nothing here drops or
-- rewrites data; every statement is idempotent (IF NOT EXISTS / CREATE OR REPLACE / DO-blocks).

-- 1) Phone sign-in helper used by SupabaseBackend.emailForIdentifier()
create or replace function public.lookup_email_by_phone(phone_input text)
returns text language sql stable security definer set search_path = public as $$
  select email from public.profiles
  where regexp_replace(phone, '[^0-9+]', '', 'g') = regexp_replace(phone_input, '[^0-9+]', '', 'g')
  limit 1;
$$;
grant execute on function public.lookup_email_by_phone(text) to anon, authenticated;

-- 2) Upsert targets the app relies on (only added when missing)
do $$ begin
  if not exists (select 1 from pg_indexes where schemaname='public' and indexname='mechanic_availability_mechanic_date_key') then
    create unique index mechanic_availability_mechanic_date_key on public.mechanic_availability (mechanic_id, date);
  end if;
  if not exists (select 1 from pg_indexes where schemaname='public' and indexname='live_locations_profile_id_key') then
    create unique index live_locations_profile_id_key on public.live_locations (profile_id);
  end if;
  if not exists (select 1 from pg_indexes where schemaname='public' and indexname='mechanic_profiles_profile_id_key') then
    create unique index mechanic_profiles_profile_id_key on public.mechanic_profiles (profile_id);
  end if;
end $$;

-- 3) Helper for policies (role is read from profiles, never from the client)
create or replace function public.mm_is_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin' and coalesce(status,'active') <> 'blocked');
$$;

-- 4) RLS policies — ADDED only if a policy with the same name does not exist. Existing policies are kept.
do $$
declare t text;
begin
  foreach t in array array['profiles','mechanic_profiles','services','mechanic_availability','cars','appointments','reviews','live_locations'] loop
    execute format('alter table public.%I enable row level security', t);
    if not exists (select 1 from pg_policies where schemaname='public' and tablename=t and policyname='mm_read_signed_in') then
      execute format('create policy mm_read_signed_in on public.%I for select to authenticated using (true)', t);
    end if;
    if not exists (select 1 from pg_policies where schemaname='public' and tablename=t and policyname='mm_admin_all') then
      execute format('create policy mm_admin_all on public.%I for all to authenticated using (public.mm_is_admin()) with check (public.mm_is_admin())', t);
    end if;
  end loop;

  if not exists (select 1 from pg_policies where schemaname='public' and tablename='profiles' and policyname='mm_profiles_self') then
    create policy mm_profiles_self on public.profiles for all to authenticated using (id = auth.uid()) with check (id = auth.uid() and role = 'client' or (id = auth.uid() and role = (select p.role from public.profiles p where p.id = auth.uid())));
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='mechanic_profiles' and policyname='mm_mechanic_self') then
    create policy mm_mechanic_self on public.mechanic_profiles for update to authenticated using (profile_id = auth.uid()) with check (profile_id = auth.uid());
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='mechanic_availability' and policyname='mm_availability_self') then
    create policy mm_availability_self on public.mechanic_availability for all to authenticated using (mechanic_id = auth.uid()) with check (mechanic_id = auth.uid());
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='services' and policyname='mm_services_self') then
    create policy mm_services_self on public.services for all to authenticated using (mechanic_id = auth.uid()) with check (mechanic_id = auth.uid());
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='cars' and policyname='mm_cars_owner') then
    create policy mm_cars_owner on public.cars for all to authenticated using (client_id = auth.uid()) with check (client_id = auth.uid());
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='appointments' and policyname='mm_appointments_parties') then
    create policy mm_appointments_parties on public.appointments for all to authenticated
      using (client_id = auth.uid() or mechanic_id = auth.uid()) with check (client_id = auth.uid() or mechanic_id = auth.uid());
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='reviews' and policyname='mm_reviews_author') then
    create policy mm_reviews_author on public.reviews for insert to authenticated with check (client_id = auth.uid());
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='live_locations' and policyname='mm_live_self') then
    create policy mm_live_self on public.live_locations for all to authenticated using (profile_id = auth.uid()) with check (profile_id = auth.uid());
  end if;
end $$;

-- 5) Realtime publication (added only when missing)
do $$
declare t text;
begin
  foreach t in array array['profiles','mechanic_profiles','services','mechanic_availability','cars','appointments','reviews','live_locations'] loop
    if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename=t) then
      execute format('alter publication supabase_realtime add table public.%I', t);
    end if;
  end loop;
end $$;

-- 6) Driver profile on sign-up (works with email confirmation ON, when the app gets no session).
--    Only creates a 'client' row when none exists; never touches existing rows or admin/mechanic accounts.
create or replace function public.mm_handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if coalesce(new.raw_user_meta_data->>'role', 'client') = 'client'
     and coalesce(new.raw_app_meta_data->>'role', '') = '' then
    insert into public.profiles (id, role, name, email, phone, status)
    values (new.id, 'client',
            coalesce(nullif(new.raw_user_meta_data->>'name', ''), split_part(new.email, '@', 1)),
            new.email, coalesce(new.raw_user_meta_data->>'phone', ''), 'active')
    on conflict (id) do nothing;
  end if;
  return new;
end $$;
do $$ begin
  if not exists (select 1 from pg_trigger where tgname = 'mm_on_auth_user_created') then
    create trigger mm_on_auth_user_created after insert on auth.users
      for each row execute function public.mm_handle_new_user();
  end if;
end $$;
