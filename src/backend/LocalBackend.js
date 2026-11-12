/* My Mechanic — backend/LocalBackend.js. Restored from the production build of the existing app. */
/* eslint-disable */
const __RN = require("react-native");
const __rn = (name) => ({ __esModule: true, default: __RN[name] });
const __deps = [
  require("@react-native-async-storage/async-storage"),
  __rn("Platform"),
  require("../state/seed"),
  require("../utils/security"),
  require("../utils/helpers"),
];
(function (g, r, i, a, m, _e, d) {
  "use strict";
  (Object.defineProperty(_e, "__esModule", { value: !0 }),
    Object.defineProperty(_e, "LocalBackend", {
      enumerable: !0,
      get: function () {
        return f;
      },
    }),
    Object.defineProperty(_e, "localBackend", {
      enumerable: !0,
      get: function () {
        return y;
      },
    }));
  var e,
    t = r(d[0]),
    s = (e = t) && e.__esModule ? e : { default: e };
  r(d[1]);
  var n = r(d[2]),
    o = r(d[3]),
    c = r(d[4]);
  const l = "mm.state.v1",
    h = "mm.credentials.v1",
    u = "mm.reset_codes.v1",
    p = "mm.session.v1";
  function w(e, t) {
    const s = t.trim().toLowerCase(),
      n = (0, c.normalizePhone)(t);
    return (
      [...e.admins, ...e.mechanics, ...e.clients].find(
        (e) =>
          e.email.toLowerCase() === s ||
          (n.length > 5 && (0, c.normalizePhone)(e.phone) === n),
      ) ?? null
    );
  }
  class f {
    mode = "local";
    state = (0, n.createSeedState)();
    credentials = {};
    resetCodes = {};
    listeners = new Set();
    ready = !1;
    channel = null;
    emit() {
      if ((this.listeners.forEach((e) => e(this.state)), this.channel)) {
        const { session: e, ...t } = this.state;
        this.channel.postMessage(t);
      }
    }
    async persistState() {
      const { session: e, ...t } = this.state;
      await s.default.setItem(l, JSON.stringify(t));
    }
    async persistCredentials() {
      await s.default.setItem(h, JSON.stringify(this.credentials));
    }
    async persistResetCodes() {
      await s.default.setItem(u, JSON.stringify(this.resetCodes));
    }
    async persistSession() {
      this.state.session
        ? await o.secureStorage.setItem(p, JSON.stringify(this.state.session))
        : await o.secureStorage.removeItem(p);
    }
    async seedCredentialsIfNeeded() {
      let e = !1;
      for (const [t, s] of [
        [n.ADMIN_ID, n.demoCredentials.admin],
        ["mech-1", n.demoCredentials.mechanic],
        ["client-1", n.demoCredentials.client],
      ])
        this.credentials[t] ||
          ((this.credentials[t] = {
            ...(await (0, o.hashPassword)(s.password)),
            updatedAt: new Date().toISOString(),
          }),
          (e = !0));
      e && (await this.persistCredentials());
    }
    async init() {
      if (this.ready) return this.state;
      try {
        const [e, t, c, f] = await Promise.all([
          s.default.getItem(l),
          s.default.getItem(h),
          s.default.getItem(u),
          o.secureStorage.getItem(p),
        ]);
        if (e) {
          const t = JSON.parse(e);
          (0, n.isValidAppState)({ ...t, session: null }) &&
            (this.state = {
              ...t,
              liveLocations: Array.isArray(t.liveLocations)
                ? t.liveLocations.filter((location) => location.role === "mechanic")
                : (0, n.createSeedState)().liveLocations.filter((location) => location.role === "mechanic"),
              clients: (t.clients ?? []).map(({ latitude, longitude, ...client }) => client),
              session: null,
            });
        }
        if (
          (t && (this.credentials = JSON.parse(t)),
          c && (this.resetCodes = JSON.parse(c)),
          f)
        ) {
          const e = JSON.parse(f);
          w(this.state, e.email) &&
            (this.state = { ...this.state, session: e });
        }
      } catch {
        this.state = (0, n.createSeedState)();
      }
      return (
        await this.seedCredentialsIfNeeded(),
        "undefined" != typeof BroadcastChannel &&
          ((this.channel = new BroadcastChannel("my-mechanic-local-live")),
          (this.channel.onmessage = (e) => {
            e.data &&
              Array.isArray(e.data.clients) &&
              ((this.state = { ...e.data, session: this.state.session }),
              this.listeners.forEach((e) => e(this.state)));
          })),
        (this.ready = !0),
        this.state
      );
    }
    destroy() {
      (this.channel?.close(), (this.channel = null), this.listeners.clear());
    }
    subscribe(e) {
      return (
        this.listeners.add(e),
        () => {
          this.listeners.delete(e);
        }
      );
    }
    async update(e) {
      ((this.state = e(this.state)), await this.persistState(), this.emit());
    }
    async signUpDriver(e) {
      const t = e.email.trim().toLowerCase(),
        s = e.phone.trim(),
        n = e.name.trim();
      if (!(n && t && s && e.password))
        return { error: "Please complete every field." };
      if (w(this.state, t) || w(this.state, s))
        return { error: "An account with this email or phone already exists." };
      const l = (0, c.makeId)("client"),
        h = {
          id: l,
          role: "client",
          name: n,
          email: t,
          phone: s,
          address: "",
          preferredContact: "Phone",
          cars: [],
          color: "#C8E8DA",
          status: "active",
          createdAt: new Date().toISOString(),
        };
      ((this.credentials[l] = {
        ...(await (0, o.hashPassword)(e.password)),
        updatedAt: new Date().toISOString(),
      }),
        await this.persistCredentials(),
        await this.update((e) => ({ ...e, clients: [h, ...e.clients] })));
      const u = { userId: l, role: "client", name: n, email: t };
      return (
        await this.update((e) => ({ ...e, session: u })),
        await this.persistSession(),
        { message: "Your driver account is now visible to the whole network." }
      );
    }
    async signIn(e, t) {
      const s = w(this.state, e);
      if (!s) return { error: "No account found with these details." };
      if ("blocked" === s.status)
        return {
          error:
            "This account has been blocked by an administrator. Contact support for help.",
        };
      const n = this.credentials[s.id];
      if (!n)
        return {
          error:
            "This account has no password set yet. Use \u201cForgot password\u201d to set one.",
        };
      if (!(await (0, o.verifyPassword)(t, n.hash, n.salt)))
        return { error: "Incorrect password. Please try again." };
      const c = { userId: s.id, role: s.role, name: s.name, email: s.email };
      return (
        await this.update((e) => ({ ...e, session: c })),
        await this.persistSession(),
        {}
      );
    }
    async signOut() {
      (await this.update((e) => ({ ...e, session: null })),
        await this.persistSession());
    }
    async requestPasswordReset(e) {
      const t = w(this.state, e);
      if (!t)
        return { error: "No account matches this email or phone number." };
      const s = (0, o.generateResetCode)();
      return (
        (this.resetCodes[t.id] = { code: s, expiresAt: Date.now() + 9e5 }),
        await this.persistResetCodes(),
        { devCode: s }
      );
    }
    async confirmPasswordReset(e, t, s) {
      const n = w(this.state, e);
      if (!n)
        return { error: "No account matches this email or phone number." };
      const c = this.resetCodes[n.id];
      return c && c.code === t.trim()
        ? Date.now() > c.expiresAt
          ? { error: "That reset code has expired. Request a new one." }
          : ((this.credentials[n.id] = {
              ...(await (0, o.hashPassword)(s)),
              updatedAt: new Date().toISOString(),
            }),
            delete this.resetCodes[n.id],
            await Promise.all([
              this.persistCredentials(),
              this.persistResetCodes(),
            ]),
            {})
        : { error: "That reset code is invalid." };
    }
    async changePassword(e, t) {
      const s = this.state.session;
      if (!s) return { error: "You must be signed in." };
      const n = this.credentials[s.userId];
      return n
        ? (await (0, o.verifyPassword)(e, n.hash, n.salt))
          ? ((this.credentials[s.userId] = {
              ...(await (0, o.hashPassword)(t)),
              updatedAt: new Date().toISOString(),
            }),
            await this.persistCredentials(),
            {})
          : { error: "Your current password is incorrect." }
        : { error: "No existing password found for this account." };
    }
    async createMechanicAccount(e) {
      const t = this.state.session;
      if (!t || "admin" !== t.role)
        return { error: "Only an administrator can create mechanic accounts." };
      const s = e.email.trim().toLowerCase();
      if (!e.name.trim() || !s || !e.phone.trim())
        return { error: "Name, email, and phone are required." };
      if (w(this.state, s) || w(this.state, e.phone))
        return { error: "An account with this email or phone already exists." };
      const n = (0, c.makeId)("mech"),
        l = ["#C8E8DA", "#F9C8B4", "#BFD7F7", "#D7C8F5", "#F5D491"],
        h = {
          id: n,
          role: "mechanic",
          name: e.name.trim(),
          email: s,
          phone: e.phone.trim(),
          specialization: e.specialization.trim() || "General repair",
          experienceYears: e.experienceYears || 0,
          color: l[this.state.mechanics.length % l.length],
          isActive: !0,
          status: "active",
          bio: e.bio.trim(),
          address: e.address.trim(),
          latitude: e.latitude,
          longitude: e.longitude,
          services: e.services.map((e) => ({ ...e, id: (0, c.makeId)("svc") })),
          availability: (0, c.buildAvailability)(this.state.mechanics.length),
          createdAt: new Date().toISOString(),
          createdBy: t.userId,
        },
        u = e.password?.trim() || (0, o.generateTempPassword)();
      return (
        (this.credentials[n] = {
          ...(await (0, o.hashPassword)(u)),
          updatedAt: new Date().toISOString(),
        }),
        await this.persistCredentials(),
        await this.update((e) => ({ ...e, mechanics: [h, ...e.mechanics] })),
        { id: n, tempPassword: u, message: "Mechanic account created." }
      );
    }
    async updateMechanic(e, t) {
      await this.update((s) => ({
        ...s,
        mechanics: s.mechanics.map((s) => (s.id === e ? { ...s, ...t } : s)),
      }));
    }
    async toggleMechanicActive(e) {
      const t = this.state.mechanics.find((t) => t.id === e);
      t && (await this.updateMechanic(e, { isActive: !t.isActive }));
    }
    async toggleAvailability(e, t, s) {
      const n = this.state.mechanics.find((t) => t.id === e);
      if (!n) return;
      const o = n.availability[t] ?? [];
      await this.setDayAvailability(
        e,
        t,
        o.includes(s) ? o.filter((e) => e !== s) : [...o, s].sort(),
      );
    }
    async setDayAvailability(e, t, s) {
      await this.update((n) => ({
        ...n,
        mechanics: n.mechanics.map((n) =>
          n.id === e
            ? { ...n, availability: { ...n.availability, [t]: [...s].sort() } }
            : n,
        ),
      }));
    }
    async bookAppointment(e) {
      if (
        this.state.appointments.some(
          (t) =>
            t.mechanicId === e.mechanicId &&
            t.date === e.date &&
            t.time === e.time &&
            ["pending", "accepted"].includes(t.status),
        )
      )
        return {
          error: "That time slot was just taken. Please choose another.",
        };
      const t = (0, c.makeId)("apt");
      return (
        await this.update((s) => ({
          ...s,
          appointments: [
            {
              ...e,
              id: t,
              status: "pending",
              createdAt: new Date().toISOString(),
            },
            ...s.appointments,
          ],
        })),
        { id: t }
      );
    }
    async setAppointmentStatus(e, t) {
      await this.update((s) => ({
        ...s,
        appointments: s.appointments.map((s) =>
          s.id === e ? { ...s, status: t } : s,
        ),
      }));
    }
    async updateClientProfile(e, t) {
      const { latitude, longitude, ...safeFields } = t;
      await this.update((s) => ({
        ...s,
        clients: s.clients.map((s) => (s.id === e ? { ...s, ...safeFields } : s)),
      }));
    }
    async saveCar(e, t) {
      await this.update((s) => ({
        ...s,
        clients: s.clients.map((s) => {
          if (s.id !== e) return s;
          const n = s.cars.some((e) => e.id === t.id);
          return {
            ...s,
            cars: n
              ? s.cars.map((e) => (e.id === t.id ? t : e))
              : [t, ...s.cars],
          };
        }),
      }));
    }
    async deleteCar(e, t) {
      await this.update((s) => ({
        ...s,
        clients: s.clients.map((s) =>
          s.id === e ? { ...s, cars: s.cars.filter((e) => e.id !== t) } : s,
        ),
      }));
    }
    async addReview(e) {
      await this.update((t) => ({
        ...t,
        reviews: [
          {
            ...e,
            id: (0, c.makeId)("rev"),
            date: new Date().toISOString().slice(0, 10),
          },
          ...t.reviews,
        ],
      }));
    }
    async blockUser(e) {
      await this.setStatus(e, "blocked");
    }
    async unblockUser(e) {
      await this.setStatus(e, "active");
    }
    async setStatus(e, t) {
      await this.update((s) => ({
        ...s,
        mechanics: s.mechanics.map((s) =>
          s.id === e ? { ...s, status: t } : s,
        ),
        clients: s.clients.map((s) => (s.id === e ? { ...s, status: t } : s)),
        liveLocations:
          "blocked" === t
            ? s.liveLocations.filter((t) => t.profileId !== e)
            : s.liveLocations,
      }));
    }
    async setLiveLocation(e) {
      const t = this.state.session;
      // Driver locations are never tracked or sent (no GPS, no live updates, no manual markers).
      if ("client" === t?.role || "client" === e.role || this.state.clients.some((c) => c.id === e.profileId))
        return { error: "Driver location sharing is turned off." };
      if (!t || ("admin" !== t.role && t.userId !== e.profileId))
        return { error: "You can only update your own location." };
      const s = { ...e, updatedAt: new Date().toISOString() };
      return (
        await this.update((t) => ({
          ...t,
          liveLocations: [
            ...t.liveLocations.filter((t) => t.profileId !== e.profileId),
            s,
          ],
          mechanics: t.mechanics.map((t) =>
            t.id === e.profileId
              ? { ...t, latitude: e.latitude, longitude: e.longitude }
              : t,
          ),
          clients: t.clients,
        })),
        { message: "Mechanic location saved." }
      );
    }
    async setLocationSharing() {
      return { error: "Live location sharing is disabled. Mechanic locations are fixed pins." };
    }
    getDirectory() {
      return (0, c.getDirectory)(this.state);
    }
    getStats() {
      return (0, c.getStats)(this.state);
    }
    async resetWorkspace() {
      ((this.state = (0, n.createSeedState)()),
        (this.credentials = {}),
        (this.resetCodes = {}),
        await this.seedCredentialsIfNeeded(),
        await Promise.all([
          this.persistState(),
          this.persistResetCodes(),
          this.persistSession(),
        ]),
        this.emit());
    }
  }
  const y = new f();
})(
  globalThis,
  (x) => x,
  (x) => (x && x.__esModule ? x.default : x),
  (x) => x,
  module,
  exports,
  __deps,
);
