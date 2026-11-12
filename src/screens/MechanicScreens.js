/* My Mechanic — screens/MechanicScreens.js. Restored from the production build of the existing app. */
/* eslint-disable */
const __RN = require("react-native");
const __rn = (name) => ({ __esModule: true, default: __RN[name] });
const __deps = [
  require("react"),
  __rn("Pressable"),
  __rn("ScrollView"),
  __rn("StyleSheet"),
  __rn("Switch"),
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
    (_e.MechanicOverviewScreen = function ({ navigation: e }) {
      const { state: t, signOut: o, backendError: n } = (0, b.useStore)(),
        a = S();
      if (!a)
        return (0, j.jsxs)(h.Screen, {
          children: [
            (0, j.jsx)(h.EmptyState, {
              icon: "construct-outline",
              title: "Mechanic profile unavailable",
              message:
                "Your account is signed in, but its mechanic profile has not been provisioned. Ask an administrator to check Supabase.",
            }),
            (0, j.jsx)(c.default, {
              style: { padding: 20 },
              children: (0, j.jsx)(h.Button, {
                label: "Sign out",
                onPress: () => {
                  o();
                },
              }),
            }),
          ],
        });
      const l = t.appointments.filter((e) => e.mechanicId === a.id),
        v = l.filter((e) => "pending" === e.status),
        k = l.filter((e) => "completed" === e.status),
        w = l
          .filter(
            (e) =>
              ["pending", "accepted"].includes(e.status) &&
              e.date >= (0, x.toISODate)(new Date()),
          )
          .sort((e, t) =>
            `${e.date}${e.time}`.localeCompare(`${t.date}${t.time}`),
          ),
        C = (0, x.averageRating)(a.id, t.reviews);
      return (0, j.jsx)(h.Screen, {
        children: (0, j.jsxs)(h.RefreshableScroll, {
          children: [
            (0, j.jsx)(h.ScreenTitle, {
              eyebrow: "MECHANIC WORKSPACE",
              title: `Hello, ${a.name.split(" ")[0]}`,
              subtitle: `${a.specialization} \xb7 ${a.isActive ? "accepting bookings" : "bookings paused"}`,
              right: (0, j.jsx)(h.IconButton, {
                icon: "settings-outline",
                label: "Settings",
                onPress: () => e.navigate("Settings"),
              }),
            }),
            !!n && (0, j.jsx)(h.InfoBanner, { tone: "red", message: n }),
            "blocked" === a.status &&
              (0, j.jsx)(h.InfoBanner, {
                tone: "red",
                message: "Your account is blocked. Contact an administrator.",
              }),
            (0, j.jsxs)(h.Card, {
              style: y.mechanicHero,
              children: [
                (0, j.jsx)(h.Avatar, {
                  name: a.name,
                  color: a.color,
                  size: 60,
                }),
                (0, j.jsxs)(c.default, {
                  style: { flex: 1 },
                  children: [
                    (0, j.jsx)(s.default, {
                      style: y.heroName,
                      children: a.name,
                    }),
                    (0, j.jsx)(s.default, {
                      style: y.heroAddress,
                      numberOfLines: 2,
                      children:
                        a.address || "Add your workshop address in Profile",
                    }),
                    (0, j.jsxs)(c.default, {
                      style: y.heroRating,
                      children: [
                        (0, j.jsx)(u.default, {
                          name: "star",
                          size: 14,
                          color: f.colors.yellow,
                        }),
                        (0, j.jsxs)(s.default, {
                          style: y.heroRatingText,
                          children: [
                            C ? C.toFixed(1) : "New",
                            " \xb7 ",
                            t.reviews.filter((e) => e.mechanicId === a.id)
                              .length,
                            " reviews",
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, j.jsx)(h.Badge, {
                  label: a.isActive ? "ONLINE" : "PAUSED",
                  tone: a.isActive ? "green" : "neutral",
                }),
              ],
            }),
            (0, j.jsxs)(c.default, {
              style: y.statGrid,
              children: [
                (0, j.jsx)(h.StatCard, {
                  label: "Pending requests",
                  value: v.length,
                  icon: "notifications-outline",
                  accent: !0,
                }),
                (0, j.jsx)(h.StatCard, {
                  label: "Completed jobs",
                  value: k.length,
                  icon: "checkmark-done-outline",
                }),
                (0, j.jsx)(h.StatCard, {
                  label: "Rating",
                  value: C ? C.toFixed(1) : "New",
                  icon: "star-outline",
                }),
              ],
            }),
            (0, j.jsxs)(h.Card, {
              style: y.mapPrompt,
              children: [
                (0, j.jsx)(c.default, {
                  style: y.mapPromptIcon,
                  children: (0, j.jsx)(u.default, {
                    name: "navigate",
                    size: 22,
                    color: f.colors.ink,
                  }),
                }),
                (0, j.jsxs)(c.default, {
                  style: { flex: 1 },
                  children: [
                    (0, j.jsx)(s.default, {
                      style: y.mapPromptTitle,
                      children:
                        "Your fixed workshop location",
                    }),
                    (0, j.jsx)(s.default, {
                      style: y.mapPromptText,
                      children:
                        "Set your workshop coordinates or place the marker on the map. GPS is not used.",
                    }),
                  ],
                }),
                (0, j.jsx)(h.Button, {
                  label: "Live map",
                  size: "small",
                  icon: "map-outline",
                  onPress: () => e.navigate("LiveMap"),
                }),
              ],
            }),
            (0, j.jsx)(h.SectionHeader, {
              title: "Upcoming appointments",
              subtitle: "Your next accepted and pending jobs",
              action: "All requests",
              onAction: () => e.navigate("Requests"),
            }),
            w.length
              ? w
                  .slice(0, 5)
                  .map((e) =>
                    (0, j.jsx)(
                      p.AppointmentCard,
                      {
                        appointment: e,
                        viewerRole: "mechanic",
                        clientName:
                          t.clients.find((t) => t.id === e.clientId)?.name ||
                          "Driver",
                        mechanicName: a.name,
                      },
                      e.id,
                    ),
                  )
              : (0, j.jsx)(h.EmptyState, {
                  icon: "calendar-outline",
                  title: "No upcoming appointments",
                  message: "New driver requests will appear here in real time.",
                }),
          ],
        }),
      });
    }),
    (_e.MechanicRequestsScreen = function () {
      const { state: e, setAppointmentStatus: o } = (0, b.useStore)(),
        n = S(),
        [a, l] = (0, t.useState)("pending"),
        s = (0, t.useMemo)(
          () =>
            e.appointments
              .filter((e) => e.mechanicId === n?.id)
              .sort((e, t) =>
                `${t.date}${t.time}`.localeCompare(`${e.date}${e.time}`),
              ),
          [e.appointments, n?.id],
        ),
        c = "all" === a ? s : s.filter((e) => e.status === a),
        u = (e, t) => {
          o(e, t);
        };
      return (0, j.jsx)(h.Screen, {
        children: (0, j.jsxs)(h.RefreshableScroll, {
          children: [
            (0, j.jsx)(h.ScreenTitle, {
              eyebrow: "REQUESTS",
              title: "Booking requests",
              subtitle: "Accept, decline, or complete appointments.",
            }),
            (0, j.jsx)(h.SegmentedControl, {
              value: a,
              onChange: l,
              options: [
                {
                  value: "pending",
                  label: "Pending",
                  count: s.filter((e) => "pending" === e.status).length,
                },
                {
                  value: "accepted",
                  label: "Accepted",
                  count: s.filter((e) => "accepted" === e.status).length,
                },
                {
                  value: "completed",
                  label: "Completed",
                  count: s.filter((e) => "completed" === e.status).length,
                },
                { value: "all", label: "All", count: s.length },
              ],
            }),
            c.length
              ? c.map((t) =>
                  (0, j.jsx)(
                    p.AppointmentCard,
                    {
                      appointment: t,
                      viewerRole: "mechanic",
                      clientName:
                        e.clients.find((e) => e.id === t.clientId)?.name ||
                        "Driver",
                      mechanicName: n?.name || "Mechanic",
                      actions: (0, j.jsxs)(j.Fragment, {
                        children: [
                          "pending" === t.status &&
                            (0, j.jsxs)(j.Fragment, {
                              children: [
                                (0, j.jsx)(h.Button, {
                                  label: "Decline",
                                  variant: "danger",
                                  size: "small",
                                  onPress: () => u(t.id, "declined"),
                                }),
                                (0, j.jsx)(h.Button, {
                                  label: "Accept",
                                  icon: "checkmark",
                                  size: "small",
                                  onPress: () => u(t.id, "accepted"),
                                }),
                              ],
                            }),
                          "accepted" === t.status &&
                            (0, j.jsx)(h.Button, {
                              label: "Mark completed",
                              icon: "checkmark-done",
                              size: "small",
                              onPress: () => u(t.id, "completed"),
                            }),
                        ],
                      }),
                    },
                    t.id,
                  ),
                )
              : (0, j.jsx)(h.EmptyState, {
                  icon: "clipboard-outline",
                  title: "Nothing here",
                  message:
                    "There are no appointments in this view. New requests sync automatically.",
                }),
          ],
        }),
      });
    }),
    (_e.MechanicScheduleScreen = function () {
      const {
          state: e,
          toggleAvailability: a,
          setDayAvailability: l,
        } = (0, b.useStore)(),
        p = S(),
        v = (0, t.useMemo)(
          () =>
            Array.from({ length: 14 }, (e, t) => (0, x.addDays)(new Date(), t)),
          [],
        ),
        [k, w] = (0, t.useState)((0, x.toISODate)(new Date()));
      if (!p) return null;
      const C = p.availability[k] ?? [],
        T = e.appointments.filter(
          (e) =>
            e.mechanicId === p.id &&
            e.date === k &&
            ["pending", "accepted"].includes(e.status),
        );
      return (0, j.jsx)(h.Screen, {
        children: (0, j.jsxs)(h.RefreshableScroll, {
          children: [
            (0, j.jsx)(h.ScreenTitle, {
              eyebrow: "AVAILABILITY",
              title: "Schedule",
              subtitle: "Tap a time slot to open or close it for bookings.",
            }),
            (0, j.jsx)(n.default, {
              horizontal: !0,
              showsHorizontalScrollIndicator: !1,
              contentContainerStyle: y.dateStrip,
              children: v.map((e) => {
                const t = e === k,
                  n = new Date(`${e}T12:00:00`);
                return (0, j.jsxs)(
                  o.default,
                  {
                    onPress: () => w(e),
                    style: [y.dateCard, t && y.dateCardSelected],
                    children: [
                      (0, j.jsx)(s.default, {
                        style: [y.dateWeekday, t && { color: f.colors.lime }],
                        children: new Intl.DateTimeFormat("en-US", {
                          weekday: "short",
                        }).format(n),
                      }),
                      (0, j.jsx)(s.default, {
                        style: [y.dateNumber, t && { color: f.colors.white }],
                        children: n.getDate(),
                      }),
                      (0, j.jsx)(s.default, {
                        style: [y.dateMonth, t && { color: "#B7C2BA" }],
                        children: new Intl.DateTimeFormat("en-US", {
                          month: "short",
                        }).format(n),
                      }),
                    ],
                  },
                  e,
                );
              }),
            }),
            (0, j.jsx)(h.SectionHeader, {
              title: (0, x.formatLongDate)(k),
              subtitle: `${C.length} open slots \xb7 ${T.length} booked`,
            }),
            (0, j.jsxs)(c.default, {
              style: y.scheduleActions,
              children: [
                (0, j.jsx)(h.Button, {
                  label: "Open all",
                  size: "small",
                  variant: "secondary",
                  icon: "checkmark-done-outline",
                  onPress: () => {
                    l(p.id, k, x.DEFAULT_SLOTS);
                  },
                }),
                (0, j.jsx)(h.Button, {
                  label: "Close unbooked",
                  size: "small",
                  variant: "secondary",
                  icon: "close-outline",
                  onPress: () => {
                    l(
                      p.id,
                      k,
                      T.map((e) => e.time),
                    );
                  },
                }),
              ],
            }),
            (0, j.jsx)(c.default, {
              style: y.slotGrid,
              children: x.DEFAULT_SLOTS.map((e) => {
                const t = C.includes(e),
                  n = T.find((t) => t.time === e);
                return (0, j.jsxs)(
                  o.default,
                  {
                    disabled: !!n,
                    onPress: () => {
                      a(p.id, k, e);
                    },
                    style: [y.slot, t && y.slotOpen, n && y.slotBooked],
                    children: [
                      (0, j.jsx)(u.default, {
                        name: n
                          ? "lock-closed"
                          : t
                            ? "checkmark-circle"
                            : "add-circle-outline",
                        size: 21,
                        color: n
                          ? f.colors.blue
                          : t
                            ? "#56852D"
                            : f.colors.muted,
                      }),
                      (0, j.jsx)(s.default, {
                        style: [y.slotTime, t && { color: f.colors.text }],
                        children: e,
                      }),
                      (0, j.jsx)(s.default, {
                        style: y.slotStatus,
                        children: n ? "Booked" : t ? "Open" : "Closed",
                      }),
                    ],
                  },
                  e,
                );
              }),
            }),
            (0, j.jsx)(h.InfoBanner, {
              tone: "blue",
              icon: "information-circle-outline",
              message:
                "Booked slots stay locked so an existing appointment cannot be accidentally removed. Changes save to the shared schedule immediately.",
            }),
          ],
        }),
      });
    }),
    (_e.MechanicProfileScreen = function ({ navigation: e }) {
      const {
          state: o,
          updateMechanic: n,
          toggleMechanicActive: a,
          signOut: u,
          backendError: p,
        } = (0, b.useStore)(),
        x = S(),
        [v, k] = (0, t.useState)(x?.specialization ?? ""),
        [w, C] = (0, t.useState)(String(x?.experienceYears ?? 0)),
        [T, A] = (0, t.useState)(x?.bio ?? ""),
        [B, I] = (0, t.useState)(x?.address ?? ""),
        [P, z] = (0, t.useState)(!1),
        [D, R] = (0, t.useState)(!1);
      if (
        ((0, t.useEffect)(() => {
          x &&
            (k(x.specialization),
            C(String(x.experienceYears)),
            A(x.bio),
            I(x.address));
        }, [x?.id]),
        !x)
      )
        return null;
      return (0, j.jsx)(h.Screen, {
        children: (0, j.jsxs)(h.RefreshableScroll, {
          children: [
            (0, j.jsx)(h.ScreenTitle, {
              eyebrow: "YOUR PUBLIC PROFILE",
              title: "Profile & settings",
              subtitle: "Manage what drivers see and how they reach you.",
            }),
            !!p && (0, j.jsx)(h.InfoBanner, { tone: "red", message: p }),
            D &&
              (0, j.jsx)(h.InfoBanner, {
                tone: "green",
                icon: "checkmark-circle-outline",
                message: "Your public mechanic profile was saved.",
              }),
            (0, j.jsxs)(h.Card, {
              style: y.profileCard,
              children: [
                (0, j.jsx)(h.Avatar, {
                  name: x.name,
                  color: x.color,
                  size: 64,
                }),
                (0, j.jsx)(s.default, {
                  style: y.profileName,
                  children: x.name,
                }),
                (0, j.jsxs)(s.default, {
                  style: y.profileContact,
                  children: [x.email, "\n", x.phone],
                }),
                (0, j.jsx)(h.Badge, {
                  label: "blocked" === x.status ? "Blocked" : "Active account",
                  tone: "blocked" === x.status ? "red" : "green",
                }),
              ],
            }),
            (0, j.jsxs)(h.Card, {
              style: y.activeCard,
              children: [
                (0, j.jsxs)(c.default, {
                  style: { flex: 1 },
                  children: [
                    (0, j.jsx)(s.default, {
                      style: y.activeTitle,
                      children: "Accept new bookings",
                    }),
                    (0, j.jsx)(s.default, {
                      style: y.activeText,
                      children:
                        "Turn this off to hide your booking button without changing existing appointments.",
                    }),
                  ],
                }),
                (0, j.jsx)(l.default, {
                  value: x.isActive,
                  onValueChange: () => {
                    a(x.id);
                  },
                  trackColor: { false: "#D8DDD5", true: f.colors.limeDark },
                }),
              ],
            }),
            (0, j.jsx)(h.SectionHeader, { title: "Public details" }),
            (0, j.jsx)(h.Field, {
              label: "Specialization",
              icon: "construct-outline",
              value: v,
              onChangeText: k,
            }),
            (0, j.jsx)(h.Field, {
              label: "Years of experience",
              icon: "briefcase-outline",
              value: w,
              onChangeText: C,
              keyboardType: "number-pad",
            }),
            (0, j.jsx)(h.Field, {
              label: "Workshop address",
              icon: "location-outline",
              value: B,
              onChangeText: I,
            }),
            (0, j.jsx)(h.Field, {
              label: "Bio shown to drivers",
              icon: "document-text-outline",
              value: T,
              onChangeText: A,
              multiline: !0,
            }),
            (0, j.jsx)(h.Button, {
              label: "Save changes",
              icon: "checkmark",
              size: "large",
              full: !0,
              loading: P,
              onPress: async () => {
                (z(!0),
                  R(!1),
                  await n(x.id, {
                    specialization: v.trim(),
                    experienceYears: Number(w) || 0,
                    bio: T.trim(),
                    address: B.trim(),
                  }),
                  z(!1),
                  R(!0));
              },
            }),
            (0, j.jsx)(h.Button, {
              label: "Set workshop location",
              icon: "navigate-outline",
              variant: "secondary",
              full: !0,
              style: { marginTop: 10 },
              onPress: () => e.navigate("LiveMap"),
            }),
            (0, j.jsx)(h.SectionHeader, { title: "Security" }),
            (0, j.jsx)(h.Button, {
              label: "Change password",
              icon: "lock-closed-outline",
              variant: "secondary",
              full: !0,
              onPress: () => e.navigate("ChangePassword"),
            }),

          ],
        }),
      });
    }));
  var t = r(d[0]),
    o = e(r(d[1])),
    n = e(r(d[2])),
    a = e(r(d[3])),
    l = e(r(d[4])),
    s = e(r(d[5])),
    c = e(r(d[6])),
    u = e(r(d[7])),
    p = r(d[8]),
    h = r(d[9]),
    f = r(d[10]),
    x = r(d[11]),
    b = r(d[12]),
    j = r(d[13]);
  function S() {
    const { state: e } = (0, b.useStore)();
    return e.mechanics.find((t) => t.id === e.session?.userId);
  }
  const y = a.default.create({
    mechanicHero: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 13,
      marginBottom: 14,
    },
    heroName: { color: f.colors.text, fontSize: 18, fontWeight: "800" },
    heroAddress: {
      color: f.colors.muted,
      fontSize: 11,
      lineHeight: 16,
      marginTop: 4,
    },
    heroRating: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      marginTop: 6,
    },
    heroRatingText: { color: f.colors.muted, fontSize: 11 },
    statGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
    mapPrompt: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 12,
      backgroundColor: f.colors.softGreen,
      marginTop: 16,
      marginBottom: 14,
    },
    mapPromptIcon: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: f.colors.white,
      alignItems: "center",
      justifyContent: "center",
    },
    mapPromptTitle: { color: f.colors.text, fontSize: 13, fontWeight: "800" },
    mapPromptText: {
      color: f.colors.muted,
      fontSize: 11,
      lineHeight: 16,
      marginTop: 4,
      maxWidth: 480,
    },
    dateStrip: { gap: 9, paddingBottom: 18 },
    dateCard: {
      width: 65,
      borderRadius: 15,
      paddingVertical: 12,
      backgroundColor: f.colors.white,
      borderWidth: 1,
      borderColor: f.colors.line,
      alignItems: "center",
    },
    dateCardSelected: {
      backgroundColor: f.colors.ink,
      borderColor: f.colors.ink,
    },
    dateWeekday: { color: f.colors.muted, fontSize: 10, fontWeight: "700" },
    dateNumber: {
      color: f.colors.text,
      fontSize: 22,
      fontWeight: "800",
      marginVertical: 3,
    },
    dateMonth: { color: f.colors.faint, fontSize: 10 },
    scheduleActions: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 14,
    },
    slotGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginBottom: 16,
    },
    slot: {
      width: "47%",
      flexGrow: 1,
      minWidth: 140,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: f.colors.line,
      backgroundColor: f.colors.white,
      padding: 16,
      alignItems: "center",
    },
    slotOpen: { backgroundColor: f.colors.softGreen, borderColor: "#D4E5C2" },
    slotBooked: {
      backgroundColor: f.colors.softBlue,
      borderColor: "#D4E0F6",
      opacity: 0.85,
    },
    slotTime: {
      color: f.colors.muted,
      fontSize: 18,
      fontWeight: "800",
      marginTop: 7,
    },
    slotStatus: { color: f.colors.muted, fontSize: 10, marginTop: 4 },
    profileCard: { alignItems: "center", paddingVertical: 24 },
    profileName: {
      color: f.colors.text,
      fontSize: 20,
      fontWeight: "800",
      marginTop: 12,
    },
    profileContact: {
      color: f.colors.muted,
      fontSize: 12,
      lineHeight: 19,
      textAlign: "center",
      marginVertical: 8,
    },
    activeCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginTop: 12,
    },
    activeTitle: { color: f.colors.text, fontSize: 14, fontWeight: "800" },
    activeText: {
      color: f.colors.muted,
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
