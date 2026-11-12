/* My Mechanic — components/ui.js. Restored from the production build of the existing app. */
/* eslint-disable */
const __RN = require("react-native");
const __rn = (name) => ({ __esModule: true, default: __RN[name] });
const __deps = [
  require("react"),
  __rn("ActivityIndicator"),
  __rn("Pressable"),
  __rn("RefreshControl"),
  __rn("ScrollView"),
  __rn("StyleSheet"),
  require("../i18n/TranslatedText"),
  require("../i18n/TranslatedTextInput"),
  __rn("View"),
  require("react-native-safe-area-context"),
  require("@expo/vector-icons/Ionicons"),
  require("../theme"),
  require("../utils/helpers"),
  require("../store/StoreContext"),
  require("react/jsx-runtime"),
];
(function (g, r, i, a, m, _e, d) {
  "use strict";
  function e(e) {
    return e && e.__esModule ? e : { default: e };
  }
  (Object.defineProperty(_e, "__esModule", { value: !0 }),
    (_e.Screen = function ({ children: e, style: t, edges: o = ["top"] }) {
      return (0, C.jsx)(x.SafeAreaView, {
        style: [w.screen, t],
        edges: o,
        children: e,
      });
    }),
    (_e.Card = S),
    (_e.Button = k),
    (_e.IconButton = function ({
      icon: e,
      onPress: t,
      label: o,
      dark: n = !1,
      style: s,
    }) {
      return (0, C.jsx)(l.default, {
        accessibilityLabel: o,
        accessibilityRole: "button",
        onPress: t,
        style: ({ pressed: e }) => [
          w.iconButton,
          n && w.iconButtonDark,
          e && w.pressed,
          s,
        ],
        children: (0, C.jsx)(b.default, {
          name: e,
          size: 21,
          color: n ? y.colors.white : y.colors.ink,
        }),
      });
    }),
    (_e.Field = function ({
      label: e,
      icon: t,
      error: o,
      right: l,
      containerStyle: n,
      multiline: s,
      ...c
    }) {
      return (0, C.jsxs)(h.default, {
        style: [w.fieldContainer, n],
        children: [
          (0, C.jsx)(u.default, { style: w.fieldLabel, children: e }),
          (0, C.jsxs)(h.default, {
            style: [
              w.inputWrap,
              s && w.inputWrapMultiline,
              o ? { borderColor: y.colors.red } : null,
            ],
            children: [
              t &&
                (0, C.jsx)(b.default, {
                  name: t,
                  size: 18,
                  color: y.colors.muted,
                  style: s ? { marginTop: 14 } : void 0,
                }),
              (0, C.jsx)(f.default, {
                ...c,
                multiline: s,
                placeholderTextColor: y.colors.faint,
                style: [w.input, s && w.inputMultiline, c.style],
              }),
              l,
            ],
          }),
          !!o && (0, C.jsx)(u.default, { style: w.errorText, children: o }),
        ],
      });
    }),
    (_e.ScreenTitle = function ({
      eyebrow: e,
      title: t,
      subtitle: o,
      right: l,
      dark: n = !1,
    }) {
      return (0, C.jsxs)(h.default, {
        style: w.titleRow,
        children: [
          (0, C.jsxs)(h.default, {
            style: { flex: 1 },
            children: [
              !!e &&
                (0, C.jsx)(u.default, {
                  style: [w.eyebrow, n && { color: y.colors.lime }],
                  children: e,
                }),
              (0, C.jsx)(u.default, {
                style: [w.screenTitle, n && { color: y.colors.white }],
                children: t,
              }),
              !!o &&
                (0, C.jsx)(u.default, {
                  style: [w.screenSubtitle, n && { color: "#B7C2BA" }],
                  children: o,
                }),
            ],
          }),
          l,
        ],
      });
    }),
    (_e.SectionHeader = function ({
      title: e,
      action: t,
      onAction: o,
      subtitle: n,
    }) {
      return (0, C.jsxs)(h.default, {
        style: w.sectionHeader,
        children: [
          (0, C.jsxs)(h.default, {
            style: { flex: 1 },
            children: [
              (0, C.jsx)(u.default, { style: w.sectionTitle, children: e }),
              !!n &&
                (0, C.jsx)(u.default, {
                  style: w.sectionSubtitle,
                  children: n,
                }),
            ],
          }),
          !!t &&
            !!o &&
            (0, C.jsx)(l.default, {
              onPress: o,
              hitSlop: 8,
              style: ({ pressed: e }) => e && w.pressed,
              children: (0, C.jsxs)(h.default, {
                style: w.textAction,
                children: [
                  (0, C.jsx)(u.default, {
                    style: w.textActionLabel,
                    children: t,
                  }),
                  (0, C.jsx)(b.default, {
                    name: "arrow-forward",
                    size: 15,
                    color: y.colors.ink,
                  }),
                ],
              }),
            }),
        ],
      });
    }),
    (_e.Badge = function ({ label: e, tone: t = "neutral", icon: o }) {
      const l = {
        neutral: { backgroundColor: "#EFF1ED", color: y.colors.muted },
        green: { backgroundColor: y.colors.softGreen, color: "#4E7628" },
        orange: { backgroundColor: y.colors.softOrange, color: "#B5542E" },
        blue: { backgroundColor: y.colors.softBlue, color: y.colors.blue },
        red: { backgroundColor: y.colors.softRed, color: y.colors.red },
        yellow: { backgroundColor: "#FFF6DF", color: "#98701E" },
      }[t];
      return (0, C.jsxs)(h.default, {
        style: [w.badge, { backgroundColor: l.backgroundColor }],
        children: [
          o && (0, C.jsx)(b.default, { name: o, size: 12, color: l.color }),
          (0, C.jsx)(u.default, {
            style: [w.badgeText, { color: l.color }],
            children: e,
          }),
        ],
      });
    }),
    (_e.Avatar = function ({
      name: e,
      color: t = y.colors.lime,
      size: o = 48,
      icon: l,
    }) {
      return (0, C.jsx)(h.default, {
        style: [
          w.avatar,
          { width: o, height: o, borderRadius: o / 2, backgroundColor: t },
        ],
        children: l
          ? (0, C.jsx)(b.default, {
              name: l,
              size: 0.43 * o,
              color: y.colors.ink,
            })
          : (0, C.jsx)(u.default, {
              style: [w.avatarText, { fontSize: 0.32 * o }],
              children: (0, p.initials)(e),
            }),
      });
    }),
    (_e.Rating = function ({
      value: e,
      count: t,
      size: o = 14,
      light: l = !1,
    }) {
      return (0, C.jsxs)(h.default, {
        style: w.ratingRow,
        children: [
          (0, C.jsx)(b.default, {
            name: "star",
            size: o,
            color: y.colors.yellow,
          }),
          (0, C.jsx)(u.default, {
            style: [
              w.ratingValue,
              { fontSize: o },
              l && { color: y.colors.white },
            ],
            children: e ? e.toFixed(1) : "New",
          }),
          void 0 !== t &&
            (0, C.jsxs)(u.default, {
              style: [
                w.ratingCount,
                { fontSize: o - 2 },
                l && { color: "#B7C2BA" },
              ],
              children: ["(", t, ")"],
            }),
        ],
      });
    }),
    (_e.StarInput = function ({ value: e, onChange: t }) {
      return (0, C.jsx)(h.default, {
        style: {
          flexDirection: "row",
          gap: 10,
          justifyContent: "center",
          paddingVertical: 10,
        },
        children: [1, 2, 3, 4, 5].map((o) =>
          (0, C.jsx)(
            l.default,
            {
              onPress: () => t(o),
              accessibilityLabel: `${o} stars`,
              children: (0, C.jsx)(b.default, {
                name: o <= e ? "star" : "star-outline",
                size: 38,
                color: y.colors.yellow,
              }),
            },
            o,
          ),
        ),
      });
    }),
    (_e.StatCard = function ({
      label: e,
      value: t,
      icon: o,
      detail: l,
      accent: n = !1,
      style: s,
    }) {
      return (0, C.jsxs)(S, {
        style: [w.statCard, n && { backgroundColor: y.colors.ink }, s],
        children: [
          (0, C.jsx)(h.default, {
            style: [w.statIcon, n && { backgroundColor: "#2B3A31" }],
            children: (0, C.jsx)(b.default, {
              name: o,
              size: 19,
              color: n ? y.colors.lime : y.colors.ink,
            }),
          }),
          (0, C.jsx)(u.default, {
            style: [w.statValue, n && { color: y.colors.white }],
            children: t,
          }),
          (0, C.jsx)(u.default, {
            style: [w.statLabel, n && { color: "#B7C2BA" }],
            children: e,
          }),
          !!l &&
            (0, C.jsx)(u.default, {
              style: [w.statDetail, n && { color: y.colors.lime }],
              children: l,
            }),
        ],
      });
    }),
    (_e.SegmentedControl = function ({ value: e, onChange: t, options: o }) {
      return (0, C.jsx)(h.default, {
        style: w.segmented,
        children: o.map((o) => {
          const n = o.value === e;
          return (0, C.jsx)(
            l.default,
            {
              onPress: () => t(o.value),
              style: [w.segment, n && w.segmentSelected],
              children: (0, C.jsxs)(u.default, {
                numberOfLines: 1,
                style: [w.segmentText, n && w.segmentTextSelected],
                children: [o.label, void 0 !== o.count ? ` ${o.count}` : ""],
              }),
            },
            o.value,
          );
        }),
      });
    }),
    (_e.EmptyState = function ({
      icon: e,
      title: t,
      message: o,
      action: l,
      onAction: n,
    }) {
      return (0, C.jsxs)(h.default, {
        style: w.emptyState,
        children: [
          (0, C.jsx)(h.default, {
            style: w.emptyIcon,
            children: (0, C.jsx)(b.default, {
              name: e,
              size: 30,
              color: y.colors.ink,
            }),
          }),
          (0, C.jsx)(u.default, { style: w.emptyTitle, children: t }),
          (0, C.jsx)(u.default, { style: w.emptyMessage, children: o }),
          l &&
            n &&
            (0, C.jsx)(k, {
              label: l,
              onPress: n,
              icon: "add",
              variant: "secondary",
              size: "small",
            }),
        ],
      });
    }),
    (_e.InfoBanner = function ({ message: e, tone: t = "blue", icon: o }) {
      const l =
          "red" === t
            ? y.colors.softRed
            : "green" === t
              ? y.colors.softGreen
              : "orange" === t
                ? y.colors.softOrange
                : y.colors.softBlue,
        n =
          "red" === t
            ? y.colors.red
            : "green" === t
              ? "#4E7628"
              : "orange" === t
                ? "#B5542E"
                : y.colors.blue;
      return (0, C.jsxs)(h.default, {
        style: [w.infoBanner, { backgroundColor: l }],
        children: [
          (0, C.jsx)(b.default, {
            name:
              o ??
              ("red" === t
                ? "alert-circle-outline"
                : "information-circle-outline"),
            size: 19,
            color: n,
          }),
          (0, C.jsx)(u.default, {
            style: [w.infoBannerText, { color: n }],
            children: e,
          }),
        ],
      });
    }),
    (_e.Divider = function ({ style: e }) {
      return (0, C.jsx)(h.default, { style: [w.divider, e] });
    }),
    (_e.useRefresh = z),
    (_e.RefreshableScroll = function ({
      children: e,
      contentContainerStyle: t,
      ...o
    }) {
      const l = z();
      return (0, C.jsx)(s.default, {
        showsVerticalScrollIndicator: !1,
        keyboardShouldPersistTaps: "handled",
        refreshControl: (0, C.jsx)(n.default, {
          refreshing: l.refreshing,
          onRefresh: l.onRefresh,
          tintColor: y.colors.ink,
        }),
        contentContainerStyle: [w.scrollContent, t],
        ...o,
        children: e,
      });
    }),
    (_e.LoadingScreen = function () {
      return (0, C.jsxs)(h.default, {
        style: w.loading,
        children: [
          (0, C.jsx)(h.default, {
            style: w.loadingMark,
            children: (0, C.jsx)(b.default, {
              name: "construct",
              size: 30,
              color: y.colors.ink,
            }),
          }),
          (0, C.jsx)(o.default, { color: y.colors.lime }),
          (0, C.jsx)(u.default, {
            style: w.loadingText,
            children: "Preparing your workspace",
          }),
        ],
      });
    }));
  var t = r(d[0]),
    o = e(r(d[1])),
    l = e(r(d[2])),
    n = e(r(d[3])),
    s = e(r(d[4])),
    c = e(r(d[5])),
    u = e(r(d[6])),
    f = e(r(d[7])),
    h = e(r(d[8])),
    x = r(d[9]),
    b = e(r(d[10])),
    y = r(d[11]),
    p = r(d[12]),
    j = r(d[13]),
    C = r(d[14]);
  function S({ children: e, style: t, onPress: o }) {
    return o
      ? (0, C.jsx)(l.default, {
          onPress: o,
          style: ({ pressed: e }) => [w.card, t, e && w.pressed],
          children: e,
        })
      : (0, C.jsx)(h.default, { style: [w.card, t], children: e });
  }
  function k({
    label: e,
    onPress: t,
    icon: n,
    variant: s = "primary",
    size: c = "medium",
    disabled: f,
    loading: h,
    style: x,
    full: p,
  }) {
    const j = [
        w.buttonText,
        "small" === c && w.buttonTextSmall,
        ("secondary" === s || "ghost" === s) && { color: y.colors.text },
        "dark" === s && { color: y.colors.white },
        "danger" === s && { color: y.colors.red },
      ],
      S =
        "dark" === s
          ? y.colors.lime
          : "danger" === s
            ? y.colors.red
            : "primary" === s
              ? y.colors.ink
              : y.colors.text;
    return (0, C.jsx)(l.default, {
      accessibilityRole: "button",
      accessibilityLabel: e,
      disabled: f || h,
      onPress: t,
      style: ({ pressed: e }) => [
        w.button,
        w[`button_${s}`],
        "small" === c && w.buttonSmall,
        "large" === c && w.buttonLarge,
        p && { width: "100%" },
        (f || h) && { opacity: 0.45 },
        e && !f && { opacity: 0.82, transform: [{ scale: 0.985 }] },
        x,
      ],
      children: h
        ? (0, C.jsx)(o.default, {
            size: "small",
            color:
              "dark" === s
                ? y.colors.lime
                : "primary" === s
                  ? y.colors.ink
                  : y.colors.text,
          })
        : (0, C.jsxs)(C.Fragment, {
            children: [
              n &&
                (0, C.jsx)(b.default, {
                  name: n,
                  size: "small" === c ? 16 : 19,
                  color: S,
                }),
              (0, C.jsx)(u.default, { style: j, children: e }),
            ],
          }),
    });
  }
  function z() {
    const { reload: e } = (0, j.useStore)(),
      [o, l] = (0, t.useState)(!1);
    return {
      refreshing: o,
      onRefresh: (0, t.useCallback)(async () => {
        (l(!0), await e(), l(!1));
      }, [e]),
    };
  }
  const w = c.default.create({
    screen: { flex: 1, backgroundColor: y.colors.canvas },
    scrollContent: {
      padding: y.spacing.xl,
      paddingBottom: 120,
      width: "100%",
      maxWidth: 1180,
      alignSelf: "center",
    },
    card: {
      backgroundColor: y.colors.card,
      borderRadius: y.radius.lg,
      padding: y.spacing.lg,
      borderWidth: 1,
      borderColor: y.colors.line,
      ...y.shadow,
    },
    pressed: { opacity: 0.72 },
    button: {
      minHeight: 46,
      borderRadius: y.radius.md,
      paddingHorizontal: 18,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    buttonSmall: { minHeight: 36, borderRadius: 11, paddingHorizontal: 12 },
    buttonLarge: { minHeight: 56, borderRadius: 16, paddingHorizontal: 22 },
    button_primary: { backgroundColor: y.colors.lime },
    button_secondary: {
      backgroundColor: y.colors.white,
      borderWidth: 1,
      borderColor: y.colors.line,
    },
    button_ghost: { backgroundColor: "transparent" },
    button_danger: { backgroundColor: y.colors.softRed },
    button_dark: {
      backgroundColor: "#2C3D32",
      borderWidth: 1,
      borderColor: "#405246",
    },
    buttonText: { color: y.colors.ink, fontSize: 15, fontWeight: "700" },
    buttonTextSmall: { fontSize: 13 },
    iconButton: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor: y.colors.white,
      borderWidth: 1,
      borderColor: y.colors.line,
      alignItems: "center",
      justifyContent: "center",
    },
    iconButtonDark: { backgroundColor: "#2A3930", borderColor: "#3B4A41" },
    fieldContainer: { marginBottom: 16 },
    fieldLabel: {
      fontSize: 12,
      fontWeight: "700",
      color: y.colors.inkSoft,
      marginBottom: 7,
      letterSpacing: 0.2,
    },
    inputWrap: {
      minHeight: 50,
      borderRadius: y.radius.md,
      backgroundColor: y.colors.white,
      borderWidth: 1,
      borderColor: y.colors.line,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 14,
      gap: 10,
    },
    inputWrapMultiline: { alignItems: "flex-start", minHeight: 110 },
    input: { flex: 1, color: y.colors.text, fontSize: 15, paddingVertical: 13 },
    inputMultiline: { minHeight: 92, textAlignVertical: "top" },
    errorText: { color: y.colors.red, fontSize: 12, marginTop: 5 },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 22,
    },
    eyebrow: {
      fontSize: 11,
      letterSpacing: 1.6,
      textTransform: "uppercase",
      fontWeight: "800",
      color: y.colors.muted,
      marginBottom: 5,
    },
    screenTitle: {
      fontSize: 30,
      lineHeight: 36,
      letterSpacing: -0.9,
      fontWeight: "800",
      color: y.colors.text,
    },
    screenSubtitle: {
      fontSize: 14,
      lineHeight: 20,
      color: y.colors.muted,
      marginTop: 5,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
      marginBottom: 13,
      gap: 10,
    },
    sectionTitle: {
      fontSize: 19,
      fontWeight: "800",
      letterSpacing: -0.35,
      color: y.colors.text,
    },
    sectionSubtitle: { fontSize: 12, color: y.colors.muted, marginTop: 3 },
    textAction: { flexDirection: "row", alignItems: "center", gap: 4 },
    textActionLabel: { fontSize: 13, fontWeight: "700", color: y.colors.ink },
    badge: {
      borderRadius: y.radius.pill,
      paddingHorizontal: 9,
      paddingVertical: 5,
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      alignSelf: "flex-start",
    },
    badgeText: { fontSize: 11, fontWeight: "700" },
    avatar: { alignItems: "center", justifyContent: "center", flexShrink: 0 },
    avatarText: { fontWeight: "800", color: y.colors.ink, letterSpacing: -0.5 },
    ratingRow: { flexDirection: "row", alignItems: "center", gap: 4 },
    ratingValue: { color: y.colors.text, fontWeight: "800" },
    ratingCount: { color: y.colors.muted },
    statCard: { flex: 1, minWidth: 135, padding: 15 },
    statIcon: {
      width: 34,
      height: 34,
      borderRadius: 11,
      backgroundColor: y.colors.canvas,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14,
    },
    statValue: {
      fontSize: 27,
      fontWeight: "800",
      color: y.colors.text,
      letterSpacing: -0.8,
    },
    statLabel: { fontSize: 12, color: y.colors.muted, marginTop: 2 },
    statDetail: {
      fontSize: 11,
      color: "#56852D",
      fontWeight: "700",
      marginTop: 8,
    },
    segmented: {
      backgroundColor: "#E9ECE6",
      borderRadius: y.radius.md,
      padding: 4,
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 3,
      marginBottom: 18,
    },
    segment: {
      flex: 1,
      minWidth: 64,
      minHeight: 36,
      borderRadius: 11,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 5,
    },
    segmentSelected: { backgroundColor: y.colors.white, ...y.shadow },
    segmentText: { fontSize: 12, color: y.colors.muted, fontWeight: "600" },
    segmentTextSelected: { color: y.colors.ink, fontWeight: "800" },
    emptyState: {
      alignItems: "center",
      paddingVertical: 42,
      paddingHorizontal: 25,
    },
    emptyIcon: {
      width: 64,
      height: 64,
      borderRadius: 22,
      backgroundColor: y.colors.softGreen,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
      transform: [{ rotate: "-5deg" }],
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: "800",
      color: y.colors.text,
      marginBottom: 7,
      textAlign: "center",
    },
    emptyMessage: {
      fontSize: 14,
      lineHeight: 21,
      color: y.colors.muted,
      textAlign: "center",
      maxWidth: 340,
      marginBottom: 16,
    },
    infoBanner: {
      borderRadius: y.radius.md,
      padding: 13,
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 9,
      marginBottom: 16,
    },
    infoBannerText: {
      flex: 1,
      fontSize: 13,
      lineHeight: 19,
      fontWeight: "600",
    },
    divider: { height: 1, backgroundColor: y.colors.line },
    loading: {
      flex: 1,
      backgroundColor: y.colors.ink,
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
    },
    loadingMark: {
      width: 70,
      height: 70,
      borderRadius: 24,
      backgroundColor: y.colors.lime,
      alignItems: "center",
      justifyContent: "center",
    },
    loadingText: { color: "#B7C2BA", fontSize: 13 },
  });
})(
  globalThis,
  (x) => x,
  (x) => (x && x.__esModule ? x.default : x),
  (x) => x,
  module,
  exports,
  __deps,
);
