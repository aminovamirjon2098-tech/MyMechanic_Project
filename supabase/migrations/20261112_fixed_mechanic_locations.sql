-- My Mechanic: fixed mechanic locations and safe table privileges.
-- Non-destructive: no rows or tables are deleted.

ALTER TABLE public.mechanic_profiles ENABLE ROW LEVEL SECURITY;

-- Harden the existing UPDATE trigger. Admins may edit mechanic records, but
-- any changed coordinates must still be valid. Mechanics may only change
-- latitude/longitude on their own row.
CREATE OR REPLACE FUNCTION public.enforce_mechanic_location_permissions()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $function$
DECLARE
  caller_role text;
  caller_status text;
BEGIN
  IF (auth.jwt() ->> 'role') = 'service_role' THEN
    RETURN NEW;
  END IF;

  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  SELECT p.role, p.status
  INTO caller_role, caller_status
  FROM public.profiles p
  WHERE p.id = auth.uid();

  IF caller_status IS DISTINCT FROM 'active' THEN
    RAISE EXCEPTION 'Active account required';
  END IF;

  -- Validate coordinates whenever either coordinate is changed.
  IF NEW.latitude IS DISTINCT FROM OLD.latitude
     OR NEW.longitude IS DISTINCT FROM OLD.longitude THEN
    IF NEW.latitude IS NULL OR NEW.longitude IS NULL
       OR NEW.latitude NOT BETWEEN -90 AND 90
       OR NEW.longitude NOT BETWEEN -180 AND 180 THEN
      RAISE EXCEPTION 'Invalid latitude or longitude';
    END IF;
  END IF;

  IF caller_role = 'admin' THEN
    RETURN NEW;
  END IF;

  IF caller_role IS DISTINCT FROM 'mechanic'
     OR NEW.profile_id IS DISTINCT FROM auth.uid() THEN
    RAISE EXCEPTION 'Not authorized to change this mechanic location';
  END IF;

  IF (to_jsonb(NEW) - 'latitude' - 'longitude')
     IS DISTINCT FROM
     (to_jsonb(OLD) - 'latitude' - 'longitude') THEN
    RAISE EXCEPTION 'Mechanics may only update their own coordinates';
  END IF;

  RETURN NEW;
END;
$function$;

-- Signed-in users need to read mechanic cards and fixed map coordinates.
-- Existing RLS policies continue to decide which rows may be read.
REVOKE ALL ON TABLE public.mechanic_profiles FROM anon;
GRANT SELECT ON TABLE public.mechanic_profiles TO authenticated;

-- Only administrators may use direct table UPDATEs for non-coordinate fields.
-- Mechanics must use update_my_mechanic_coordinates(); its SECURITY DEFINER
-- function performs the own-row and active-role checks server-side.
DROP POLICY IF EXISTS "Mechanics can update own profile" ON public.mechanic_profiles;
DROP POLICY IF EXISTS "Admins can update mechanic profiles" ON public.mechanic_profiles;
CREATE POLICY "Admins can update mechanic profiles"
  ON public.mechanic_profiles
  FOR UPDATE TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

GRANT UPDATE ON TABLE public.mechanic_profiles TO authenticated;

-- App users cannot create or delete mechanic profiles directly.
REVOKE INSERT, DELETE, TRUNCATE ON TABLE public.mechanic_profiles FROM anon, authenticated;

-- Server-side Edge Functions use service_role for account creation and rollback.
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.profiles TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.mechanic_profiles TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.services TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.mechanic_availability TO service_role;
