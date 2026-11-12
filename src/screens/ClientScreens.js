/* My Mechanic — screens/ClientScreens.js. Restored from the production build of the existing app. */
/* eslint-disable */
const __RN = require("react-native");
const __rn = (name) => ({ __esModule: true, default: __RN[name] });
// Explore: every active mechanic from state.mechanics (no requirement for services, address,
// coordinates or availability). Shown when status is "active" and isActive is true.
const __norm = (v) => String(v ?? "").trim().replace(/\s+/g, " ").toLowerCase();
const __visible = (list) =>
  (Array.isArray(list) ? list : []).filter(
    (m) => m && __norm(m.status || "active") === "active" && m.isActive !== false,
  );
const __deps = [
  require("react"),
  __rn("FlatList"),
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
    (_e.ClientExploreScreen = function ({ navigation: e }) {
      const { state: a } = (0, x.useStore)(),
        [f, v] = (0, t.useState)(""),
        [C, S] = (0, t.useState)("All"),
        b = (0, p.useRefresh)(),
        w = a.clients.find((e) => e.id === a.session?.userId),
        k = (0, t.useMemo)(
          () => [
            "All",
            ...Array.from(
              new Map(
                __visible(a.mechanics)
                  .map((e) => String(e.specialization ?? "").trim())
                  .filter(Boolean)
                  .map((e) => [__norm(e), e]),
              ).values(),
            ).slice(0, 5),
          ],
          [a.mechanics],
        ),
        I = (0, t.useMemo)(() => {
          const e = f.trim().toLowerCase();
          return __visible(a.mechanics).filter(
            (t) =>
              ("All" === C || __norm(t.specialization) === __norm(C)) &&
              (!e ||
                [
                  t.name,
                  t.specialization,
                  t.address,
                  ...(Array.isArray(t.services) ? t.services.map((e) => e?.name) : []),
                ]
                  .filter(Boolean)
                  .join(" ")
                  .toLowerCase()
                  .includes(e)),
          );
        }, [a.mechanics, f, C]);
      return (0, j.jsx)(p.Screen, {
        children: (0, j.jsx)(n.default, {
          data: I,
          keyExtractor: (e) => e.id,
          refreshControl: (0, j.jsx)(o.default, {
            refreshing: b.refreshing,
            onRefresh: b.onRefresh,
            tintColor: h.colors.ink,
          }),
          contentContainerStyle: y.listContent,
          showsVerticalScrollIndicator: !1,
          keyboardShouldPersistTaps: "handled",
          ListHeaderComponent: (0, j.jsxs)(j.Fragment, {
            children: [
              (0, j.jsx)(p.ScreenTitle, {
                eyebrow: "FIND CARE",
                title: "Explore mechanics",
                subtitle: "Trusted, verified professionals near you.",
              }),
              (0, j.jsxs)(p.Card, {
                style: y.liveMapCard,
                children: [
                  (0, j.jsx)(s.default, {
                    style: y.liveMapIcon,
                    children: (0, j.jsx)(c.default, {
                      name: "map",
                      size: 23,
                      color: h.colors.ink,
                    }),
                  }),
                  (0, j.jsxs)(s.default, {
                    style: { flex: 1 },
                    children: [
                      (0, j.jsx)(l.default, {
                        style: y.liveMapTitle,
                        children: "Need help on the road?",
                      }),
                      (0, j.jsx)(l.default, {
                        style: y.liveMapText,
                        children:
                          "See mechanics on the map. Your location is not shared.",
                      }),
                    ],
                  }),
                  (0, j.jsx)(p.Button, {
                    label: "Live map",
                    icon: "navigate-outline",
                    size: "small",
                    onPress: () => e.navigate("LiveMap"),
                  }),
                ],
              }),
              (0, j.jsx)(p.Field, {
                label: "Search",
                icon: "search-outline",
                value: f,
                onChangeText: v,
                placeholder: "Name, service, specialty, or area",
              }),
              (0, j.jsx)(n.default, {
                horizontal: !0,
                data: k,
                keyExtractor: (e) => e,
                showsHorizontalScrollIndicator: !1,
                contentContainerStyle: y.filterChips,
                renderItem: ({ item: e }) =>
                  (0, j.jsx)(p.Button, {
                    label: e,
                    size: "small",
                    variant: C === e ? "dark" : "secondary",
                    onPress: () => S(e),
                    style: { minHeight: 34 },
                  }),
              }),
              (0, j.jsxs)(l.default, {
                style: y.resultCount,
                children: [
                  I.length,
                  " ",
                  1 === I.length ? "professional" : "professionals",
                  " found",
                ],
              }),
            ],
          }),
          ListEmptyComponent: (0, j.jsx)(p.EmptyState, {
            icon: "construct-outline",
            title: "No mechanics found",
            message:
              f || "All" !== C
                ? "Try another search or specialty filter."
                : "Mechanics will appear here as soon as they join the network.",
          }),
          renderItem: ({ item: t }) =>
            (0, j.jsx)(u.MechanicCard, {
              mechanic: t,
              reviews: a.reviews,
              client: w,
              onPress: () => e.navigate("MechanicDetail", { mechanicId: t.id }),
            }),
        }),
      });
    }),
    (_e.ClientBookingsScreen = function ({ navigation: e }) {
      const { state: a, setAppointmentStatus: l } = (0, x.useStore)(),
        [s, c] = (0, t.useState)("upcoming"),
        v = (0, p.useRefresh)(),
        C = (0, t.useMemo)(
          () =>
            a.appointments
              .filter((e) => e.clientId === a.session?.userId)
              .sort((e, t) =>
                `${t.date}${t.time}`.localeCompare(`${e.date}${e.time}`),
              ),
          [a.appointments, a.session?.userId],
        ),
        S = C.filter((e) =>
          "all" === s || "completed" === s
            ? "all" === s || "completed" === e.status
            : ["pending", "accepted"].includes(e.status) &&
              e.date >= (0, f.toISODate)(new Date()),
        );
      return (0, j.jsx)(p.Screen, {
        children: (0, j.jsx)(n.default, {
          data: S,
          keyExtractor: (e) => e.id,
          refreshControl: (0, j.jsx)(o.default, {
            refreshing: v.refreshing,
            onRefresh: v.onRefresh,
            tintColor: h.colors.ink,
          }),
          contentContainerStyle: y.listContent,
          showsVerticalScrollIndicator: !1,
          ListHeaderComponent: (0, j.jsxs)(j.Fragment, {
            children: [
              (0, j.jsx)(p.ScreenTitle, {
                eyebrow: "YOUR BOOKINGS",
                title: "My bookings",
                subtitle: "Track every appointment from request to completion.",
              }),
              (0, j.jsx)(p.SegmentedControl, {
                value: s,
                onChange: c,
                options: [
                  {
                    value: "upcoming",
                    label: "Upcoming",
                    count: C.filter(
                      (e) =>
                        ["pending", "accepted"].includes(e.status) &&
                        e.date >= (0, f.toISODate)(new Date()),
                    ).length,
                  },
                  {
                    value: "completed",
                    label: "Completed",
                    count: C.filter((e) => "completed" === e.status).length,
                  },
                  { value: "all", label: "All", count: C.length },
                ],
              }),
            ],
          }),
          ListEmptyComponent: (0, j.jsx)(p.EmptyState, {
            icon: "calendar-outline",
            title: "No bookings here",
            message:
              "Explore trusted mechanics and request a time that works for you.",
            action: "Explore mechanics",
            onAction: () => e.navigate("Explore"),
          }),
          renderItem: ({ item: t }) => {
            const n = a.mechanics.find((e) => e.id === t.mechanicId),
              o = a.reviews.some((e) => e.appointmentId === t.id);
            return (0, j.jsx)(u.AppointmentCard, {
              appointment: t,
              viewerRole: "client",
              clientName: "You",
              mechanicName: n?.name || "Mechanic",
              actions: (0, j.jsxs)(j.Fragment, {
                children: [
                  "completed" === t.status &&
                    !o &&
                    (0, j.jsx)(p.Button, {
                      label: "Leave a review",
                      icon: "star-outline",
                      size: "small",
                      onPress: () =>
                        e.navigate("ReviewForm", { appointmentId: t.id }),
                    }),
                  ["pending", "accepted"].includes(t.status) &&
                    (0, j.jsx)(p.Button, {
                      label: "Cancel booking",
                      icon: "close-outline",
                      variant: "danger",
                      size: "small",
                      onPress: () => {
                        l(t.id, "cancelled");
                      },
                    }),
                ],
              }),
            });
          },
        }),
      });
    }),
    (_e.ClientGarageScreen = function ({ navigation: e }) {
      const { state: t, signOut: n, backendMode: o } = (0, x.useStore)(),
        a = t.clients.find((e) => e.id === t.session?.userId);
      return a
        ? (0, j.jsx)(p.Screen, {
            children: (0, j.jsxs)(p.RefreshableScroll, {
              children: [
                (0, j.jsx)(p.ScreenTitle, {
                  eyebrow: "YOUR GARAGE",
                  title: "Garage & profile",
                  subtitle: "Manage your vehicles and account details.",
                  right: (0, j.jsx)(p.IconButton, {
                    icon: "settings-outline",
                    label: "Settings",
                    onPress: () => e.navigate("Settings"),
                  }),
                }),
                (0, j.jsxs)(p.Card, {
                  style: y.profileCard,
                  children: [
                    (0, j.jsx)(p.Avatar, {
                      name: a.name,
                      color: a.color,
                      size: 66,
                    }),
                    (0, j.jsx)(l.default, {
                      style: y.profileName,
                      children: a.name,
                    }),
                    (0, j.jsxs)(l.default, {
                      style: y.profileContact,
                      children: [a.email, "\n", a.phone],
                    }),
                    (0, j.jsx)(p.Badge, {
                      label:
                        "supabase" === o
                          ? "Synced driver profile"
                          : "Local driver profile",
                      tone: "green",
                      icon: "checkmark-circle-outline",
                    }),
                    (0, j.jsxs)(l.default, {
                      style: y.joined,
                      children: [
                        "Registered ",
                        (0, f.formatDateTime)(a.createdAt),
                      ],
                    }),
                    (0, j.jsxs)(s.default, {
                      style: y.profileActions,
                      children: [
                        (0, j.jsx)(p.Button, {
                          label: "Edit profile",
                          icon: "create-outline",
                          variant: "secondary",
                          size: "small",
                          onPress: () => e.navigate("ClientProfileForm"),
                        }),
                        (0, j.jsx)(p.Button, {
                          label: "Change password",
                          icon: "lock-closed-outline",
                          variant: "secondary",
                          size: "small",
                          onPress: () => e.navigate("ChangePassword"),
                        }),
                      ],
                    }),
                  ],
                }),
                (0, j.jsxs)(p.Card, {
                  style: y.locationCard,
                  children: [
                    (0, j.jsx)(s.default, {
                      style: y.locationIcon,
                      children: (0, j.jsx)(c.default, {
                        name: "location",
                        size: 23,
                        color: h.colors.ink,
                      }),
                    }),
                    (0, j.jsxs)(s.default, {
                      style: { flex: 1 },
                      children: [
                        (0, j.jsx)(l.default, {
                          style: y.locationTitle,
                          children: "Mechanics on the map",
                        }),
                        (0, j.jsx)(l.default, {
                          style: y.locationText,
                          children:
                            "Find mechanics near you on the map. Driver location sharing is turned off.",
                        }),
                      ],
                    }),
                    (0, j.jsx)(p.Button, {
                      label: "Open map",
                      size: "small",
                      icon: "map-outline",
                      onPress: () => e.navigate("LiveMap"),
                    }),
                  ],
                }),
                (0, j.jsx)(p.SectionHeader, {
                  title: "Vehicles",
                  subtitle: `${a.cars.length} saved in your garage`,
                  action: "Add vehicle",
                  onAction: () => e.navigate("CarForm"),
                }),
                a.cars.length
                  ? a.cars.map((t) =>
                      (0, j.jsx)(
                        u.CarCard,
                        {
                          car: t,
                          onPress: () => e.navigate("CarForm", { carId: t.id }),
                        },
                        t.id,
                      ),
                    )
                  : (0, j.jsx)(p.EmptyState, {
                      icon: "car-sport-outline",
                      title: "No vehicles yet",
                      message:
                        "Add your first car to make booking faster and give mechanics the right details.",
                      action: "Add vehicle",
                      onAction: () => e.navigate("CarForm"),
                    }),
              ],
            }),
          })
        : (0, j.jsxs)(p.Screen, {
            children: [
              (0, j.jsx)(p.EmptyState, {
                icon: "person-outline",
                title: "Driver profile unavailable",
                message:
                  "Pull down to refresh or ask an administrator to verify your Supabase profile trigger.",
              }),
              (0, j.jsx)(s.default, {
                style: { padding: 20 },
                children: (0, j.jsx)(p.Button, {
                  label: "Sign out",
                  onPress: () => {
                    n();
                  },
                }),
              }),
            ],
          });
    }));
  var t = r(d[0]),
    n = e(r(d[1])),
    o = e(r(d[2])),
    a = e(r(d[3])),
    l = e(r(d[4])),
    s = e(r(d[5])),
    c = e(r(d[6])),
    u = r(d[7]),
    p = r(d[8]),
    h = r(d[9]),
    f = r(d[10]),
    x = r(d[11]),
    j = r(d[12]);
  const y = a.default.create({
    listContent: {
      padding: 20,
      paddingBottom: 120,
      maxWidth: 1e3,
      width: "100%",
      alignSelf: "center",
    },
    liveMapCard: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 12,
      marginBottom: 17,
      backgroundColor: h.colors.ink,
      borderColor: h.colors.ink,
    },
    liveMapIcon: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: h.colors.lime,
      alignItems: "center",
      justifyContent: "center",
    },
    liveMapTitle: { color: h.colors.white, fontSize: 14, fontWeight: "800" },
    liveMapText: {
      color: "#B7C2BA",
      fontSize: 11,
      lineHeight: 16,
      marginTop: 4,
      maxWidth: 430,
    },
    filterChips: { gap: 8, paddingBottom: 14 },
    resultCount: { color: h.colors.muted, fontSize: 11, marginBottom: 12 },
    profileCard: { alignItems: "center", paddingVertical: 24 },
    profileName: {
      color: h.colors.text,
      fontSize: 21,
      fontWeight: "800",
      marginTop: 12,
    },
    profileContact: {
      color: h.colors.muted,
      fontSize: 12,
      lineHeight: 19,
      textAlign: "center",
      marginVertical: 8,
    },
    joined: { color: h.colors.faint, fontSize: 10, marginTop: 10 },
    profileActions: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 9,
      marginTop: 15,
    },
    locationCard: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 12,
      marginTop: 12,
      backgroundColor: h.colors.softGreen,
    },
    locationIcon: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: h.colors.white,
      alignItems: "center",
      justifyContent: "center",
    },
    locationTitle: { color: h.colors.text, fontSize: 13, fontWeight: "800" },
    locationText: {
      color: h.colors.muted,
      fontSize: 11,
      lineHeight: 17,
      marginTop: 4,
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
