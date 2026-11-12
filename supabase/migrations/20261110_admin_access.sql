-- My Mechanic — restore / grant ADMINISTRATOR access (non-destructive).
-- Run in Supabase → SQL Editor. Replace the e-mail below with the administrator's e-mail.
--
-- Why: the app now always uses the online Supabase project. The old demo login
-- admin@mymechanic.app existed only in the local demo mode, so it cannot sign in online.
-- An administrator is a normal Supabase Auth user whose row in public.profiles has role = 'admin'.
--
-- If the administrator has no Auth user yet: register once in the app via
-- "Create a driver account" (or Supabase → Authentication → Users → Add user, "Auto Confirm"),
-- then run this script. It never deletes data and only touches the one account below.

do $$
declare
  admin_email text := 'YOUR-ADMIN-EMAIL@example.com';   -- <<< change this
  uid uuid;
begin
  select id into uid from auth.users where lower(email) = lower(admin_email) limit 1;
  if uid is null then
    raise exception 'No Supabase Auth user with e-mail %. Create the user first (see comments above).', admin_email;
  end if;

  -- confirm the e-mail so password sign-in is allowed
  update auth.users
     set email_confirmed_at = coalesce(email_confirmed_at, now()),
         raw_app_meta_data  = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
   where id = uid;

  -- create or promote the profile row
  insert into public.profiles (id, role, name, email, status)
  values (uid, 'admin', split_part(admin_email, '@', 1), admin_email, 'active')
  on conflict (id) do update set role = 'admin', status = 'active';

  raise notice 'User % (%) is now an active administrator.', admin_email, uid;
end $$;

-- Check: select id, email, role, status from public.profiles where role = 'admin';
