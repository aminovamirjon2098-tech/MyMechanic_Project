/* My Mechanic — screens/ModalScreens.js. Restored from the production build of the existing app. */
/* eslint-disable */
const __RN = require("react-native");
const __rn = (name) => ({ __esModule: true, default: __RN[name] });
const __Ionicons = require("@expo/vector-icons/Ionicons").default;
const __Pressable = require("react-native").Pressable;
const __colors = require("../theme").colors;
const __deps = [
  require("react"),
  require("../i18n/TranslatedAlert"),
  __rn("KeyboardAvoidingView"),
  __rn("Linking"),
  __rn("Platform"),
  __rn("Pressable"),
  __rn("ScrollView"),
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
(function (g, r, i, a, m, _e, d) {
  "use strict";
  function e(e) {
    return e && e.__esModule ? e : { default: e };
  }
  (Object.defineProperty(_e, "__esModule", { value: !0 }),
    (_e.MechanicFormScreen = function ({ navigation: e }) {
      const { createMechanicAccount: n } = (0, j.useStore)(),
        [l, c] = (0, t.useState)(""),
        [u, p] = (0, t.useState)(""),
        [f, v] = (0, t.useState)(""),
        [w, T] = (0, t.useState)("General repair"),
        [B, P] = (0, t.useState)(""),
        [I, z] = (0, t.useState)(""),
        [A, D] = (0, t.useState)(""),
        [E, N] = (0, t.useState)("General inspection"),
        [F, R] = (0, t.useState)("75"),
        [W, M] = (0, t.useState)(!1),
        [H, L] = (0, t.useState)(""),
        // Sign-in password chosen by the administrator (permanent, not temporary).
        [__pw, __setPw] = (0, t.useState)(""),
        [__showPw, __setShowPw] = (0, t.useState)(!1),
        // Workshop coordinates for the live Yandex map.
        [__lat, __setLat] = (0, t.useState)(""),
        [__lng, __setLng] = (0, t.useState)("");
      return (0, S.jsx)(b.Screen, {
        edges: ["top", "bottom"],
        children: (0, S.jsxs)(k, {
          children: [
            (0, S.jsx)(b.ScreenTitle, {
              eyebrow: "ADMIN ONLY",
              title: "Add a mechanic",
              subtitle: "Only administrators can create mechanic accounts.",
              right: (0, S.jsx)(b.IconButton, {
                icon: "close",
                label: "Close",
                onPress: () => e.goBack(),
              }),
            }),
            !!H && (0, S.jsx)(b.InfoBanner, { tone: "red", message: H }),
            (0, S.jsx)(b.Field, {
              label: "Full name",
              icon: "person-outline",
              value: l,
              onChangeText: c,
              placeholder: "Mechanic\u2019s full name",
            }),
            (0, S.jsx)(b.Field, {
              label: "Work email (used to sign in)",
              icon: "mail-outline",
              value: u,
              onChangeText: p,
              autoCapitalize: "none",
              keyboardType: "email-address",
              placeholder: "name@mymechanic.app",
            }),
            (0, S.jsx)(b.Field, {
              label: "Phone number",
              icon: "call-outline",
              value: f,
              onChangeText: v,
              keyboardType: "phone-pad",
              placeholder: "+1 512 555 0100",
            }),
            (0, S.jsx)(b.Field, {
              label: "Password (used to sign in)",
              icon: "lock-closed-outline",
              value: __pw,
              onChangeText: __setPw,
              secureTextEntry: !__showPw,
              autoCapitalize: "none",
              autoCorrect: !1,
              textContentType: "newPassword",
              placeholder: "At least 6 characters",
              right: (0, S.jsx)(__Pressable, {
                onPress: () => __setShowPw((e) => !e),
                hitSlop: 10,
                accessibilityLabel: __showPw ? "Hide password" : "Show password",
                children: (0, S.jsx)(__Ionicons, {
                  name: __showPw ? "eye-off-outline" : "eye-outline",
                  size: 19,
                  color: __colors.muted,
                }),
              }),
            }),
            (0, S.jsx)(h.default, {
              style: C.inputLabel,
              children: "Specialization",
            }),
            (0, S.jsx)(x.default, {
              style: C.choiceWrap,
              children: [
                "General repair",
                "Diagnostics & Electrical",
                "European Vehicles",
                "Engine & Transmission",
                "EV & Hybrid Systems",
              ].map((e) =>
                (0, S.jsx)(
                  s.default,
                  {
                    onPress: () => T(e),
                    style: [C.choiceChip, w === e && C.choiceChipActive],
                    children: (0, S.jsx)(h.default, {
                      style: [C.choiceText, w === e && C.choiceTextActive],
                      children: e,
                    }),
                  },
                  e,
                ),
              ),
            }),
            (0, S.jsx)(b.Field, {
              label: "Years of experience",
              icon: "briefcase-outline",
              value: B,
              onChangeText: P,
              keyboardType: "number-pad",
              placeholder: "0",
            }),
            (0, S.jsx)(b.Field, {
              label: "Workshop address",
              icon: "location-outline",
              value: I,
              onChangeText: z,
              placeholder: "Street, city, state",
            }),
            (0, S.jsxs)(x.default, {
              style: { flexDirection: "row", gap: 10 },
              children: [
                (0, S.jsx)(b.Field, {
                  label: "Latitude",
                  icon: "navigate-outline",
                  value: __lat,
                  onChangeText: __setLat,
                  keyboardType: "numbers-and-punctuation",
                  placeholder: "41.31110",
                  containerStyle: { flex: 1 },
                }),
                (0, S.jsx)(b.Field, {
                  label: "Longitude",
                  icon: "navigate-outline",
                  value: __lng,
                  onChangeText: __setLng,
                  keyboardType: "numbers-and-punctuation",
                  placeholder: "69.27970",
                  containerStyle: { flex: 1 },
                }),
              ],
            }),
            (0, S.jsx)(b.Field, {
              label: "Bio shown to drivers",
              icon: "document-text-outline",
              value: A,
              onChangeText: D,
              multiline: !0,
              placeholder:
                "Experience, equipment, and approach to customer care",
            }),
            (0, S.jsx)(b.SectionHeader, {
              title: "Primary service",
              subtitle: "More services can be added through Supabase.",
            }),
            (0, S.jsx)(b.Field, {
              label: "Service name",
              icon: "build-outline",
              value: E,
              onChangeText: N,
            }),
            (0, S.jsx)(b.Button, {
              label: "Create mechanic account",
              onPress: async () => {
                if (!l.trim())
                  return void L("Enter the mechanic\u2019s full name.");
                if (!(0, y.isValidEmail)(u))
                  return void L("Enter a valid work email address.");
                if (!(0, y.isValidPhone)(f))
                  return void L("Enter a valid phone number.");
                if (__pw.trim().length < 6)
                  return void L("Set a sign-in password of at least 6 characters.");
                const __la = __lat.trim() ? Number(__lat.replace(",", ".")) : NaN,
                  __lo = __lng.trim() ? Number(__lng.replace(",", ".")) : NaN;
                if (
                  (__lat.trim() || __lng.trim()) &&
                  !(
                    Number.isFinite(__la) &&
                    Number.isFinite(__lo) &&
                    Math.abs(__la) <= 90 &&
                    Math.abs(__lo) <= 180
                  )
                )
                  return void L(
                    "Enter valid coordinates: latitude −90…90, longitude −180…180.",
                  );
                if (!E.trim())
                  return void L("Add a primary service.");
                (M(!0), L(""));
                const t = await n({
                  name: l.trim(),
                  email: u.trim(),
                  phone: f.trim(),
                  specialization: w,
                  experienceYears: Number(B) || 0,
                  bio: A.trim(),
                  address: I.trim(),
                  latitude: Number.isFinite(__la) ? __la : 39.6542,
                  longitude: Number.isFinite(__lo) ? __lo : 66.9597,
                  password: __pw.trim(),
                  services: [
                    {
                      id: "new-service",
                      name: E.trim(),
                      duration: 60,
                    },
                  ],
                });
                (M(!1),
                  t.error
                    ? L(t.error)
                    : o.default.alert(
                        "Mechanic account created",
                        `Share these sign-in details with ${l.trim()}:\n\n${u.trim()}\nPassword: ${t.tempPassword || __pw.trim()}\n\nThe mechanic can sign in right away with this email and password.`,
                        [{ text: "Done", onPress: () => e.goBack() }],
                      ));
              },
              icon: "person-add-outline",
              size: "large",
              full: !0,
              loading: W,
            }),
          ],
        }),
      });
    }),
    (_e.MechanicDetailScreen = function ({ navigation: e, route: t }) {
      const {
          state: n,
          toggleMechanicActive: s,
          blockUser: c,
          unblockUser: u,
        } = (0, j.useStore)(),
        f = n.session,
        k = n.mechanics.find((e) => e.id === t.params.mechanicId);
      if (!k)
        return (0, S.jsxs)(b.Screen, {
          children: [
            (0, S.jsx)(b.EmptyState, {
              icon: "construct-outline",
              title: "Mechanic not found",
              message:
                "This profile may have been removed. Pull down to refresh.",
            }),
            (0, S.jsx)(b.Button, {
              label: "Go back",
              onPress: () => e.goBack(),
            }),
          ],
        });
      const w = n.reviews.filter((e) => e.mechanicId === k.id),
        T = (0, y.averageRating)(k.id, n.reviews),
        B = "admin" === f?.role,
        P = "client" === f?.role;
      return (0, S.jsx)(b.Screen, {
        edges: ["top", "bottom"],
        children: (0, S.jsxs)(b.RefreshableScroll, {
          contentContainerStyle: C.formScroll,
          children: [
            (0, S.jsxs)(x.default, {
              style: C.detailHeader,
              children: [
                (0, S.jsx)(b.IconButton, {
                  icon: "close",
                  label: "Close",
                  onPress: () => e.goBack(),
                }),
                (0, S.jsx)(b.Badge, {
                  label: k.isActive ? "AVAILABLE" : "BOOKINGS PAUSED",
                  tone: k.isActive ? "green" : "neutral",
                }),
              ],
            }),
            (0, S.jsxs)(b.Card, {
              style: C.mechanicDetailHero,
              children: [
                (0, S.jsx)(b.Avatar, {
                  name: k.name,
                  color: k.color,
                  size: 76,
                }),
                (0, S.jsx)(h.default, {
                  style: C.detailName,
                  children: k.name,
                }),
                (0, S.jsx)(h.default, {
                  style: C.detailSpecialty,
                  children: k.specialization,
                }),
                (0, S.jsxs)(x.default, {
                  style: C.ratingLine,
                  children: [
                    (0, S.jsx)(p.default, {
                      name: "star",
                      size: 16,
                      color: v.colors.yellow,
                    }),
                    (0, S.jsxs)(h.default, {
                      style: C.ratingText,
                      children: [
                        T ? T.toFixed(1) : "New",
                        " \xb7 ",
                        w.length,
                        " reviews \xb7 ",
                        k.experienceYears,
                        " years experience",
                      ],
                    }),
                  ],
                }),
                (0, S.jsx)(h.default, {
                  style: C.detailBio,
                  children:
                    k.bio || "This mechanic has not added a public bio yet.",
                }),
                (0, S.jsxs)(x.default, {
                  style: C.contactButtons,
                  children: [
                    (0, S.jsx)(b.Button, {
                      label: "Call",
                      icon: "call-outline",
                      variant: "secondary",
                      size: "small",
                      onPress: () => {
                        l.default.openURL(`tel:${k.phone}`);
                      },
                    }),
                    (0, S.jsx)(b.Button, {
                      label: "Email",
                      icon: "mail-outline",
                      variant: "secondary",
                      size: "small",
                      onPress: () => {
                        l.default.openURL(`mailto:${k.email}`);
                      },
                    }),
                  ],
                }),
              ],
            }),
            (0, S.jsxs)(b.Card, {
              style: C.addressCard,
              children: [
                (0, S.jsx)(p.default, {
                  name: "location-outline",
                  size: 22,
                  color: v.colors.ink,
                }),
                (0, S.jsxs)(x.default, {
                  style: { flex: 1 },
                  children: [
                    (0, S.jsx)(h.default, {
                      style: C.addressTitle,
                      children: "Workshop",
                    }),
                    (0, S.jsx)(h.default, {
                      style: C.addressText,
                      children: k.address || "Address not provided",
                    }),
                  ],
                }),
              ],
            }),
            B &&
              (0, S.jsxs)(b.Card, {
                style: C.adminControl,
                children: [
                  (0, S.jsxs)(x.default, {
                    style: { flex: 1 },
                    children: [
                      (0, S.jsx)(h.default, {
                        style: C.adminControlTitle,
                        children: "Accepting new bookings",
                      }),
                      (0, S.jsx)(h.default, {
                        style: C.adminControlText,
                        children:
                          "Changes appear on the driver booking screen immediately.",
                      }),
                    ],
                  }),
                  (0, S.jsx)(b.Button, {
                    label: k.isActive ? "Pause" : "Activate",
                    size: "small",
                    variant: k.isActive ? "danger" : "primary",
                    onPress: () => {
                      s(k.id);
                    },
                  }),
                ],
              }),
            (0, S.jsx)(b.SectionHeader, {
              title: "Services",
              subtitle: `${k.services.length} bookable options`,
            }),
            k.services.length
              ? k.services.map((e) =>
                  (0, S.jsxs)(
                    b.Card,
                    {
                      style: C.serviceRow,
                      children: [
                        (0, S.jsx)(x.default, {
                          style: C.serviceIcon,
                          children: (0, S.jsx)(p.default, {
                            name: "build-outline",
                            size: 20,
                            color: v.colors.ink,
                          }),
                        }),
                        (0, S.jsxs)(x.default, {
                          style: { flex: 1 },
                          children: [
                            (0, S.jsx)(h.default, {
                              style: C.serviceTitle,
                              children: e.name,
                            }),
                            (0, S.jsxs)(h.default, {
                              style: C.serviceDuration,
                              children: [e.duration, " minutes"],
                            }),
                          ],
                        }),
                      ],
                    },
                    e.id,
                  ),
                )
              : (0, S.jsx)(b.EmptyState, {
                  icon: "build-outline",
                  title: "No services listed",
                  message: "This mechanic has not added services yet.",
                }),
            (0, S.jsx)(b.SectionHeader, {
              title: "Reviews",
              subtitle: "Verified feedback from driver appointments",
            }),
            w.length
              ? w.map((e) =>
                  (0, S.jsxs)(
                    b.Card,
                    {
                      style: C.reviewCard,
                      children: [
                        (0, S.jsxs)(x.default, {
                          style: C.reviewTop,
                          children: [
                            (0, S.jsx)(b.Avatar, {
                              name: e.clientName,
                              size: 38,
                              color: "#EDF5E5",
                            }),
                            (0, S.jsxs)(x.default, {
                              style: { flex: 1 },
                              children: [
                                (0, S.jsx)(h.default, {
                                  style: C.reviewName,
                                  children: e.clientName,
                                }),
                                (0, S.jsxs)(h.default, {
                                  style: C.reviewMeta,
                                  children: [
                                    e.serviceName,
                                    " \xb7 ",
                                    (0, y.formatDate)(e.date),
                                  ],
                                }),
                              ],
                            }),
                            (0, S.jsxs)(x.default, {
                              style: C.ratingLine,
                              children: [
                                (0, S.jsx)(p.default, {
                                  name: "star",
                                  size: 14,
                                  color: v.colors.yellow,
                                }),
                                (0, S.jsx)(h.default, {
                                  style: C.ratingText,
                                  children: e.rating,
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, S.jsx)(h.default, {
                          style: C.reviewComment,
                          children: e.comment,
                        }),
                      ],
                    },
                    e.id,
                  ),
                )
              : (0, S.jsx)(b.EmptyState, {
                  icon: "star-outline",
                  title: "No reviews yet",
                  message: "Completed appointments can be reviewed by drivers.",
                }),
            P &&
              (0, S.jsx)(b.Button, {
                label: "Book an appointment",
                icon: "calendar-outline",
                size: "large",
                full: !0,
                disabled: !k.isActive || "blocked" === k.status,
                onPress: () => e.navigate("Booking", { mechanicId: k.id }),
                style: { marginTop: 14 },
              }),
            B &&
              (0, S.jsx)(b.Button, {
                label:
                  "blocked" === k.status ? "Unblock account" : "Block account",
                icon:
                  "blocked" === k.status
                    ? "checkmark-circle-outline"
                    : "ban-outline",
                variant: "blocked" === k.status ? "secondary" : "danger",
                full: !0,
                style: { marginTop: 14 },
                onPress: () =>
                  o.default.alert(
                    "blocked" === k.status
                      ? "Unblock this account?"
                      : "Block this account?",
                    "blocked" === k.status
                      ? "The mechanic will be able to sign in again."
                      : "The mechanic will no longer be able to use their account.",
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "blocked" === k.status ? "Unblock" : "Block",
                        style:
                          "blocked" === k.status ? "default" : "destructive",
                        onPress: () => {
                          "blocked" === k.status ? u(k.id) : c(k.id);
                        },
                      },
                    ],
                  ),
              }),
          ],
        }),
      });
    }),
    (_e.ClientDetailScreen = function ({ navigation: e, route: t }) {
      const { state: o, blockUser: n, unblockUser: s } = (0, j.useStore)(),
        c = o.clients.find((e) => e.id === t.params.clientId);
      if (!c)
        return (0, S.jsxs)(b.Screen, {
          children: [
            (0, S.jsx)(b.EmptyState, {
              icon: "person-outline",
              title: "Driver not found",
              message: "This profile may have been removed.",
            }),
            (0, S.jsx)(b.Button, {
              label: "Go back",
              onPress: () => e.goBack(),
            }),
          ],
        });
      const u = o.appointments.filter((e) => e.clientId === c.id);
      return (0, S.jsx)(b.Screen, {
        edges: ["top", "bottom"],
        children: (0, S.jsxs)(b.RefreshableScroll, {
          contentContainerStyle: C.formScroll,
          children: [
            (0, S.jsxs)(x.default, {
              style: C.detailHeader,
              children: [
                (0, S.jsx)(b.IconButton, {
                  icon: "close",
                  label: "Close",
                  onPress: () => e.goBack(),
                }),
                (0, S.jsx)(b.Badge, {
                  label: "blocked" === c.status ? "BLOCKED" : "ACTIVE",
                  tone: "blocked" === c.status ? "red" : "green",
                }),
              ],
            }),
            (0, S.jsxs)(b.Card, {
              style: C.mechanicDetailHero,
              children: [
                (0, S.jsx)(b.Avatar, {
                  name: c.name,
                  color: c.color,
                  size: 72,
                }),
                (0, S.jsx)(h.default, {
                  style: C.detailName,
                  children: c.name,
                }),
                (0, S.jsxs)(h.default, {
                  style: C.detailSpecialty,
                  children: [
                    "Driver \xb7 registered ",
                    (0, y.formatDate)(c.createdAt),
                  ],
                }),
                (0, S.jsxs)(h.default, {
                  style: C.detailBio,
                  children: [
                    c.email,
                    "\n",
                    c.phone,
                    "\n",
                    c.address || "No address provided",
                  ],
                }),
                (0, S.jsxs)(h.default, {
                  style: C.detailBio,
                  children: ["Preferred contact: ", c.preferredContact],
                }),
                (0, S.jsxs)(x.default, {
                  style: C.contactButtons,
                  children: [
                    (0, S.jsx)(b.Button, {
                      label: "Call",
                      icon: "call-outline",
                      variant: "secondary",
                      size: "small",
                      onPress: () => {
                        l.default.openURL(`tel:${c.phone}`);
                      },
                    }),
                    (0, S.jsx)(b.Button, {
                      label: "Email",
                      icon: "mail-outline",
                      variant: "secondary",
                      size: "small",
                      onPress: () => {
                        l.default.openURL(`mailto:${c.email}`);
                      },
                    }),
                  ],
                }),
              ],
            }),
            (0, S.jsx)(b.SectionHeader, {
              title: "Vehicles",
              subtitle: `${c.cars.length} saved vehicles`,
            }),
            c.cars.length
              ? c.cars.map((e) => (0, S.jsx)(f.CarCard, { car: e }, e.id))
              : (0, S.jsx)(b.EmptyState, {
                  icon: "car-sport-outline",
                  title: "No vehicles yet",
                  message: "This driver has not added a vehicle.",
                }),
            (0, S.jsx)(b.SectionHeader, {
              title: "Booking history",
              subtitle: `${u.length} total appointments`,
            }),
            u.length
              ? u.map((e) =>
                  (0, S.jsx)(
                    f.AppointmentCard,
                    {
                      appointment: e,
                      viewerRole: "admin",
                      clientName: c.name,
                      mechanicName:
                        o.mechanics.find((t) => t.id === e.mechanicId)?.name ||
                        "Mechanic",
                    },
                    e.id,
                  ),
                )
              : (0, S.jsx)(b.EmptyState, {
                  icon: "calendar-outline",
                  title: "No bookings yet",
                  message: "This driver has not requested an appointment.",
                }),
            (0, S.jsx)(b.Button, {
              label:
                "blocked" === c.status ? "Unblock account" : "Block account",
              icon:
                "blocked" === c.status
                  ? "checkmark-circle-outline"
                  : "ban-outline",
              variant: "blocked" === c.status ? "secondary" : "danger",
              full: !0,
              onPress: () => {
                "blocked" === c.status ? s(c.id) : n(c.id);
              },
            }),
          ],
        }),
      });
    }),
    (_e.BookingScreen = function ({ navigation: e, route: n }) {
      const { state: l, bookAppointment: u } = (0, j.useStore)(),
        f = l.mechanics.find((e) => e.id === n.params.mechanicId),
        w = l.clients.find((e) => e.id === l.session?.userId),
        [T, B] = (0, t.useState)(
          (n.params?.serviceId &&
            f?.services.find((e) => e.id === n.params.serviceId)?.id) ||
            f?.services[0]?.id ||
            "",
        ),
        [P, I] = (0, t.useState)(w?.cars[0]?.id || ""),
        z = (0, t.useMemo)(
          () =>
            Array.from({ length: 10 }, (e, t) => (0, y.addDays)(new Date(), t)),
          [],
        ),
        [A, D] = (0, t.useState)(z[0]),
        [E, N] = (0, t.useState)(""),
        [F, R] = (0, t.useState)(""),
        [W, M] = (0, t.useState)(!1),
        [H, L] = (0, t.useState)("");
      if (!f || !w)
        return (0, S.jsxs)(b.Screen, {
          children: [
            (0, S.jsx)(b.EmptyState, {
              icon: "calendar-outline",
              title: "Unable to book",
              message: "The mechanic or driver profile is unavailable.",
            }),
            (0, S.jsx)(b.Button, {
              label: "Go back",
              onPress: () => e.goBack(),
            }),
          ],
        });
      const U = f.services.find((e) => e.id === T),
        $ = w.cars.find((e) => e.id === P),
        V = l.appointments
          .filter(
            (e) =>
              e.mechanicId === f.id &&
              e.date === A &&
              ["pending", "accepted"].includes(e.status),
          )
          .map((e) => e.time),
        G = (f.availability[A] ?? []).filter((e) => !V.includes(e));
      return (0, S.jsx)(b.Screen, {
        edges: ["top", "bottom"],
        children: (0, S.jsxs)(k, {
          children: [
            (0, S.jsx)(b.ScreenTitle, {
              eyebrow: "BOOK WITH CONFIDENCE",
              title: "Book an appointment",
              subtitle: `${f.name} \xb7 ${f.specialization}`,
              right: (0, S.jsx)(b.IconButton, {
                icon: "close",
                label: "Close",
                onPress: () => e.goBack(),
              }),
            }),
            !!H && (0, S.jsx)(b.InfoBanner, { tone: "red", message: H }),
            (0, S.jsx)(b.SectionHeader, { title: "Choose a service" }),
            f.services.map((e) =>
              (0, S.jsxs)(
                s.default,
                {
                  onPress: () => B(e.id),
                  style: [C.selectionRow, T === e.id && C.selectionRowActive],
                  children: [
                    (0, S.jsxs)(x.default, {
                      style: { flex: 1 },
                      children: [
                        (0, S.jsx)(h.default, {
                          style: C.selectionTitle,
                          children: e.name,
                        }),
                        (0, S.jsxs)(h.default, {
                          style: C.selectionMeta,
                          children: [e.duration, " minutes"],
                        }),
                      ],
                    }),
                    (0, S.jsx)(p.default, {
                      name: T === e.id ? "checkmark-circle" : "ellipse-outline",
                      size: 21,
                      color: T === e.id ? v.colors.limeDark : v.colors.faint,
                    }),
                  ],
                },
                e.id,
              ),
            ),
            (0, S.jsx)(b.SectionHeader, {
              title: "Your vehicle",
              action: "Add vehicle",
              onAction: () => e.navigate("CarForm"),
            }),
            w.cars.length
              ? w.cars.map((e) =>
                  (0, S.jsxs)(
                    s.default,
                    {
                      onPress: () => I(e.id),
                      style: [
                        C.selectionRow,
                        P === e.id && C.selectionRowActive,
                      ],
                      children: [
                        (0, S.jsx)(p.default, {
                          name: "car-sport-outline",
                          size: 22,
                          color: v.colors.ink,
                        }),
                        (0, S.jsxs)(x.default, {
                          style: { flex: 1 },
                          children: [
                            (0, S.jsxs)(h.default, {
                              style: C.selectionTitle,
                              children: [e.year, " ", e.make, " ", e.model],
                            }),
                            (0, S.jsxs)(h.default, {
                              style: C.selectionMeta,
                              children: [e.plate, " \xb7 ", e.color],
                            }),
                          ],
                        }),
                        (0, S.jsx)(p.default, {
                          name:
                            P === e.id ? "checkmark-circle" : "ellipse-outline",
                          size: 21,
                          color:
                            P === e.id ? v.colors.limeDark : v.colors.faint,
                        }),
                      ],
                    },
                    e.id,
                  ),
                )
              : (0, S.jsx)(b.EmptyState, {
                  icon: "car-sport-outline",
                  title: "No vehicles yet",
                  message: "Add a vehicle before requesting this appointment.",
                  action: "Add vehicle",
                  onAction: () => e.navigate("CarForm"),
                }),
            (0, S.jsx)(b.SectionHeader, { title: "Choose a date" }),
            (0, S.jsx)(c.default, {
              horizontal: !0,
              showsHorizontalScrollIndicator: !1,
              contentContainerStyle: C.bookingDates,
              children: z.map((e) => {
                const t = e === A;
                return (0, S.jsxs)(
                  s.default,
                  {
                    onPress: () => {
                      (D(e), N(""));
                    },
                    style: [C.bookingDate, t && C.bookingDateActive],
                    children: [
                      (0, S.jsx)(h.default, {
                        style: [
                          C.bookingDateText,
                          t && { color: v.colors.white },
                        ],
                        children: (0, y.formatDate)(e, { weekday: "short" }),
                      }),
                      (0, S.jsx)(h.default, {
                        style: [
                          C.bookingDateNumber,
                          t && { color: v.colors.lime },
                        ],
                        children: Number(e.slice(-2)),
                      }),
                    ],
                  },
                  e,
                );
              }),
            }),
            (0, S.jsx)(b.SectionHeader, {
              title: "Choose a time",
              subtitle: `${G.length} slots currently available`,
            }),
            G.length
              ? (0, S.jsx)(x.default, {
                  style: C.timeGrid,
                  children: G.map((e) =>
                    (0, S.jsx)(
                      s.default,
                      {
                        onPress: () => N(e),
                        style: [C.timeSlot, E === e && C.timeSlotActive],
                        children: (0, S.jsx)(h.default, {
                          style: [
                            C.timeSlotText,
                            E === e && { color: v.colors.white },
                          ],
                          children: e,
                        }),
                      },
                      e,
                    ),
                  ),
                })
              : (0, S.jsx)(b.InfoBanner, {
                  tone: "orange",
                  icon: "calendar-outline",
                  message:
                    "This day is fully booked or closed. Choose another date.",
                }),
            (0, S.jsx)(b.Field, {
              label: "Notes for the mechanic (optional)",
              icon: "chatbox-outline",
              value: F,
              onChangeText: R,
              multiline: !0,
              placeholder:
                "Describe symptoms, warning lights, or anything the mechanic should know",
            }),
            U &&
              (0, S.jsxs)(b.Card, {
                style: C.summaryCard,
                children: [
                  (0, S.jsx)(h.default, {
                    style: C.summaryTitle,
                    children: "Booking summary",
                  }),
                  (0, S.jsxs)(h.default, {
                    style: C.summaryText,
                    children: [U.name, " \xb7 ", U.duration, " min"],
                  }),
                ],
              }),
            (0, S.jsx)(b.Button, {
              label: "Request appointment",
              onPress: async () => {
                if (!(U && $ && A && E))
                  return void L(
                    "Choose a service, vehicle, date, and available time.",
                  );
                (M(!0), L(""));
                const t = await u({
                  mechanicId: f.id,
                  clientId: w.id,
                  serviceId: U.id,
                  serviceName: U.name,
                  carId: $.id,
                  carLabel: `${$.year} ${$.make} ${$.model}`,
                  date: A,
                  time: E,
                  duration: U.duration,
                  note: F.trim(),
                });
                (M(!1),
                  t.error
                    ? L(t.error)
                    : o.default.alert(
                        "Appointment requested",
                        `${f.name} will review your request for ${(0, y.formatLongDate)(A)} at ${E}.`,
                        [
                          {
                            text: "View bookings",
                            onPress: () => {
                              (e.goBack(), e.navigate("Bookings"));
                            },
                          },
                        ],
                      ));
              },
              icon: "arrow-forward",
              size: "large",
              full: !0,
              loading: W,
              disabled: !U || !$ || !E,
            }),
          ],
        }),
      });
    }),
    (_e.ClientProfileFormScreen = function ({ navigation: e }) {
      const { state: n, updateClient: l } = (0, j.useStore)(),
        s = n.clients.find((e) => e.id === n.session?.userId),
        [c, u] = (0, t.useState)(s?.name ?? ""),
        [x, p] = (0, t.useState)(s?.phone ?? ""),
        [f, v] = (0, t.useState)(s?.address ?? ""),
        [w, T] = (0, t.useState)(s?.preferredContact ?? "Phone"),
        [B, P] = (0, t.useState)(!1);
      return s
        ? (0, S.jsx)(b.Screen, {
            edges: ["top", "bottom"],
            children: (0, S.jsxs)(k, {
              children: [
                (0, S.jsx)(b.ScreenTitle, {
                  eyebrow: "YOUR PROFILE",
                  title: "Edit profile",
                  subtitle: "You can only edit your own information.",
                  right: (0, S.jsx)(b.IconButton, {
                    icon: "close",
                    label: "Close",
                    onPress: () => e.goBack(),
                  }),
                }),
                (0, S.jsx)(b.Field, {
                  label: "Full name",
                  icon: "person-outline",
                  value: c,
                  onChangeText: u,
                }),
                (0, S.jsx)(b.Field, {
                  label: "Phone number",
                  icon: "call-outline",
                  value: x,
                  onChangeText: p,
                  keyboardType: "phone-pad",
                }),
                (0, S.jsx)(b.Field, {
                  label: "Address",
                  icon: "location-outline",
                  value: f,
                  onChangeText: v,
                }),
                (0, S.jsx)(h.default, {
                  style: C.inputLabel,
                  children: "Preferred contact method",
                }),
                (0, S.jsx)(b.SegmentedControl, {
                  value: w,
                  onChange: T,
                  options: [
                    { value: "Phone", label: "Phone" },
                    { value: "Email", label: "Email" },
                  ],
                }),
                (0, S.jsx)(b.InfoBanner, {
                  tone: "blue",
                  message: `Sign-in email: ${s.email} (email cannot be changed here)`,
                }),
                (0, S.jsx)(b.Button, {
                  label: "Save changes",
                  onPress: async () => {
                    c.trim() && (0, y.isValidPhone)(x)
                      ? (P(!0),
                        await l(s.id, {
                          name: c.trim(),
                          phone: x.trim(),
                          address: f.trim(),
                          preferredContact: w,
                        }),
                        P(!1),
                        e.goBack())
                      : o.default.alert(
                          "Check your details",
                          "Enter your name and a valid phone number.",
                        );
                  },
                  icon: "checkmark",
                  size: "large",
                  full: !0,
                  loading: B,
                }),
                (0, S.jsx)(b.Button, {
                  label: "Change password",
                  onPress: () => e.navigate("ChangePassword"),
                  icon: "lock-closed-outline",
                  variant: "secondary",
                  full: !0,
                  style: { marginTop: 10 },
                }),
              ],
            }),
          })
        : null;
    }),
    (_e.CarFormScreen = function ({ navigation: e, route: n }) {
      const { state: l, saveCar: s, deleteCar: c } = (0, j.useStore)(),
        u = l.clients.find((e) => e.id === l.session?.userId),
        x = u?.cars.find((e) => e.id === n.params?.carId),
        [p, f] = (0, t.useState)(x?.make ?? ""),
        [v, w] = (0, t.useState)(x?.model ?? ""),
        [T, B] = (0, t.useState)(String(x?.year ?? new Date().getFullYear())),
        [P, I] = (0, t.useState)(x?.plate ?? ""),
        [z, A] = (0, t.useState)(x?.vin ?? ""),
        [D, E] = (0, t.useState)(String(x?.mileage ?? "")),
        [N, F] = (0, t.useState)(x?.fuel ?? "Petrol"),
        [R, W] = (0, t.useState)(x?.color ?? ""),
        [M, H] = (0, t.useState)(!1),
        [L, U] = (0, t.useState)("");
      if (!u) return null;
      return (0, S.jsx)(b.Screen, {
        edges: ["top", "bottom"],
        children: (0, S.jsxs)(k, {
          children: [
            (0, S.jsx)(b.ScreenTitle, {
              eyebrow: "YOUR GARAGE",
              title: x ? "Edit vehicle" : "Add a vehicle",
              subtitle: "These details help your mechanic prepare.",
              right: (0, S.jsx)(b.IconButton, {
                icon: "close",
                label: "Close",
                onPress: () => e.goBack(),
              }),
            }),
            !!L && (0, S.jsx)(b.InfoBanner, { tone: "red", message: L }),
            (0, S.jsx)(b.Field, {
              label: "Make",
              icon: "car-sport-outline",
              value: p,
              onChangeText: f,
              placeholder: "Tesla, BMW, Toyota\u2026",
            }),
            (0, S.jsx)(b.Field, {
              label: "Model",
              icon: "car-outline",
              value: v,
              onChangeText: w,
              placeholder: "Model 3, 330i, Corolla\u2026",
            }),
            (0, S.jsx)(b.Field, {
              label: "Year",
              icon: "calendar-outline",
              value: T,
              onChangeText: B,
              keyboardType: "number-pad",
            }),
            (0, S.jsx)(b.Field, {
              label: "License plate",
              icon: "reader-outline",
              value: P,
              onChangeText: I,
              autoCapitalize: "characters",
            }),
            (0, S.jsx)(b.Field, {
              label: "VIN",
              icon: "barcode-outline",
              value: z,
              onChangeText: A,
              autoCapitalize: "characters",
            }),
            (0, S.jsx)(b.Field, {
              label: "Mileage (km)",
              icon: "speedometer-outline",
              value: D,
              onChangeText: E,
              keyboardType: "number-pad",
            }),
            (0, S.jsx)(h.default, {
              style: C.inputLabel,
              children: "Fuel type",
            }),
            (0, S.jsx)(b.SegmentedControl, {
              value: N,
              onChange: F,
              options: ["Petrol", "Diesel", "Hybrid", "Electric"].map((e) => ({
                value: e,
                label: e,
              })),
            }),
            (0, S.jsx)(b.Field, {
              label: "Color",
              icon: "color-palette-outline",
              value: R,
              onChangeText: W,
            }),
            (0, S.jsx)(b.Button, {
              label: x ? "Save vehicle" : "Add vehicle",
              onPress: async () => {
                p.trim() && v.trim() && Number(T) >= 1900
                  ? (H(!0),
                    await s(u.id, {
                      id: x?.id ?? (0, y.makeId)("car"),
                      make: p.trim(),
                      model: v.trim(),
                      year: Number(T),
                      plate: P.trim(),
                      vin: z.trim(),
                      mileage: Number(D) || 0,
                      fuel: N,
                      color: R.trim(),
                    }),
                    H(!1),
                    e.goBack())
                  : U("Enter a valid make, model, and year.");
              },
              icon: "checkmark",
              size: "large",
              full: !0,
              loading: M,
            }),
            x &&
              (0, S.jsx)(b.Button, {
                label: "Remove vehicle",
                variant: "danger",
                icon: "trash-outline",
                full: !0,
                style: { marginTop: 10 },
                onPress: () =>
                  o.default.alert(
                    "Remove this vehicle?",
                    "Existing bookings keep their vehicle label.",
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Remove",
                        style: "destructive",
                        onPress: () => {
                          c(u.id, x.id).then(() => e.goBack());
                        },
                      },
                    ],
                  ),
              }),
          ],
        }),
      });
    }),
    (_e.ReviewFormScreen = function ({ navigation: e, route: o }) {
      const { state: n, addReview: l } = (0, j.useStore)(),
        s = n.appointments.find((e) => e.id === o.params.appointmentId),
        [c, u] = (0, t.useState)(5),
        [x, p] = (0, t.useState)(""),
        [f, v] = (0, t.useState)(!1),
        [w, T] = (0, t.useState)("");
      return s && n.session
        ? (0, S.jsx)(b.Screen, {
            edges: ["top", "bottom"],
            children: (0, S.jsxs)(k, {
              children: [
                (0, S.jsx)(b.ScreenTitle, {
                  eyebrow: "YOUR EXPERIENCE",
                  title: "Leave a review",
                  subtitle: `${s.serviceName} \xb7 ${(0, y.formatLongDate)(s.date)}`,
                  right: (0, S.jsx)(b.IconButton, {
                    icon: "close",
                    label: "Close",
                    onPress: () => e.goBack(),
                  }),
                }),
                (0, S.jsxs)(b.Card, {
                  style: { alignItems: "center", marginBottom: 18 },
                  children: [
                    (0, S.jsx)(h.default, {
                      style: C.reviewPrompt,
                      children: "How was your appointment?",
                    }),
                    (0, S.jsx)(b.StarInput, { value: c, onChange: u }),
                    (0, S.jsx)(h.default, {
                      style: C.reviewRatingLabel,
                      children: [
                        "",
                        "Poor",
                        "Fair",
                        "Good",
                        "Very good",
                        "Excellent",
                      ][c],
                    }),
                  ],
                }),
                (0, S.jsx)(b.Field, {
                  label: "Your experience",
                  icon: "chatbox-outline",
                  value: x,
                  onChangeText: p,
                  multiline: !0,
                  placeholder:
                    "What did the mechanic do well? What should other drivers know?",
                  error: w,
                }),
                (0, S.jsx)(b.Button, {
                  label: "Submit review",
                  icon: "star",
                  size: "large",
                  full: !0,
                  loading: f,
                  onPress: async () => {
                    x.trim().length < 10
                      ? T("Please write at least 10 characters.")
                      : (v(!0),
                        await l({
                          mechanicId: s.mechanicId,
                          clientId: s.clientId,
                          clientName: n.session.name,
                          appointmentId: s.id,
                          rating: c,
                          comment: x.trim(),
                          serviceName: s.serviceName,
                        }),
                        v(!1),
                        e.goBack());
                  },
                }),
              ],
            }),
          })
        : null;
    }),
    (_e.ChangePasswordScreen = function ({ navigation: e }) {
      const { changePassword: n, backendMode: l } = (0, j.useStore)(),
        [s, c] = (0, t.useState)(""),
        [u, h] = (0, t.useState)(""),
        [x, p] = (0, t.useState)(""),
        [f, v] = (0, t.useState)(!1),
        [C, w] = (0, t.useState)("");
      return (0, S.jsx)(b.Screen, {
        edges: ["top", "bottom"],
        children: (0, S.jsxs)(k, {
          children: [
            (0, S.jsx)(b.ScreenTitle, {
              eyebrow: "SECURITY",
              title: "Change password",
              subtitle: "Choose a new password for your account.",
              right: (0, S.jsx)(b.IconButton, {
                icon: "close",
                label: "Close",
                onPress: () => e.goBack(),
              }),
            }),
            "supabase" === l &&
              (0, S.jsx)(b.InfoBanner, {
                tone: "blue",
                message:
                  "Supabase verifies your signed-in session before updating the password. Your current password field is kept for a consistent flow.",
              }),
            (0, S.jsx)(b.Field, {
              label: "Current password",
              icon: "lock-closed-outline",
              value: s,
              onChangeText: c,
              secureTextEntry: !0,
              autoCapitalize: "none",
            }),
            (0, S.jsx)(b.Field, {
              label: "New password",
              icon: "lock-open-outline",
              value: u,
              onChangeText: h,
              secureTextEntry: !0,
              autoCapitalize: "none",
              error: C,
            }),
            (0, S.jsx)(b.Field, {
              label: "Confirm new password",
              icon: "lock-open-outline",
              value: x,
              onChangeText: p,
              secureTextEntry: !0,
              autoCapitalize: "none",
            }),
            (0, S.jsx)(b.Button, {
              label: "Update password",
              onPress: async () => {
                if (!(0, y.isStrongEnoughPassword)(u))
                  return void w(
                    "Use at least 6 characters for the new password.",
                  );
                if (u !== x) return void w("New passwords do not match.");
                (v(!0), w(""));
                const t = await n(s, u);
                (v(!1),
                  t.error
                    ? w(t.error)
                    : o.default.alert(
                        "Password updated",
                        "Use your new password the next time you sign in.",
                        [{ text: "Done", onPress: () => e.goBack() }],
                      ));
              },
              icon: "checkmark",
              size: "large",
              full: !0,
              loading: f,
            }),
          ],
        }),
      });
    }));
  var t = r(d[0]),
    o = e(r(d[1])),
    n = e(r(d[2])),
    l = e(r(d[3]));
  r(d[4]);
  var s = e(r(d[5])),
    c = e(r(d[6])),
    u = e(r(d[7])),
    h = e(r(d[8])),
    x = e(r(d[9])),
    p = e(r(d[10])),
    f = r(d[11]),
    b = r(d[12]),
    v = r(d[13]),
    y = r(d[14]),
    j = r(d[15]),
    S = r(d[16]);
  const k = ({ children: e }) =>
    (0, S.jsx)(n.default, {
      style: { flex: 1 },
      behavior: void 0,
      children: (0, S.jsx)(c.default, {
        contentContainerStyle: C.formScroll,
        keyboardShouldPersistTaps: "handled",
        children: e,
      }),
    });
  const C = u.default.create({
    formScroll: {
      padding: 20,
      paddingBottom: 60,
      width: "100%",
      maxWidth: 760,
      alignSelf: "center",
    },
    inputLabel: {
      color: v.colors.inkSoft,
      fontSize: 12,
      fontWeight: "700",
      marginBottom: 8,
    },
    choiceWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 18,
    },
    choiceChip: {
      borderRadius: 99,
      borderWidth: 1,
      borderColor: v.colors.line,
      backgroundColor: v.colors.white,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    choiceChipActive: {
      backgroundColor: v.colors.ink,
      borderColor: v.colors.ink,
    },
    choiceText: { color: v.colors.muted, fontSize: 11, fontWeight: "600" },
    choiceTextActive: { color: v.colors.lime },
    detailHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    mechanicDetailHero: { alignItems: "center", paddingVertical: 24 },
    detailName: {
      color: v.colors.text,
      fontSize: 24,
      fontWeight: "800",
      letterSpacing: -0.5,
      marginTop: 14,
      textAlign: "center",
    },
    detailSpecialty: {
      color: v.colors.muted,
      fontSize: 13,
      marginTop: 5,
      textAlign: "center",
    },
    ratingLine: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      marginTop: 9,
    },
    ratingText: { color: v.colors.text, fontSize: 12, fontWeight: "700" },
    detailBio: {
      color: v.colors.muted,
      fontSize: 13,
      lineHeight: 20,
      textAlign: "center",
      marginTop: 15,
    },
    contactButtons: { flexDirection: "row", gap: 9, marginTop: 16 },
    addressCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginTop: 12,
    },
    addressTitle: { color: v.colors.text, fontSize: 13, fontWeight: "800" },
    addressText: { color: v.colors.muted, fontSize: 12, marginTop: 4 },
    adminControl: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginTop: 12,
      backgroundColor: v.colors.softOrange,
    },
    adminControlTitle: {
      color: v.colors.text,
      fontSize: 13,
      fontWeight: "800",
    },
    adminControlText: { color: v.colors.muted, fontSize: 11, marginTop: 4 },
    serviceRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 9,
    },
    serviceIcon: {
      width: 42,
      height: 42,
      borderRadius: 13,
      backgroundColor: v.colors.softGreen,
      alignItems: "center",
      justifyContent: "center",
    },
    serviceTitle: { color: v.colors.text, fontSize: 14, fontWeight: "800" },
    serviceDuration: { color: v.colors.muted, fontSize: 11, marginTop: 4 },
    servicePrice: { color: v.colors.text, fontSize: 16, fontWeight: "800" },
    reviewCard: { marginBottom: 10 },
    reviewTop: { flexDirection: "row", alignItems: "center", gap: 10 },
    reviewName: { color: v.colors.text, fontSize: 13, fontWeight: "800" },
    reviewMeta: { color: v.colors.muted, fontSize: 10, marginTop: 4 },
    reviewComment: {
      color: v.colors.muted,
      fontSize: 13,
      lineHeight: 20,
      marginTop: 13,
    },
    selectionRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      borderWidth: 1,
      borderColor: v.colors.line,
      borderRadius: 15,
      backgroundColor: v.colors.white,
      padding: 14,
      marginBottom: 9,
    },
    selectionRowActive: {
      borderColor: v.colors.limeDark,
      backgroundColor: v.colors.softGreen,
    },
    selectionTitle: { color: v.colors.text, fontSize: 13, fontWeight: "800" },
    selectionMeta: { color: v.colors.muted, fontSize: 11, marginTop: 4 },
    selectionPrice: { color: v.colors.text, fontSize: 15, fontWeight: "800" },
    bookingDates: { gap: 8, paddingBottom: 16 },
    bookingDate: {
      width: 68,
      paddingVertical: 12,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: v.colors.line,
      backgroundColor: v.colors.white,
      alignItems: "center",
    },
    bookingDateActive: {
      backgroundColor: v.colors.ink,
      borderColor: v.colors.ink,
    },
    bookingDateText: { color: v.colors.muted, fontSize: 11 },
    bookingDateNumber: {
      color: v.colors.text,
      fontSize: 22,
      fontWeight: "800",
      marginTop: 4,
    },
    timeGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 9,
      marginBottom: 18,
    },
    timeSlot: {
      minWidth: 78,
      flex: 1,
      paddingVertical: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: v.colors.line,
      backgroundColor: v.colors.white,
      alignItems: "center",
    },
    timeSlotActive: {
      backgroundColor: v.colors.ink,
      borderColor: v.colors.ink,
    },
    timeSlotText: { color: v.colors.text, fontSize: 13, fontWeight: "700" },
    summaryCard: { marginBottom: 16, backgroundColor: v.colors.ink },
    summaryTitle: { color: v.colors.white, fontSize: 14, fontWeight: "800" },
    summaryText: { color: "#B7C2BA", fontSize: 12, marginTop: 7 },
    summaryPrice: {
      color: v.colors.lime,
      fontSize: 24,
      fontWeight: "800",
      marginTop: 10,
    },
    reviewPrompt: {
      color: v.colors.text,
      fontSize: 16,
      fontWeight: "800",
      marginTop: 6,
    },
    reviewRatingLabel: { color: v.colors.muted, fontSize: 12, marginBottom: 6 },
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
