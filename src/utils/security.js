/* My Mechanic — utils/security.js. Restored from the production build of the existing app. */
/* eslint-disable */
const __RN = require("react-native");
const __rn = (name) => ({ __esModule: true, default: __RN[name] });
const __deps = [
  require("@react-native-async-storage/async-storage"),
  require("expo-secure-store"),
  __rn("Platform"),
  require("expo-crypto"),
  require("./helpers"),
];
(function (g, r, i, a, m, _e, _d) {
  "use strict";
  function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    return (
      e &&
        Object.keys(e).forEach(function (n) {
          var o = Object.getOwnPropertyDescriptor(e, n);
          Object.defineProperty(
            t,
            n,
            o.get
              ? o
              : {
                  enumerable: !0,
                  get: function () {
                    return e[n];
                  },
                },
          );
        }),
      (t.default = e),
      t
    );
  }
  (Object.defineProperty(_e, "__esModule", { value: !0 }),
    Object.defineProperty(_e, "secureStorage", {
      enumerable: !0,
      get: function () {
        return s;
      },
    }),
    Object.defineProperty(_e, "generateSalt", {
      enumerable: !0,
      get: function () {
        return d;
      },
    }),
    Object.defineProperty(_e, "hashPassword", {
      enumerable: !0,
      get: function () {
        return f;
      },
    }),
    Object.defineProperty(_e, "verifyPassword", {
      enumerable: !0,
      get: function () {
        return l;
      },
    }),
    Object.defineProperty(_e, "generateResetCode", {
      enumerable: !0,
      get: function () {
        return b;
      },
    }),
    Object.defineProperty(_e, "generateTempPassword", {
      enumerable: !0,
      get: function () {
        return y;
      },
    }),
    Object.defineProperty(_e, "validateNewPassword", {
      enumerable: !0,
      get: function () {
        return h;
      },
    }),
    Object.defineProperty(_e, "newLocalId", {
      enumerable: !0,
      get: function () {
        return p;
      },
    }));
  var t,
    n = r(_d[0]),
    o = (t = n) && t.__esModule ? t : { default: t };
  e(r(_d[1]));
  r(_d[2]);
  var u = e(r(_d[3])),
    c = r(_d[4]);
  const s = {
      getItem: async (e) => o.default.getItem(e),
      setItem: async (e, t) => o.default.setItem(e, t),
      removeItem: async (e) => o.default.removeItem(e),
    },
    d = () => {
      return (
        (e = u.getRandomBytes(16)),
        Array.from(e)
          .map((e) => e.toString(16).padStart(2, "0"))
          .join("")
      );
      var e;
    },
    f = async (e, t) => {
      const n = t ?? d();
      return {
        hash: await u.digestStringAsync(
          u.CryptoDigestAlgorithm.SHA256,
          `my-mechanic:${n}:${e}`,
        ),
        salt: n,
      };
    },
    l = async (e, t, n) => (await f(e, n)).hash === t,
    b = () => Math.floor(1e5 + 9e5 * Math.random()).toString(),
    y = () => {
      const e = [
        "orbit",
        "amber",
        "cedar",
        "relay",
        "quartz",
        "delta",
        "haven",
        "ember",
      ];
      return `${e[Math.floor(Math.random() * e.length)]}${Math.floor(1e3 + 9e3 * Math.random())}!`;
    },
    h = (e) =>
      (0, c.isStrongEnoughPassword)(e) ? void 0 : "Use at least 6 characters.",
    p = c.makeId;
})(
  globalThis,
  (x) => x,
  (x) => (x && x.__esModule ? x.default : x),
  (x) => x,
  module,
  exports,
  __deps,
);
