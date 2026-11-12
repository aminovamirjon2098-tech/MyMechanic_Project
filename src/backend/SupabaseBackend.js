/* My Mechanic — backend/SupabaseBackend.js. Restored from the production build of the existing app. */
/* eslint-disable */
const { createClient: __createClient } = require("@supabase/supabase-js");
const { readableSupabaseError: __readableError } = require("../config/supabase");
const __deps = [
  require("../state/seed"),
  require("../config/supabase"),
  require("../utils/helpers"),
];
(function (g, r, i, a, m, e, d) {
  "use strict";
  (Object.defineProperty(e, "__esModule", { value: !0 }),
    Object.defineProperty(e, "SupabaseBackend", {
      enumerable: !0,
      get: function () {
        return f;
      },
    }));
  var t = r(d[0]),
    s = r(d[1]),
    n = r(d[2]);
  const o =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  function c(t, s, n) {
    const o = {};
    n.filter((s) => s.mechanic_id === t.id).forEach((t) => {
      o[t.date] = t.slots ?? [];
    });
    const c = t.mechanic_profiles ?? {};
    return {
      id: t.id,
      role: "mechanic",
      name: t.name,
      email: t.email ?? "",
      phone: t.phone ?? "",
      specialization: c.specialization ?? "",
      experienceYears: c.experience_years ?? 0,
      color: c.color ?? "#C8E8DA",
      isActive: c.is_active ?? !0,
      isVerified: c.is_verified ?? !1,
      status: t.status ?? "active",
      bio: c.bio ?? "",
      address: c.address ?? "",
      latitude: Number(c.latitude ?? 0),
      longitude: Number(c.longitude ?? 0),
      services: s
        .filter((s) => s.mechanic_id === t.id)
        .map((t) => ({
          id: t.id,
          name: t.name,
          duration: t.duration,
        })),
      availability: o,
      createdAt: t.created_at,
      createdBy: c.created_by ?? "",
    };
  }
  function l(t, s) {
    return {
      id: t.id,
      role: "client",
      name: t.name,
      email: t.email ?? "",
      phone: t.phone ?? "",
      address: t.address ?? "",
      preferredContact: t.preferred_contact ?? "Phone",
      cars: s
        .filter((s) => s.client_id === t.id)
        .map((t) => ({
          id: t.id,
          make: t.make,
          model: t.model,
          year: t.year,
          plate: t.plate ?? "",
          vin: t.vin ?? "",
          mileage: Number(t.mileage ?? 0),
          fuel: t.fuel ?? "",
          color: t.color ?? "",
        })),
      color: t.color ?? "#F5D491",
      status: t.status ?? "active",
      createdAt: t.created_at,
    };
  }
  function h(t) {
    return {
      id: t.id,
      mechanicId: t.mechanic_id,
      clientId: t.client_id,
      serviceId: t.service_id ?? "",
      serviceName: t.service_name,
      carId: t.car_id ?? void 0,
      carLabel: t.car_label ?? "",
      date: t.date,
      time: t.time,
      duration: t.duration,
      note: t.note ?? "",
      status: t.status,
      createdAt: t.created_at,
    };
  }
  function p(t) {
    if (t) throw new Error((0, s.readableSupabaseError)(t.message));
  }
  class f {
    mode = "supabase";
    state = (0, t.emptyState)();
    listeners = new Set();
    channel = null;
    authSubscription = null;
    initialized = !1;
    refreshing = !1;
    refreshAgain = !1;
    constructor(t, n = () => {}) {
      ((this.onStatus = n), (this.client = (0, s.makeSupabaseClient)(t)), (this.__url = t.url.replace(/\/$/, "")), (this.__key = t.anonKey.trim()));
    }
    emit() {
      this.listeners.forEach((t) => t(this.state));
    }
    subscribe(t) {
      return (
        this.listeners.add(t),
        () => {
          this.listeners.delete(t);
        }
      );
    }
    async init() {
      this.onStatus("connecting");
      const { data: t, error: n } = await this.client.auth.getUser();
      if (n && !/auth session missing/i.test(n.message))
        throw new Error((0, s.readableSupabaseError)(n.message));
      t.user && (await this.__ensureClientProfile(t.user));
      if (
        ((this.currentUserId = t.user?.id),
        await this.refreshAll(this.currentUserId),
        !this.initialized)
      ) {
        this.setupRealtime();
        const { data: t } = this.client.auth.onAuthStateChange((t, s) => {
          if ("SIGNED_OUT" === t) {
            // Session ended (logout here, in another tab, or token revoked): clear it immediately.
            this.__clearSession();
            return;
          }
          ((this.currentUserId = s?.user?.id), this.queueRefresh());
        });
        ((this.authSubscription = t.subscription), (this.initialized = !0));
      }
      return this.state;
    }
    setupRealtime() {
      this.channel = this.client.channel("my-mechanic-live-network");
      for (const t of [
        "profiles",
        "mechanic_profiles",
        "services",
        "mechanic_availability",
        "cars",
        "appointments",
        "reviews",
      ])
        this.channel = this.channel.on(
          "postgres_changes",
          { event: "*", schema: "public", table: t },
          () => this.queueRefresh(),
        );
      this.channel = this.channel.subscribe((t) => {
          "SUBSCRIBED" === t
            ? this.onStatus("connected")
            : "CHANNEL_ERROR" === t || "TIMED_OUT" === t
              ? this.onStatus(
                  "reconnecting",
                  "Realtime is reconnecting. Data will refresh automatically.",
                )
              : "CLOSED" === t && this.onStatus("reconnecting");
        });
    }
    queueRefresh() {
      (this.refreshTimer && clearTimeout(this.refreshTimer),
        (this.refreshTimer = setTimeout(() => {
          this.refreshAll(this.currentUserId).catch((t) =>
            this.onStatus("error", t.message),
          );
        }, 120)));
    }
    // Serialized refresh: a caller that needs fresh data waits for the load that is already running
    // and then performs its own load, instead of receiving the stale this.state.
    async refreshAll(t) {
      for (; this.__inflight; ) {
        try {
          await this.__inflight;
        } catch {}
      }
      const run = this.__refreshOnce(t);
      this.__inflight = run;
      try {
        return await run;
      } finally {
        this.__inflight === run && (this.__inflight = null);
      }
    }
    async __refreshOnce(t) {
      this.refreshing = !0;
      try {
        const [s, n, o, f, v, w, _] = await Promise.all([
            this.client
              .from("profiles")
              .select("id,role,name,email,phone,address,preferred_contact,color,status,created_at")
              .order("created_at", { ascending: !1 }),
            this.client.from("mechanic_profiles").select("*"),
            this.client.from("services").select("*"),
            this.client.from("mechanic_availability").select("*"),
            this.client.from("cars").select("*"),
            this.client
              .from("appointments")
              .select("*")
              .order("created_at", { ascending: !1 }),
            this.client
              .from("reviews")
              .select("*")
              .order("date", { ascending: !1 }),
          ]),
          // Profiles are required; a failing secondary table (services, availability, cars,
          // reviews, live locations…) must not hide every mechanic from the Explore screen.
          y = s.error;
        p(y ?? null);
        const __secondary = [n, o, f, v, w, _].find((t) => t.error)?.error;
        __secondary &&
          console.warn("My Mechanic: partial data load —", __secondary.message);
        const I = s.data ?? [],
          S = new Map((n.data ?? []).map((t) => [t.profile_id, t])),
          A = I.filter((t) => "mechanic" === t.role).map((t) => ({
            ...t,
            mechanic_profiles: S.get(t.id),
          })),
          U = I.filter((t) => "client" === t.role);
        let E = this.state.session;
        // A refresh started before logout must not bring the old session back.
        t && this.currentUserId !== t && (t = void 0);
        if (t) {
          const s = I.find((s) => s.id === t);
          E = s
            ? { userId: s.id, role: s.role, name: s.name, email: s.email ?? "" }
            : null;
        } else E = null;
        return (
          (this.state = {
            mechanics: A.map((t) => c(t, o.data ?? [], f.data ?? [])),
            clients: U.map((t) => l(t, v.data ?? [])),
            appointments: (w.data ?? []).map(h),
            reviews: (_.data ?? []).map((t) => ({
              id: t.id,
              mechanicId: t.mechanic_id,
              clientId: t.client_id,
              clientName: t.client_name,
              appointmentId: t.appointment_id ?? void 0,
              rating: t.rating,
              comment: t.comment ?? "",
              serviceName: t.service_name ?? "",
              date: t.date,
            })),
            admins: I.filter((t) => "admin" === t.role).map((t) => ({
              id: t.id,
              role: "admin",
              name: t.name,
              email: t.email ?? "",
              phone: t.phone ?? "",
              status: t.status ?? "active",
              createdAt: t.created_at,
            })),
            // Fixed mechanic pins only; no driver locations and no live_locations table.
            liveLocations: A.filter((m) => "blocked" !== m.status && m.isActive !== false)
              .map((m) => {
                const mp = m.mechanic_profiles ?? {};
                const rawLat = mp.latitude ?? m.latitude;
                const rawLng = mp.longitude ?? m.longitude;
                const latitude = Number(rawLat);
                const longitude = Number(rawLng);
                return rawLat != null && rawLng != null &&
                  Number.isFinite(latitude) && Number.isFinite(longitude) &&
                  latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180 &&
                  !(latitude === 0 && longitude === 0)
                  ? { profileId: m.id, role: "mechanic", name: m.name, phone: m.phone ?? "", latitude, longitude, heading: 0, speed: 0, isSharing: true, updatedAt: m.created_at }
                  : null;
              }).filter(Boolean),
            session: E,
          }),
          this.emit(),
          this.onStatus(this.channel ? "connected" : "connecting"),
          this.state
        );
      } catch (t) {
        const s =
          t instanceof Error ? t.message : "Unable to load Supabase data.";
        throw (this.onStatus("error", s), t);
      } finally {
        this.refreshing = !1;
      }
    }
    // Creates the driver's profiles row if it is missing (e.g. sign-up with email confirmation,
    // where signUp returns no session). Role is fixed to "client"; never escalates.
    async __ensureClientProfile(u) {
      const m = u?.user_metadata ?? {};
      if (!u || ("client" !== m.role && m.role)) return null;
      const { data: ex } = await this.client.from("profiles").select("id").eq("id", u.id).maybeSingle();
      if (ex) return null;
      if ("client" !== m.role) return null;
      const { error: e } = await this.client.from("profiles").upsert(
        {
          id: u.id,
          role: "client",
          name: m.name || (u.email ?? "").split("@")[0] || "Driver",
          email: u.email ?? "",
          phone: m.phone || u.phone || "",
          address: "",
          preferred_contact: "Phone",
          color: "#C8E8DA",
          status: "active",
        },
        { onConflict: "id", ignoreDuplicates: !0 },
      );
      return e ? (0, s.readableSupabaseError)(e.message) : null;
    }
    async signUpDriver(t) {
      const n = t.email.trim().toLowerCase(),
        { data: o, error: c } = await this.client.auth.signUp({
          email: n,
          password: t.password,
          options: {
            data: {
              name: t.name.trim(),
              phone: t.phone.trim(),
              role: "client",
            },
            emailRedirectTo:
              "undefined" != typeof window && window.location?.origin
                ? window.location.origin
                : void 0,
          },
        });
      if (c) return { error: (0, s.readableSupabaseError)(c.message) };
      if (!o.user)
        return { error: "Supabase did not return a user. Please try again." };
      if (((this.currentUserId = o.user.id), o.session)) {
        const { error: c } = await this.client
          .from("profiles")
          .upsert(
            {
              id: o.user.id,
              role: "client",
              name: t.name.trim(),
              email: n,
              phone: t.phone.trim(),
              address: "",
              preferred_contact: "Phone",
              color: "#C8E8DA",
              status: "active",
            },
            { onConflict: "id" },
          );
        return c
          ? {
              error: `Account created, but the driver profile could not be saved: ${(0, s.readableSupabaseError)(c.message)}`,
            }
          : (await this.refreshAll(o.user.id),
            {
              message:
                "Driver registered successfully.",
            });
      }
      return (
        this.queueRefresh(),
        {
          message:
            "Account created. Confirm your email, then sign in. Your driver profile is already registered.",
        }
      );
    }
    async emailForIdentifier(t) {
      if (t.includes("@")) return t.trim().toLowerCase();
      const { data: s, error: n } = await this.client.rpc(
        "lookup_email_by_phone",
        { phone_input: t.trim() },
      );
      if (!n && "string" == typeof s && s) return s;
      const { data: o } = await this.client
        .from("profiles")
        .select("email")
        .eq("phone", t.trim())
        .limit(1);
      return o?.[0]?.email;
    }
    async signIn(t, s) {
      const o = await this.emailForIdentifier(t);
      if (!o && !t.includes("@"))
        return {
          error:
            "No account was found for this phone number. Sign in with the email address you registered with.",
        };
      const
        c = o
          ? { email: o, password: s }
          : { phone: (0, n.normalizePhone)(t), password: s },
        { data: l, error: h } = await this.client.auth.signInWithPassword(c);
      if (h && /not confirmed/i.test(h.message) && o) {
        await this.client.auth
          .resend({
            type: "signup",
            email: o,
            options: {
              emailRedirectTo:
                "undefined" != typeof window && window.location?.origin
                  ? window.location.origin
                  : void 0,
            },
          })
          .catch(() => {});
        return {
          error:
            "Your email is not confirmed yet. We sent a new confirmation link — open it, then sign in again.",
        };
      }
      if (h)
        return {
          error: /invalid login credentials/i.test(h.message)
            ? /@mymechanic\.app$/i.test(o || "")
              ? "Demo accounts (admin@mymechanic.app, mechanic@…, driver@…) exist only in local demo mode and are not in the online database. Sign in with your real Supabase administrator account."
              : "Incorrect email or password. Check them and try again, or use “Forgot password?”."
            : /not confirmed/i.test(h.message)
              ? "This email is not confirmed yet. Ask an administrator to confirm the account."
              : h.message,
        };
      let __profileErr = null;
      l.user && (__profileErr = await this.__ensureClientProfile(l.user));
      if (((this.currentUserId = l.user?.id), l.user)) {
        const t = l.user.user_metadata ?? {};
        "client" === t.role &&
          (await this.client
            .from("profiles")
            .upsert(
              {
                id: l.user.id,
                role: "client",
                name: t.name || l.user.email || "Driver",
                email: l.user.email ?? o ?? "",
                phone: t.phone || l.user.phone || "",
                status: "active",
              },
              { onConflict: "id", ignoreDuplicates: !0 },
            ));
      }
      const __uid = l.user?.id;
      // Fresh load for THIS user (waits for any refresh already in progress).
      await this.refreshAll(__uid);
      let __me = this.__findAccount(__uid);
      if (__uid && (!this.state.session || this.state.session.userId !== __uid || !__me)) {
        // Do not sign out because of a temporarily stale state: read the user's own profile row directly.
        const { data: __row, error: __rowErr } = await this.client
          .from("profiles")
          .select("*")
          .eq("id", __uid)
          .maybeSingle();
        if (__rowErr) {
          // Network / transient failure: keep the Supabase session and let realtime/refresh recover.
          this.queueRefresh();
          return {
            error: __readableError(__rowErr.message),
          };
        }
        if (__row) {
          await this.refreshAll(__uid);
          __me = this.__findAccount(__uid);
          if (!__me || this.state.session?.userId !== __uid) {
            // Profile exists but the bulk load did not include it: build the account from the row itself.
            __me = this.__accountFromRow(__row);
            __me && this.__mergeAccount(__me);
          }
        }
      }
      if (!__uid || !this.state.session || !__me) {
        return this.__rejectSignIn(
          __profileErr
            ? `Your account exists, but its profile could not be created: ${__profileErr}`
            : "admin" === l.user?.app_metadata?.role || "admin" === l.user?.user_metadata?.role
              ? "This administrator account has no admin profile in the database. Run supabase/migrations/20261110_admin_access.sql in the Supabase SQL Editor."
              : "Your account is signed in, but its profile was not found. Ask an administrator to check the mechanic account.",
        );
      }
      if ("blocked" === __me.status)
        // Security: blocked accounts are always rejected.
        return this.__rejectSignIn(
          "This account has been blocked by an administrator. Contact support for help.",
        );
      return {};
    }
    // Signs out and keeps the reason visible on the (re-mounted) sign-in screen.
    async __rejectSignIn(message) {
      await this.signOut();
      this.onStatus(this.channel ? "connected" : "connecting", message);
      return { error: message };
    }
    __findAccount(id) {
      return id
        ? [...this.state.mechanics, ...this.state.clients, ...this.state.admins].find((e) => e.id === id)
        : void 0;
    }
    // Builds an app account from the user's own profiles row. Role comes from the database row only;
    // unknown roles are rejected (no escalation).
    __accountFromRow(t) {
      return "admin" === t.role
        ? {
            id: t.id,
            role: "admin",
            name: t.name,
            email: t.email ?? "",
            phone: t.phone ?? "",
            status: t.status ?? "active",
            createdAt: t.created_at,
          }
        : "mechanic" === t.role
          ? c(t, [], [])
          : "client" === t.role
            ? l(t, [])
            : null;
    }
    __mergeAccount(a) {
      const key = "admin" === a.role ? "admins" : "mechanic" === a.role ? "mechanics" : "clients";
      ((this.state = {
        ...this.state,
        [key]: [a, ...this.state[key].filter((e) => e.id !== a.id)],
        session: { userId: a.id, role: a.role, name: a.name, email: a.email ?? "" },
      }),
        this.emit());
    }
    // Logout: 1) await supabase.auth.signOut()  2) clear the local user/session  (3: navigation reset in Store)
    async signOut() {
      let __err = null;
      try {
        const { error: e } = await this.client.auth.signOut();
        e && (__err = e);
      } catch (e) {
        __err = e;
      }
      // If the server call failed (e.g. offline), still remove the session stored on this device.
      __err && (await this.client.auth.signOut({ scope: "local" }).catch(() => {}));
      this.__clearSession();
    }
    __clearSession() {
      this.refreshTimer && (clearTimeout(this.refreshTimer), (this.refreshTimer = void 0));
      this.currentUserId = void 0;
      this.state = { ...this.state, session: null };
      this.emit();
    }
    async requestPasswordReset(t) {
      const s = await this.emailForIdentifier(t);
      if (!s)
        return {
          error:
            "No email is linked to this phone number. Contact an administrator for account recovery.",
        };
      const { error: n } = await this.client.auth.resetPasswordForEmail(s);
      return n
        ? { error: n.message }
        : { message: "Check your email for a secure reset link." };
    }
    async confirmPasswordReset(t, s, n) {
      const { error: o } = await this.client.auth.updateUser({ password: n });
      return o ? { error: o.message } : {};
    }
    async changePassword(t, s) {
      const { error: n } = await this.client.auth.updateUser({ password: s });
      return n ? { error: n.message } : {};
    }
    async createMechanicAccount(t) {
      const { data: s, error: n } = await this.client.functions.invoke(
        "admin-create-user",
        { body: { ...t, role: "mechanic" } },
      );
      if (n) {
        // Show the real server message (e.g. "email already registered") when available.
        let __msg = "";
        try {
          const __body = await n.context?.json?.();
          __msg = __body?.error || __body?.message || "";
        } catch {}
        return __msg
          ? { error: __msg }
          : {
              error: `The admin-create-user Edge Function is required. ${n.message}`,
            };
      }
      if (s?.error) return { error: s.error };
      // Verify the account really accepts the sign-in details, using a throw-away client that does not
      // touch the administrator's session. Catches an outdated server function that ignored the password.
      const __email = String(t.email || "").trim().toLowerCase(),
        __pass = String(s?.tempPassword || t.password || "");
      let __verify = "";
      if (__email && __pass) {
        try {
          const __probe = (0, __createClient)(this.__url, this.__key, {
            auth: { persistSession: !1, autoRefreshToken: !1, detectSessionInUrl: !1, storageKey: "mm-verify" },
          });
          const { error: __e } = await __probe.auth.signInWithPassword({ email: __email, password: __pass });
          __e
            ? (__verify = /not confirmed/i.test(__e.message)
                ? "The mechanic account was created, but its email is not confirmed, so sign-in is blocked. Deploy the updated admin-create-user function (it confirms the email) or confirm the user in Supabase → Authentication → Users."
                : "The mechanic account was created on the server, but this password does not work for sign-in. The deployed admin-create-user function is outdated and ignored the password. Deploy the updated function, or set the password in Supabase → Authentication → Users.")
            : await __probe.auth.signOut({ scope: "local" }).catch(() => {});
        } catch {}
      }
      await this.refreshAll((await this.client.auth.getUser()).data.user?.id);
      return __verify
        ? { error: __verify }
        : { id: s?.id, tempPassword: s?.tempPassword, message: "Mechanic account created." };
    }
    async updateMechanic(t, s) {
      const patch = {};
      if (s.specialization !== undefined) patch.specialization = s.specialization;
      if (s.experienceYears !== undefined) patch.experience_years = s.experienceYears;
      if (s.bio !== undefined) patch.bio = s.bio;
      if (s.address !== undefined) patch.address = s.address;
      if (s.isActive !== undefined) patch.is_active = s.isActive;
      if (Object.keys(patch).length) {
        p((await this.client.from("mechanic_profiles").update(patch).eq("profile_id", t)).error);
      }
      if (s.latitude !== undefined || s.longitude !== undefined) {
        const mechanic = this.state.mechanics.find((m) => m.id === t);
        const latitude = Number(s.latitude ?? mechanic?.latitude);
        const longitude = Number(s.longitude ?? mechanic?.longitude);
        if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) throw new Error("Invalid mechanic coordinates.");
        const { error } = await this.client.rpc("admin_update_mechanic_coordinates", { p_profile_id: t, p_latitude: latitude, p_longitude: longitude });
        p(error);
      }
      const profilePatch = {};
      if (s.name !== undefined) profilePatch.name = s.name;
      if (s.phone !== undefined) profilePatch.phone = s.phone;
      if (Object.keys(profilePatch).length) p((await this.client.from("profiles").update(profilePatch).eq("id", t)).error);
      await this.refreshAll(this.currentUserId);
    }
    async toggleMechanicActive(t) {
      const s = this.state.mechanics.find((s) => s.id === t);
      s && (await this.updateMechanic(t, { isActive: !s.isActive }));
    }
    async toggleAvailability(t, s, n) {
      const o = this.state.mechanics.find((s) => s.id === t),
        c = o?.availability[s] ?? [];
      await this.setDayAvailability(
        t,
        s,
        c.includes(n) ? c.filter((t) => t !== n) : [...c, n].sort(),
      );
    }
    async setDayAvailability(t, s, n) {
      (p(
        (
          await this.client
            .from("mechanic_availability")
            .upsert(
              { mechanic_id: t, date: s, slots: [...n].sort() },
              { onConflict: "mechanic_id,date" },
            )
        ).error,
      ),
        await this.refreshAll(this.currentUserId));
    }
    async bookAppointment(t) {
      const __row = {
          mechanic_id: t.mechanicId,
          client_id: t.clientId,
          service_id: o.test(t.serviceId) ? t.serviceId : null,
          service_name: t.serviceName,
          car_id: t.carId && o.test(t.carId) ? t.carId : null,
          car_label: t.carLabel,
          date: t.date,
          time: t.time,
          duration: t.duration,
          note: t.note,
          status: "pending",
        },
        __ins = (r) => this.client.from("appointments").insert(r).select().single();
      // Prices are no longer used. Compatibility: if the legacy appointments.price column is still
      // NOT NULL without a default, store a neutral 0 (never shown anywhere) until the migration runs.
      let { data: n, error: c } = await __ins(__row);
      c &&
        "23502" === c.code &&
        /price/i.test(c.message) &&
        ({ data: n, error: c } = await __ins({ ...__row, price: 0 }));
      return c
        ? { error: (0, s.readableSupabaseError)(c.message) }
        : (await this.refreshAll(this.currentUserId), { id: n.id });
    }
    async setAppointmentStatus(t, s) {
      (p(
        (
          await this.client
            .from("appointments")
            .update({ status: s })
            .eq("id", t)
        ).error,
      ),
        await this.refreshAll(this.currentUserId));
    }
    async updateClientProfile(t, s) {
      const n = {};
      (void 0 !== s.name && (n.name = s.name),
        void 0 !== s.phone && (n.phone = s.phone),
        void 0 !== s.address && (n.address = s.address),
        void 0 !== s.preferredContact &&
          (n.preferred_contact = s.preferredContact),
        p((await this.client.from("profiles").update(n).eq("id", t)).error),
        await this.refreshAll(this.currentUserId));
    }
    async saveCar(t, s) {
      (p(
        (
          await this.client
            .from("cars")
            .upsert({
              id: o.test(s.id) ? s.id : void 0,
              client_id: t,
              make: s.make,
              model: s.model,
              year: s.year,
              plate: s.plate,
              vin: s.vin,
              mileage: s.mileage,
              fuel: s.fuel,
              color: s.color,
            })
        ).error,
      ),
        await this.refreshAll(this.currentUserId));
    }
    async deleteCar(t, s) {
      (p(
        (await this.client.from("cars").delete().eq("id", s).eq("client_id", t))
          .error,
      ),
        await this.refreshAll(this.currentUserId));
    }
    async addReview(t) {
      (p(
        (
          await this.client
            .from("reviews")
            .insert({
              mechanic_id: t.mechanicId,
              client_id: t.clientId,
              client_name: t.clientName,
              appointment_id:
                t.appointmentId && o.test(t.appointmentId)
                  ? t.appointmentId
                  : null,
              rating: t.rating,
              comment: t.comment,
              service_name: t.serviceName,
            })
        ).error,
      ),
        await this.refreshAll(this.currentUserId));
    }
    async blockUser(t) {
      await this.setUserStatus(t, "blocked");
    }
    async unblockUser(t) {
      await this.setUserStatus(t, "active");
    }
    async setUserStatus(t, s) {
      (p(
        (await this.client.from("profiles").update({ status: s }).eq("id", t))
          .error,
      ),
        await this.refreshAll(this.currentUserId));
    }
    async setLiveLocation(t) {
      const session = this.state.session;
      if (!session) return { error: "Authentication required." };
      if (t.role !== "mechanic" || this.state.clients.some((client) => client.id === t.profileId)) return { error: "Only mechanic locations can be updated." };
      if (session.role !== "admin" && (session.role !== "mechanic" || session.userId !== t.profileId)) return { error: "You can only update your own mechanic location." };
      const latitude = Number(t.latitude), longitude = Number(t.longitude);
      if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) return { error: "Invalid latitude or longitude." };
      const isAdmin = session.role === "admin";
      const { error } = await this.client.rpc(isAdmin ? "admin_update_mechanic_coordinates" : "update_my_mechanic_coordinates", isAdmin ? { p_profile_id: t.profileId, p_latitude: latitude, p_longitude: longitude } : { p_latitude: latitude, p_longitude: longitude });
      if (error) return { error: (0, s.readableSupabaseError)(error.message) };
      await this.refreshAll(this.currentUserId);
      return { message: "Mechanic location updated." };
    }
    async setLocationSharing() {
      return { error: "Live location sharing is disabled. Mechanic locations are fixed pins." };
    }
    getDirectory() {
      return (0, n.getDirectory)(this.state);
    }
    getStats() {
      return (0, n.getStats)(this.state);
    }
    async resetWorkspace() {
      await this.refreshAll(this.currentUserId);
    }
    destroy() {
      (this.refreshTimer && clearTimeout(this.refreshTimer),
        this.channel && this.client.removeChannel(this.channel),
        this.authSubscription?.unsubscribe(),
        this.listeners.clear());
    }
  }
})(
  globalThis,
  (x) => x,
  (x) => (x && x.__esModule ? x.default : x),
  (x) => x,
  module,
  exports,
  __deps,
);
