/* My Mechanic — screens/AdminScreens.js. Restored from the production build of the existing app. */
/* eslint-disable */
const __RN = require("react-native");
const __rn = (name) => ({ __esModule: true, default: __RN[name] });
const __deps = [
  require("react"),
  __rn("FlatList"),
  __rn("Pressable"),
  __rn("RefreshControl"),
  __rn("StyleSheet"),
  require("../i18n/TranslatedText"),
  __rn("View"),
  require("@expo/vector-icons/Ionicons"),
  require("../components/cards"),
  require("../components/ui"),
  require("../theme"),
  require("../utils/helpers"),
  require("../store/StoreContext"),
  require("react/jsx-runtime"),
];
(function (g, r, i, _a, m, _e, d) {
  "use strict";
  function e(e) {
    return e && e.__esModule ? e : { default: e };
  }
  (Object.defineProperty(_e, "__esModule", { value: !0 }),
    (_e.AdminOverviewScreen = function ({ navigation: e }) {
      const {
          state: t,
          backendMode: a,
          realtimeStatus: n,
          backendError: o,
          signOut: l,
        } = (0, v.useStore)(),
        w = (0, p.getStats)(t),
        y = t.appointments.slice(0, 4),
        S = [...t.clients]
          .sort((e, t) => +new Date(t.createdAt) - +new Date(e.createdAt))
          .slice(0, 3),
        C = t.appointments.filter((e) => "completed" === e.status),
        k = t.reviews.length
          ? t.reviews.reduce((e, t) => e + t.rating, 0) / t.reviews.length
          : 0,
        D = (0, p.getLastMonths)(6).map((e) => ({
          ...e,
          count: t.appointments.filter(
            (t) =>
              "cancelled" !== t.status && (0, p.monthKey)(t.date) === e.key,
          ).length,
        })),
        M = Math.max(1, ...D.map((e) => e.count)),
        A = t.liveLocations.filter((e) => e.isSharing).length;
      return (0, j.jsx)(f.Screen, {
        children: (0, j.jsxs)(f.RefreshableScroll, {
          children: [
            (0, j.jsx)(f.ScreenTitle, {
              eyebrow: "ADMIN WORKSPACE",
              title: "Network overview",
              subtitle: "Everything happening across My Mechanic.",
              right: (0, j.jsxs)(c.default, {
                style: b.headerActions,
                children: [
                  (0, j.jsx)(f.IconButton, {
                    icon: "add",
                    label: "Add mechanic",
                    onPress: () => e.navigate("MechanicForm"),
                  }),
                  (0, j.jsx)(f.IconButton, {
                    icon: "settings-outline",
                    label: "Settings",
                    onPress: () => e.navigate("Settings"),
                  }),
                ],
              }),
            }),
            !!o && (0, j.jsx)(f.InfoBanner, { message: o, tone: "red" }),
            (0, j.jsxs)(f.Card, {
              style: b.liveHero,
              children: [
                (0, j.jsxs)(c.default, {
                  style: b.liveHeroTop,
                  children: [
                    (0, j.jsx)(c.default, {
                      style: b.liveHeroIcon,
                      children: (0, j.jsx)(u.default, {
                        name: "map",
                        size: 25,
                        color: x.colors.ink,
                      }),
                    }),
                    (0, j.jsx)(f.Badge, {
                      label:
                        "connected" === n
                          ? "SUPABASE LIVE"
                          : "local" === a
                            ? "LOCAL DEMO"
                            : "RECONNECTING",
                      tone: "error" === n ? "red" : "green",
                    }),
                  ],
                }),
                (0, j.jsxs)(s.default, {
                  style: b.liveHeroTitle,
                  children: [A, " mechanic locations are pinned"],
                }),
                (0, j.jsx)(s.default, {
                  style: b.liveHeroText,
                  children:
                    "View fixed mechanic workshop locations on Yandex Maps and update coordinates manually.",
                }),
                (0, j.jsx)(f.Button, {
                  label: "Open mechanic map",
                  icon: "navigate-outline",
                  variant: "dark",
                  onPress: () => e.navigate("LiveMap"),
                }),
              ],
            }),
            (0, j.jsx)(f.SectionHeader, {
              title: "Platform statistics",
              subtitle: "Live metrics from the shared workspace",
            }),
            (0, j.jsxs)(c.default, {
              style: b.statGrid,
              children: [
                (0, j.jsx)(f.StatCard, {
                  label: "Total users",
                  value: w.totalUsers,
                  icon: "people-outline",
                  detail: `${w.activeUsers} active`,
                  accent: !0,
                }),
                (0, j.jsx)(f.StatCard, {
                  label: "Drivers",
                  value: w.totalDrivers,
                  icon: "car-sport-outline",
                  detail:
                    "" + (S[0] ? `Latest: ${S[0].name}` : "No drivers yet"),
                }),
                (0, j.jsx)(f.StatCard, {
                  label: "Mechanics",
                  value: w.totalMechanics,
                  icon: "construct-outline",
                }),
                (0, j.jsx)(f.StatCard, {
                  label: "Total orders",
                  value: w.totalOrders,
                  icon: "clipboard-outline",
                }),
                (0, j.jsx)(f.StatCard, {
                  label: "Active users",
                  value: w.activeUsers,
                  icon: "pulse-outline",
                }),
                (0, j.jsx)(f.StatCard, {
                  label: "Blocked users",
                  value: w.blockedUsers,
                  icon: "ban-outline",
                }),
                (0, j.jsx)(f.StatCard, {
                  label: "Avg. rating",
                  value: k ? k.toFixed(1) : "New",
                  icon: "star-outline",
                }),
              ],
            }),
            (0, j.jsx)(f.SectionHeader, {
              title: "Booking activity",
              subtitle: "Last 6 months, non-cancelled",
            }),
            (0, j.jsx)(f.Card, {
              children: (0, j.jsx)(c.default, {
                style: b.chart,
                children: D.map((e) =>
                  (0, j.jsxs)(
                    c.default,
                    {
                      style: b.chartColumn,
                      children: [
                        (0, j.jsx)(s.default, {
                          style: b.chartValue,
                          children: e.count,
                        }),
                        (0, j.jsx)(c.default, {
                          style: b.chartTrack,
                          children: (0, j.jsx)(c.default, {
                            style: [
                              b.chartBar,
                              {
                                height: `${Math.max(5, (e.count / M) * 100)}%`,
                              },
                            ],
                          }),
                        }),
                        (0, j.jsx)(s.default, {
                          style: b.chartLabel,
                          children: e.label,
                        }),
                      ],
                    },
                    e.key,
                  ),
                ),
              }),
            }),
            (0, j.jsx)(f.SectionHeader, {
              title: "Newest driver registrations",
              subtitle: "New phone sign-ups appear here immediately",
              action: "All users",
              onAction: () => e.navigate("Users"),
            }),
            S.length
              ? S.map((t) =>
                  (0, j.jsxs)(
                    f.Card,
                    {
                      style: b.registrationRow,
                      onPress: () =>
                        e.navigate("ClientDetail", { clientId: t.id }),
                      children: [
                        (0, j.jsx)(f.Avatar, {
                          name: t.name,
                          color: t.color,
                          size: 42,
                        }),
                        (0, j.jsxs)(c.default, {
                          style: { flex: 1 },
                          children: [
                            (0, j.jsx)(s.default, {
                              style: b.rowTitle,
                              children: t.name,
                            }),
                            (0, j.jsxs)(s.default, {
                              style: b.rowMeta,
                              children: [
                                t.phone,
                                " \xb7 ",
                                (0, p.formatDateTime)(t.createdAt),
                              ],
                            }),
                          ],
                        }),
                        Date.now() - +new Date(t.createdAt) < 864e5 &&
                          (0, j.jsx)(f.Badge, { label: "NEW", tone: "green" }),
                        (0, j.jsx)(u.default, {
                          name: "chevron-forward",
                          size: 17,
                          color: x.colors.faint,
                        }),
                      ],
                    },
                    t.id,
                  ),
                )
              : (0, j.jsx)(f.EmptyState, {
                  icon: "person-add-outline",
                  title: "No drivers registered",
                  message:
                    "New driver accounts will appear here and in the Users directory.",
                }),
            (0, j.jsx)(f.SectionHeader, {
              title: "Recent activity",
              subtitle: "Latest booking requests and updates",
            }),
            y.length
              ? y.map((e) =>
                  (0, j.jsx)(
                    h.AppointmentCard,
                    {
                      appointment: e,
                      viewerRole: "admin",
                      clientName:
                        t.clients.find((t) => t.id === e.clientId)?.name ||
                        "Unknown driver",
                      mechanicName:
                        t.mechanics.find((t) => t.id === e.mechanicId)?.name ||
                        "Unknown mechanic",
                    },
                    e.id,
                  ),
                )
              : (0, j.jsx)(f.EmptyState, {
                  icon: "calendar-outline",
                  title: "No bookings yet",
                  message: "Driver booking requests will appear here.",
                }),
          ],
        }),
      });
    }),
    (_e.AdminMechanicsScreen = function ({ navigation: e }) {
      const { state: n } = (0, v.useStore)(),
        [l, s] = (0, t.useState)(""),
        c = (0, f.useRefresh)(),
        u = (0, t.useMemo)(() => {
          const e = l.trim().toLowerCase();
          return n.mechanics.filter(
            (t) =>
              !e ||
              `${t.name} ${t.phone} ${t.id} ${t.email} ${t.specialization}`
                .toLowerCase()
                .includes(e),
          );
        }, [n.mechanics, l]);
      return (0, j.jsx)(f.Screen, {
        children: (0, j.jsx)(a.default, {
          data: u,
          keyExtractor: (e) => e.id,
          refreshControl: (0, j.jsx)(o.default, {
            refreshing: c.refreshing,
            onRefresh: c.onRefresh,
            tintColor: x.colors.ink,
          }),
          contentContainerStyle: b.listContent,
          showsVerticalScrollIndicator: !1,
          ListHeaderComponent: (0, j.jsxs)(j.Fragment, {
            children: [
              (0, j.jsx)(f.ScreenTitle, {
                eyebrow: "ADMIN ONLY",
                title: "Mechanics",
                subtitle:
                  "Manage accounts, services, availability, and public profiles.",
                right: (0, j.jsx)(f.Button, {
                  label: "Add",
                  icon: "add",
                  size: "small",
                  onPress: () => e.navigate("MechanicForm"),
                }),
              }),
              (0, j.jsx)(f.Field, {
                label: "Search",
                icon: "search-outline",
                value: l,
                onChangeText: s,
                placeholder: "Search by name, phone, specialty, or ID",
              }),
            ],
          }),
          ListEmptyComponent: (0, j.jsx)(f.EmptyState, {
            icon: "construct-outline",
            title: "No mechanics found",
            message: l
              ? "Try a different name, phone number, or specialty."
              : "Create the first mechanic account for your network.",
            action: l ? void 0 : "Add mechanic",
            onAction: l ? void 0 : () => e.navigate("MechanicForm"),
          }),
          renderItem: ({ item: t }) =>
            (0, j.jsx)(h.MechanicCard, {
              mechanic: t,
              reviews: n.reviews,
              onPress: () => e.navigate("MechanicDetail", { mechanicId: t.id }),
            }),
        }),
      });
    }),
    (_e.AdminUsersScreen = function ({ navigation: e }) {
      const { state: l } = (0, v.useStore)(),
        [h, w] = (0, t.useState)(""),
        [y, S] = (0, t.useState)("all"),
        C = (0, f.useRefresh)(),
        k = (0, p.getStats)(l),
        D = (0, t.useMemo)(() => {
          const e = (0, p.getDirectory)(l).filter((e) => "admin" !== e.role),
            t =
              "all" === y
                ? e
                : "blocked" === y
                  ? e.filter((e) => "blocked" === e.status)
                  : e.filter((e) => e.role === y);
          return (0, p.searchDirectory)(t, h);
        }, [l, h, y]);
      return (0, j.jsx)(f.Screen, {
        children: (0, j.jsx)(a.default, {
          data: D,
          keyExtractor: (e) => e.id,
          refreshControl: (0, j.jsx)(o.default, {
            refreshing: C.refreshing,
            onRefresh: C.onRefresh,
            tintColor: x.colors.ink,
          }),
          contentContainerStyle: b.listContent,
          showsVerticalScrollIndicator: !1,
          keyboardShouldPersistTaps: "handled",
          ListHeaderComponent: (0, j.jsxs)(j.Fragment, {
            children: [
              (0, j.jsx)(f.ScreenTitle, {
                eyebrow: "USER MANAGEMENT",
                title: "Users",
                subtitle: "Every registered driver and mechanic, newest first.",
              }),
              (0, j.jsxs)(c.default, {
                style: b.smallStatRow,
                children: [
                  (0, j.jsx)(f.StatCard, {
                    label: "Total users",
                    value: k.totalDrivers + k.totalMechanics,
                    icon: "people-outline",
                  }),
                  (0, j.jsx)(f.StatCard, {
                    label: "Blocked",
                    value: k.blockedUsers,
                    icon: "ban-outline",
                  }),
                ],
              }),
              (0, j.jsx)(c.default, { style: { height: 16 } }),
              (0, j.jsx)(f.Field, {
                label: "Search",
                icon: "search-outline",
                value: h,
                onChangeText: w,
                placeholder: "Search by name, phone, email, or ID",
              }),
              (0, j.jsx)(f.SegmentedControl, {
                value: y,
                onChange: S,
                options: [
                  {
                    value: "all",
                    label: "All",
                    count: k.totalDrivers + k.totalMechanics,
                  },
                  { value: "client", label: "Drivers", count: k.totalDrivers },
                  {
                    value: "mechanic",
                    label: "Mechanics",
                    count: k.totalMechanics,
                  },
                  { value: "blocked", label: "Blocked", count: k.blockedUsers },
                ],
              }),
            ],
          }),
          ListEmptyComponent: (0, j.jsx)(f.EmptyState, {
            icon: "people-outline",
            title: "No users found",
            message: h
              ? "No registered profile matches this search. Pull down to refresh from Supabase."
              : "Newly registered drivers and mechanics will appear here automatically.",
          }),
          renderItem: ({ item: t }) =>
            (0, j.jsxs)(n.default, {
              onPress: () => {
                return (
                  "client" === (a = t).role &&
                    e.navigate("ClientDetail", { clientId: a.id }),
                  void (
                    "mechanic" === a.role &&
                    e.navigate("MechanicDetail", { mechanicId: a.id })
                  )
                );
                var a;
              },
              style: ({ pressed: e }) => [b.userRow, e && { opacity: 0.72 }],
              children: [
                (0, j.jsx)(f.Avatar, {
                  name: t.name,
                  color: "client" === t.role ? "#C8E8DA" : "#BFD7F7",
                  size: 46,
                }),
                (0, j.jsxs)(c.default, {
                  style: { flex: 1 },
                  children: [
                    (0, j.jsxs)(c.default, {
                      style: b.userNameRow,
                      children: [
                        (0, j.jsx)(s.default, {
                          style: b.rowTitle,
                          children: t.name,
                        }),
                        Date.now() - +new Date(t.createdAt) < 864e5 &&
                          (0, j.jsx)(f.Badge, { label: "NEW", tone: "green" }),
                      ],
                    }),
                    (0, j.jsxs)(s.default, {
                      style: b.rowMeta,
                      children: [
                        "mechanic" === t.role ? "Mechanic" : "Driver",
                        " \xb7 ",
                        t.phone || "No phone",
                      ],
                    }),
                    (0, j.jsxs)(s.default, {
                      style: b.rowSub,
                      numberOfLines: 1,
                      children: [t.email || "Phone account", " \xb7 ID ", t.id],
                    }),
                    (0, j.jsxs)(s.default, {
                      style: b.rowSub,
                      children: [
                        "Registered ",
                        (0, p.formatDateTime)(t.createdAt),
                      ],
                    }),
                  ],
                }),
                (0, j.jsx)(f.Badge, {
                  label: "blocked" === t.status ? "Blocked" : "Active",
                  tone: "blocked" === t.status ? "red" : "green",
                }),
                (0, j.jsx)(u.default, {
                  name: "chevron-forward",
                  size: 17,
                  color: x.colors.faint,
                }),
              ],
            }),
        }),
      });
    }));
  var t = r(d[0]),
    a = e(r(d[1])),
    n = e(r(d[2])),
    o = e(r(d[3])),
    l = e(r(d[4])),
    s = e(r(d[5])),
    c = e(r(d[6])),
    u = e(r(d[7])),
    h = r(d[8]),
    f = r(d[9]),
    x = r(d[10]),
    p = r(d[11]),
    v = r(d[12]),
    j = r(d[13]);
  const b = l.default.create({
    headerActions: { flexDirection: "row", gap: 8 },
    liveHero: {
      backgroundColor: x.colors.ink,
      borderColor: x.colors.ink,
      marginBottom: 22,
    },
    liveHeroTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    liveHeroIcon: {
      width: 48,
      height: 48,
      borderRadius: 15,
      backgroundColor: x.colors.lime,
      alignItems: "center",
      justifyContent: "center",
    },
    liveHeroTitle: {
      color: x.colors.white,
      fontSize: 23,
      lineHeight: 29,
      fontWeight: "800",
      letterSpacing: -0.5,
      marginTop: 20,
    },
    liveHeroText: {
      color: "#B7C2BA",
      fontSize: 13,
      lineHeight: 19,
      marginVertical: 10,
      maxWidth: 540,
    },
    statGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
    chart: {
      height: 185,
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 10,
    },
    chartColumn: { flex: 1, height: "100%", alignItems: "center" },
    chartValue: { fontSize: 10, color: x.colors.muted, marginBottom: 5 },
    chartTrack: {
      flex: 1,
      width: "72%",
      maxWidth: 42,
      backgroundColor: x.colors.canvas,
      borderRadius: 8,
      justifyContent: "flex-end",
      overflow: "hidden",
    },
    chartBar: {
      width: "100%",
      backgroundColor: x.colors.lime,
      borderRadius: 8,
      minHeight: 5,
    },
    chartLabel: { color: x.colors.muted, fontSize: 11, marginTop: 8 },
    registrationRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
      padding: 13,
      marginBottom: 9,
    },
    rowTitle: { color: x.colors.text, fontSize: 14, fontWeight: "800" },
    rowMeta: {
      color: x.colors.muted,
      fontSize: 11,
      marginTop: 4,
      lineHeight: 16,
    },
    rowSub: { color: x.colors.faint, fontSize: 9, marginTop: 3 },
    listContent: {
      padding: 20,
      paddingBottom: 120,
      maxWidth: 1e3,
      width: "100%",
      alignSelf: "center",
    },
    smallStatRow: { flexDirection: "row", gap: 10 },
    userRow: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 11,
      backgroundColor: x.colors.white,
      borderWidth: 1,
      borderColor: x.colors.line,
      borderRadius: 18,
      padding: 14,
      marginBottom: 10,
    },
    userNameRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      gap: 7,
    },
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
