/* My Mechanic — theme.js. Restored from the production build of the existing app. */
/* eslint-disable */
const __deps = [,];
(function (g, r, i, a, m, e, d) {
  "use strict";
  (Object.defineProperty(e, "__esModule", { value: !0 }),
    Object.defineProperty(e, "colors", {
      enumerable: !0,
      get: function () {
        return t;
      },
    }),
    Object.defineProperty(e, "spacing", {
      enumerable: !0,
      get: function () {
        return n;
      },
    }),
    Object.defineProperty(e, "radius", {
      enumerable: !0,
      get: function () {
        return o;
      },
    }),
    Object.defineProperty(e, "shadow", {
      enumerable: !0,
      get: function () {
        return l;
      },
    }),
    Object.defineProperty(e, "statusColor", {
      enumerable: !0,
      get: function () {
        return u;
      },
    }));
  const t = {
      ink: "#16221B",
      inkSoft: "#29372F",
      lime: "#C8F16F",
      limeDark: "#92BE3E",
      canvas: "#F4F5F0",
      card: "#FFFFFF",
      text: "#17211B",
      muted: "#707A73",
      faint: "#9AA39D",
      line: "#E4E8E1",
      softGreen: "#EDF5E5",
      orange: "#F47A4A",
      softOrange: "#FFF0E9",
      blue: "#527ED8",
      softBlue: "#ECF2FD",
      red: "#CF5B55",
      softRed: "#FCECEB",
      yellow: "#E8AD3D",
      white: "#FFFFFF",
      black: "#000000",
    },
    n = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 },
    o = { sm: 10, md: 14, lg: 20, xl: 28, pill: 999 },
    l = {
      shadowColor: "#15251B",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.06,
      shadowRadius: 14,
      elevation: 2,
    },
    u = {
      pending: t.orange,
      accepted: t.blue,
      completed: "#56852D",
      declined: t.red,
      cancelled: t.muted,
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
