/* My Mechanic — App.js. Restored from the production build of the existing app. */
/* eslint-disable */
const { navigationRef: __navigationRef } = require("./navigation/navigationRef");
const __deps = [
  require("react-native-gesture-handler"),
  require("react"),
  require("expo-status-bar"),
  require("expo-font"),
  require("@expo/vector-icons/Ionicons"),
  require("@react-navigation/native"),
  require("react-native-safe-area-context"),
  require("./navigation/RootNavigator"),
  require("./store/StoreContext"),
  require("./theme"),
  require("react/jsx-runtime"),
];
(function (g, r, i, a, m, _e, d) {
  "use strict";
  (Object.defineProperty(_e, "__esModule", { value: !0 }),
    Object.defineProperty(_e, "default", {
      enumerable: !0,
      get: function () {
        return x;
      },
    }),
    r(d[0]),
    r(d[1]));
  var e,
    o = r(d[2]),
    t = r(d[3]),
    n = r(d[4]),
    s = (e = n) && e.__esModule ? e : { default: e },
    l = r(d[5]),
    c = r(d[6]),
    u = r(d[7]),
    f = r(d[8]),
    h = r(d[9]),
    j = r(d[10]);
  const v = {
    ...l.DefaultTheme,
    colors: {
      ...l.DefaultTheme.colors,
      background: h.colors.canvas,
      card: h.colors.white,
      text: h.colors.text,
      primary: h.colors.ink,
      border: h.colors.line,
    },
  };
  function x() {
    const [e] = (0, t.useFonts)({ ...s.default.font });
    return e
      ? (0, j.jsx)(c.SafeAreaProvider, {
          children: (0, j.jsx)(f.StoreProvider, {
            children: (0, j.jsxs)(l.NavigationContainer, {
              ref: __navigationRef,
              theme: v,
              children: [
                (0, j.jsx)(u.RootNavigator, {}),
                (0, j.jsx)(o.StatusBar, { style: "dark" }),
              ],
            }),
          }),
        })
      : null;
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
