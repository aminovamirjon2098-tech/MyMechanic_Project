-- My Mechanic — PROPOSED migration for the removal of prices. NOT applied automatically.
-- The app no longer reads, writes, shows or sorts by price. These columns still exist in Supabase:
--   public.services.price      (written by: nothing in the app any more; was admin-create-user + mechanic form)
--   public.appointments.price  (written by: nothing, except a 0 fallback while the column is NOT NULL)
-- Data is NOT deleted by steps 1–2. Run step 3 only after a backup, if you really want to drop the data.

-- Step 1 (safe, recommended): make the columns optional so inserts never need a price.
alter table public.services     alter column price drop not null;
alter table public.appointments alter column price drop not null;

-- Step 2 (optional): neutral default for any external tool still inserting rows.
-- alter table public.services     alter column price set default null;
-- alter table public.appointments alter column price set default null;

-- Step 3 (IRREVERSIBLE — only after a backup and after checking no views/functions use these columns):
-- create table if not exists public._backup_prices as
--   select 'services' as source, id, price from public.services
--   union all select 'appointments', id, price from public.appointments;
-- alter table public.services     drop column price;
-- alter table public.appointments drop column price;
