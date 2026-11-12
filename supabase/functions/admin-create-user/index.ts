// Supabase Edge Function: admin-create-user (Deno).
// Contract used by the app (src/backend/SupabaseBackend.js -> createMechanicAccount):
//   body = { name, email, phone, specialization, experienceYears, bio, address,
//            latitude, longitude, password, services: [{ name, duration }], role: 'mechanic' }
//   200 -> { id, message }      error -> { error }
// The admin sets the mechanic's PERMANENT password; the account is email-confirmed, so the mechanic
// signs in immediately with email + password. No email / password-setup step.
// The service-role key is read from the function environment only — never shipped to the app.
import { createClient } from 'npm:@supabase/supabase-js@2';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
const COLORS = ['#C8E8DA', '#F9C8B4', '#BFD7F7', '#D7C8F5', '#F5D491'];
const SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') return json(405, { error: 'POST only' });
  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let b: Record<string, any>;
  try { b = await req.json(); } catch { return json(400, { error: 'Body must be JSON.' }); }

  // 1. Caller must be a signed-in administrator (role read from public.profiles, never from the request).
  const jwt = (req.headers.get('Authorization') ?? '').replace(/^Bearer\s+/i, '');
  const { data: caller } = await admin.auth.getUser(jwt);
  if (!caller?.user) return json(401, { error: 'Invalid administrator session.' });
  const { data: callerProfile } = await admin.from('profiles').select('role,status').eq('id', caller.user.id).maybeSingle();
  if (callerProfile?.role !== 'admin' || callerProfile?.status !== 'active')
    return json(403, { error: 'Only an administrator can create mechanic accounts.' });

  // 2. Validate input.
  const name = String(b.name ?? '').trim();
  const email = String(b.email ?? '').trim().toLowerCase();
  const phone = String(b.phone ?? '').trim();
  const password = String(b.password ?? '');
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !phone)
    return json(400, { error: 'Name, email, and phone are required.' });
  if (password.trim().length < 6) return json(400, { error: 'Set a sign-in password of at least 6 characters.' });
  const hasCoords = b.latitude !== undefined && b.latitude !== null || b.longitude !== undefined && b.longitude !== null;
  const lat = Number(b.latitude), lng = Number(b.longitude);
  if (hasCoords && (!Number.isFinite(lat) || !Number.isFinite(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180))
    return json(400, { error: 'Provide valid latitude and longitude coordinates.' });

  // 3. No duplicate accounts.
  const { data: dup } = await admin.from('profiles').select('id').or(`email.ilike.${email},phone.eq.${phone}`).limit(1);
  if (dup?.length) return json(409, { error: 'An account with this email or phone already exists.' });

  // 4. Auth user with the admin-chosen permanent password, email pre-confirmed.
  const created = await admin.auth.admin.createUser({
    email, password, email_confirm: true,
    user_metadata: { name, phone, role: 'mechanic' },
    app_metadata: { role: 'mechanic' },
  });
  if (created.error || !created.data.user) {
    const msg = created.error?.message ?? 'User was not created.';
    return json(/already|exists|registered/i.test(msg) ? 409 : 500, {
      error: /already|exists|registered/i.test(msg) ? 'An account with this email or phone already exists.' : msg,
    });
  }
  const id = created.data.user.id;

  try {
    const { count } = await admin.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'mechanic');
    const color = COLORS[(count ?? 0) % COLORS.length];
    const coords = Number.isFinite(lat) && Number.isFinite(lng) ? { latitude: lat, longitude: lng } : {};
    let r = await admin.from('profiles').upsert({
      id, role: 'mechanic', name, email, phone, status: 'active', address: String(b.address ?? ''), color,
    });
    if (r.error) throw r.error;
    r = await admin.from('mechanic_profiles').upsert({
      profile_id: id,
      specialization: String(b.specialization ?? 'General repair'),
      experience_years: Number(b.experienceYears) || 0,
      bio: String(b.bio ?? ''), address: String(b.address ?? ''),
      color, is_active: true, is_verified: true, created_by: caller.user.id, ...coords,
    }, { onConflict: 'profile_id' });
    if (r.error) throw r.error;
    const services = (Array.isArray(b.services) ? b.services : [])
      .filter((s: any) => String(s?.name ?? '').trim())
      .map((s: any) => ({ mechanic_id: id, name: String(s.name).trim(), duration: Number(s.duration) || 60 }));
    if (services.length) {
      // Prices are not used by the app. Legacy compatibility: if services.price is still NOT NULL, store 0.
      r = await admin.from('services').insert(services);
      if (r.error && r.error.code === '23502' && /price/i.test(r.error.message))
        r = await admin.from('services').insert(services.map((x: any) => ({ ...x, price: 0 })));
      if (r.error) throw r.error;
    }
    // 28 days of default availability, like the local backend's buildAvailability().
    const days = Array.from({ length: 28 }, (_, i) => {
      const d = new Date(Date.now() + i * 86400000);
      return { mechanic_id: id, date: d.toISOString().slice(0, 10), slots: d.getUTCDay() === 0 ? [] : SLOTS };
    });
    r = await admin.from('mechanic_availability').upsert(days, { onConflict: 'mechanic_id,date' });
    if (r.error) throw r.error;
  } catch (e) {
    // Roll back so no half-created account remains.
    await admin.from('mechanic_availability').delete().eq('mechanic_id', id);
    await admin.from('services').delete().eq('mechanic_id', id);
    await admin.from('mechanic_profiles').delete().eq('profile_id', id);
    await admin.from('profiles').delete().eq('id', id);
    await admin.auth.admin.deleteUser(id);
    return json(500, { error: `Mechanic account was not created: ${(e as Error).message ?? e}` });
  }
  return json(200, { id, message: 'Mechanic account created.' });
});
