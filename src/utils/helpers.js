/* My Mechanic — utils/helpers.js. Restored from the production build of the existing app. */
/* eslint-disable */
const __i18n = require("../i18n/i18n");
const __locale = () =>
  ({ ru: "ru-RU", uz: "uz-Latn-UZ" })[__i18n.getLanguage()] || "en-US";
const __deps = [,];
(function (g, r, i, _a, m, e, d) {
  "use strict";
  (Object.defineProperty(e, "__esModule", { value: !0 }),
    Object.defineProperty(e, "DEFAULT_SLOTS", {
      enumerable: !0,
      get: function () {
        return t;
      },
    }),
    Object.defineProperty(e, "pad", {
      enumerable: !0,
      get: function () {
        return n;
      },
    }),
    Object.defineProperty(e, "toISODate", {
      enumerable: !0,
      get: function () {
        return a;
      },
    }),
    Object.defineProperty(e, "dateFromISO", {
      enumerable: !0,
      get: function () {
        return o;
      },
    }),
    Object.defineProperty(e, "addDays", {
      enumerable: !0,
      get: function () {
        return u;
      },
    }),
    Object.defineProperty(e, "formatDate", {
      enumerable: !0,
      get: function () {
        return c;
      },
    }),
    Object.defineProperty(e, "formatLongDate", {
      enumerable: !0,
      get: function () {
        return l;
      },
    }),
    Object.defineProperty(e, "formatDateTime", {
      enumerable: !0,
      get: function () {
        return s;
      },
    }),
    Object.defineProperty(e, "formatTimeAgo", {
      enumerable: !0,
      get: function () {
        return f;
      },
    }),
    Object.defineProperty(e, "monthKey", {
      enumerable: !0,
      get: function () {
        return b;
      },
    }),
    Object.defineProperty(e, "getLastMonths", {
      enumerable: !0,
      get: function () {
        return h;
      },
    }),
    Object.defineProperty(e, "initials", {
      enumerable: !0,
      get: function () {
        return p;
      },
    }),
    Object.defineProperty(e, "averageRating", {
      enumerable: !0,
      get: function () {
        return y;
      },
    }),
    Object.defineProperty(e, "currency", {
      enumerable: !0,
      get: function () {
        return P;
      },
    }),
    Object.defineProperty(e, "makeId", {
      enumerable: !0,
      get: function () {
        return O;
      },
    }),
    Object.defineProperty(e, "buildAvailability", {
      enumerable: !0,
      get: function () {
        return j;
      },
    }),
    Object.defineProperty(e, "distanceKm", {
      enumerable: !0,
      get: function () {
        return D;
      },
    }),
    Object.defineProperty(e, "maskEmail", {
      enumerable: !0,
      get: function () {
        return M;
      },
    }),
    Object.defineProperty(e, "normalizePhone", {
      enumerable: !0,
      get: function () {
        return w;
      },
    }),
    Object.defineProperty(e, "isValidEmail", {
      enumerable: !0,
      get: function () {
        return $;
      },
    }),
    Object.defineProperty(e, "isValidPhone", {
      enumerable: !0,
      get: function () {
        return S;
      },
    }),
    Object.defineProperty(e, "isStrongEnoughPassword", {
      enumerable: !0,
      get: function () {
        return I;
      },
    }),
    Object.defineProperty(e, "validCoordinate", {
      enumerable: !0,
      get: function () {
        return T;
      },
    }),
    Object.defineProperty(e, "getDirectory", {
      enumerable: !0,
      get: function () {
        return F;
      },
    }),
    Object.defineProperty(e, "getStats", {
      enumerable: !0,
      get: function () {
        return A;
      },
    }),
    Object.defineProperty(e, "appointmentTone", {
      enumerable: !0,
      get: function () {
        return U;
      },
    }),
    Object.defineProperty(e, "locationIsFresh", {
      enumerable: !0,
      get: function () {
        return k;
      },
    }),
    Object.defineProperty(e, "searchDirectory", {
      enumerable: !0,
      get: function () {
        return L;
      },
    }));
  const t = [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
    ],
    n = (t) => t.toString().padStart(2, "0"),
    a = (t) => `${t.getFullYear()}-${n(t.getMonth() + 1)}-${n(t.getDate())}`,
    o = (t) => {
      const [n, a, o] = t.slice(0, 10).split("-").map(Number);
      return new Date(n, (a || 1) - 1, o || 1);
    },
    u = (t, n) => {
      const u = "string" == typeof t ? o(t) : new Date(t);
      return (u.setDate(u.getDate() + n), a(u));
    },
    c = (t, n) =>
      new Intl.DateTimeFormat(
        __locale(),
        n ?? { weekday: "short", month: "short", day: "numeric" },
      ).format(o(t)),
    l = (t) =>
      c(t, { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
    s = (t) =>
      new Intl.DateTimeFormat(__locale(), {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date(t)),
    f = (t) => {
      const n = Math.max(
        0,
        Math.floor((Date.now() - new Date(t).getTime()) / 1e3),
      );
      return n < 45
        ? "just now"
        : n < 3600
          ? `${Math.floor(n / 60)} min ago`
          : n < 86400
            ? `${Math.floor(n / 3600)} hr ago`
            : c(t.slice(0, 10), { month: "short", day: "numeric" });
    },
    b = (t) => t.slice(0, 7),
    h = (t) => {
      const a = new Date();
      return Array.from({ length: t }, (o, u) => {
        const c = new Date(a.getFullYear(), a.getMonth() - (t - 1 - u), 1);
        return {
          key: `${c.getFullYear()}-${n(c.getMonth() + 1)}`,
          label: new Intl.DateTimeFormat(__locale(), { month: "short" }).format(c),
        };
      });
    },
    p = (t) =>
      t
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((t) => t[0])
        .join("")
        .toUpperCase(),
    y = (t, n) => {
      const a = n.filter((n) => n.mechanicId === t);
      return a.length ? a.reduce((t, n) => t + n.rating, 0) / a.length : 0;
    },
    P = (t) => `$${Math.round(t).toLocaleString("en-US")}`,
    O = (t) =>
      `${t}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    j = (n = 0, o = 28) => {
      const u = {},
        c = new Date();
      for (let l = 0; l < o; l += 1) {
        const o = new Date(c);
        o.setDate(o.getDate() + l);
        u[a(o)] =
          (l + n) % 7 == 0 ? [] : t.filter((t, a) => (a + n + l) % 3 != 0);
      }
      return u;
    },
    D = (t, n, a, o) => {
      const u = ((a - t) * Math.PI) / 180,
        c = ((o - n) * Math.PI) / 180,
        l =
          Math.sin(u / 2) ** 2 +
          Math.cos((t * Math.PI) / 180) *
            Math.cos((a * Math.PI) / 180) *
            Math.sin(c / 2) ** 2;
      return 12742 * Math.atan2(Math.sqrt(l), Math.sqrt(1 - l));
    },
    M = (t) => {
      const [n, a] = t.split("@");
      return a
        ? `${n.slice(0, Math.min(2, n.length))}${"*".repeat(Math.max(1, n.length - 2))}@${a}`
        : t;
    },
    w = (t) => t.replace(/[\s().-]/g, ""),
    $ = (t) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.trim()),
    S = (t) => /^[+\d][\d\s().-]{6,}$/.test(t.trim()),
    I = (t) => t.length >= 6,
    T = (t, n) =>
      Number.isFinite(t) &&
      Number.isFinite(n) &&
      Math.abs(t) <= 90 &&
      Math.abs(n) <= 180 &&
      (0 !== t || 0 !== n),
    F = (t) => {
      const n = (t, n) =>
        n.map((n) => ({
          id: n.id,
          role: t,
          name: n.name,
          email: n.email,
          phone: n.phone,
          status: n.status,
          createdAt: n.createdAt,
        }));
      return [
        ...n("admin", t.admins),
        ...n("mechanic", t.mechanics),
        ...n("client", t.clients),
      ].sort(
        (t, n) =>
          new Date(n.createdAt).getTime() - new Date(t.createdAt).getTime(),
      );
    },
    A = (t) => {
      const n = t.clients.length,
        a = t.mechanics.length,
        o = [...t.clients, ...t.mechanics].filter(
          (t) => "blocked" === t.status,
        ).length;
      return {
        totalUsers: n + a + t.admins.length,
        totalDrivers: n,
        totalMechanics: a,
        activeUsers: n + a - o,
        blockedUsers: o,
        totalOrders: t.appointments.length,
      };
    },
    U = (t) =>
      "pending" === t
        ? "orange"
        : "accepted" === t
          ? "blue"
          : "completed" === t
            ? "green"
            : "declined" === t
              ? "red"
              : "neutral",
    k = (t) => Date.now() - new Date(t.updatedAt).getTime() < 6e5,
    L = (t, n) => {
      const a = n.trim().toLowerCase();
      return a
        ? t.filter((t) =>
            `${t.name} ${t.phone} ${t.id} ${t.email}`.toLowerCase().includes(a),
          )
        : t;
    };
})(
  globalThis,
  (x) => x,
  (x) => (x && x.__esModule ? x.default : x),
  (x) => x,
  module,
  exports,
  __deps,
);
