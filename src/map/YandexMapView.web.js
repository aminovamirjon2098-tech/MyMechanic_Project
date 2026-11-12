/* My Mechanic — map/YandexMapView.web.js. Restored from the production build of the existing app. */
/* eslint-disable */
const __RN = require("react-native");
const __rn = (name) => ({ __esModule: true, default: __RN[name] });
const { useLanguage: __useLanguage } = require("../i18n/i18n");
const __deps = [
  require("react"),
  __rn("StyleSheet"),
  __rn("View"),
  require("./yandexHtml"),
  require("react/jsx-runtime"),
];
(function (g, r, i, a, m, _e, d) {
  "use strict";
  function e(e) {
    return e && e.__esModule ? e : { default: e };
  }
  (Object.defineProperty(_e, "__esModule", { value: !0 }),
    Object.defineProperty(_e, "default", {
      enumerable: !0,
      get: function () {
        return l;
      },
    }));
  var t = r(d[0]),
    n = e(r(d[1])),
    o = e(r(d[2])),
    c = r(d[3]),
    s = r(d[4]);
  function l({
    locations: e,
    apiKey: n,
    selectedId: l,
    placing: p,
    fitSignal: f,
    onSelect: y,
    onMapPress: w,
    onReady: E,
    onError: b,
  }) {
    const __lang = __useLanguage();
    const v = (0, t.useRef)(null),
      M = (0, t.useMemo)(() => (0, c.createYandexHtml)(n, __lang), [n, __lang]),
      I = (0, t.useRef)({
        locations: e,
        selectedId: l,
        placing: p,
        onSelect: y,
        onMapPress: w,
        onReady: E,
        onError: b,
      });
    I.current = {
      locations: e,
      selectedId: l,
      placing: p,
      onSelect: y,
      onMapPress: w,
      onReady: E,
      onError: b,
    };
    const P = (e) =>
      v.current?.contentWindow?.postMessage(JSON.stringify(e), "*");
    return (
      (0, t.useEffect)(() => {
        P({ type: "locations", locations: e, selectedId: l });
      }, [e, l]),
      (0, t.useEffect)(() => {
        P({ type: "placing", value: !!p });
      }, [p]),
      (0, t.useEffect)(() => {
        f && P({ type: "fit" });
      }, [f]),
      (0, t.useEffect)(() => {
        const e = (e) => {
          if (e.source === v.current?.contentWindow)
            try {
              const t = "string" == typeof e.data ? JSON.parse(e.data) : e.data;
              ("ready" === t.type &&
                (I.current.onReady?.(),
                P({
                  type: "locations",
                  locations: I.current.locations,
                  selectedId: I.current.selectedId,
                }),
                P({ type: "placing", value: !!I.current.placing })),
                "select" === t.type && I.current.onSelect?.(t.profileId),
                "mapPress" === t.type &&
                  I.current.onMapPress?.(
                    Number(t.latitude),
                    Number(t.longitude),
                  ),
                "error" === t.type && I.current.onError?.(t.message));
            } catch {}
        };
        return (
          window.addEventListener("message", e),
          () => window.removeEventListener("message", e)
        );
      }, []),
      (0, s.jsx)(o.default, {
        style: u.container,
        children: (0, t.createElement)("iframe", {
          ref: v,
          srcDoc: M,
          title: "Real-time Yandex map",
          style: { width: "100%", height: "100%", border: 0, display: "block" },
          allow: "geolocation",
          sandbox: "allow-scripts allow-same-origin allow-popups",
        }),
      })
    );
  }
  const u = n.default.create({ container: { flex: 1, overflow: "hidden" } });
})(
  globalThis,
  (x) => x,
  (x) => (x && x.__esModule ? x.default : x),
  (x) => x,
  module,
  exports,
  __deps,
);
