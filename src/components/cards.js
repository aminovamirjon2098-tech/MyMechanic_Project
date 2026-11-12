/* My Mechanic — components/cards.js. Restored from the production build of the existing app. */
/* eslint-disable */
const __RN = require("react-native");
const __rn = (name) => ({ __esModule: true, default: __RN[name] });
const __deps = [
  require("react"),
  __rn("StyleSheet"),
  require("../i18n/TranslatedText"),
  __rn("View"),
  require("@expo/vector-icons/Ionicons"),
  require("../theme"),
  require("../utils/helpers"),
  require("./ui"),
  require("react/jsx-runtime"),
];
(function (g, r, i, a, m, _e, d) {
  "use strict";
  function e(e) {
    return e && e.__esModule ? e : { default: e };
  }
  (Object.defineProperty(_e, "__esModule", { value: !0 }),
    (_e.MechanicCard = function ({
      mechanic: e,
      reviews: t,
      onPress: p,
      client: h,
    }) {
      const j = t.filter((t) => t.mechanicId === e.id),
        y =
          h && e.latitude && h.latitude
            ? (0, c.distanceKm)(
                h.latitude,
                h.longitude,
                e.latitude,
                e.longitude,
              )
            : null,
        b = Array.isArray(e.services) ? e.services.length : 0;
      return (0, u.jsxs)(f.Card, {
        onPress: p,
        style: x.mechanicCard,
        children: [
          (0, u.jsxs)(n.default, {
            style: x.mechanicTop,
            children: [
              (0, u.jsx)(f.Avatar, { name: e.name, color: e.color, size: 56 }),
              (0, u.jsxs)(n.default, {
                style: { flex: 1 },
                children: [
                  (0, u.jsxs)(n.default, {
                    style: x.nameLine,
                    children: [
                      (0, u.jsx)(o.default, {
                        style: x.mechanicName,
                        numberOfLines: 1,
                        children: e.name,
                      }),
                      e.isActive &&
                        (0, u.jsx)(n.default, { style: x.onlineDot }),
                    ],
                  }),
                  (0, u.jsx)(o.default, {
                    style: x.specialty,
                    children: e.specialization,
                  }),
                  (0, u.jsx)(f.Rating, {
                    value: (0, c.averageRating)(e.id, t),
                    count: j.length,
                  }),
                ],
              }),
              (0, u.jsx)(l.default, {
                name: "chevron-forward",
                size: 19,
                color: s.colors.faint,
              }),
            ],
          }),
          (0, u.jsx)(o.default, {
            style: x.bio,
            numberOfLines: 2,
            children: e.bio,
          }),
          (0, u.jsxs)(n.default, {
            style: x.mechanicMeta,
            children: [
              (0, u.jsxs)(n.default, {
                style: x.metaItem,
                children: [
                  (0, u.jsx)(l.default, {
                    name: "briefcase-outline",
                    size: 14,
                    color: s.colors.muted,
                  }),
                  (0, u.jsxs)(o.default, {
                    style: x.metaText,
                    children: [e.experienceYears, " yrs experience"],
                  }),
                ],
              }),
              null !== y &&
                (0, u.jsxs)(n.default, {
                  style: x.metaItem,
                  children: [
                    (0, u.jsx)(l.default, {
                      name: "navigate-outline",
                      size: 14,
                      color: s.colors.muted,
                    }),
                    (0, u.jsxs)(o.default, {
                      style: x.metaText,
                      children: [y.toFixed(1), " km away"],
                    }),
                  ],
                }),
            ],
          }),
          (0, u.jsxs)(n.default, {
            style: x.mechanicBottom,
            children: [
              (0, u.jsx)(f.Badge, {
                label: e.isActive
                  ? "Available for bookings"
                  : "Not accepting bookings",
                tone: e.isActive ? "green" : "neutral",
              }),
              (0, u.jsx)(o.default, {
                style: x.fromPrice,
                children: b
                  ? 1 === b
                    ? "1 service"
                    : `${b} services`
                  : "Services coming soon",
              }),
            ],
          }),
        ],
      });
    }),
    (_e.AppointmentCard = function ({
      appointment: e,
      viewerRole: t,
      clientName: p,
      mechanicName: h,
      actions: j,
    }) {
      const y = "mechanic" === t ? p : h;
      return (0, u.jsxs)(f.Card, {
        style: x.appointmentCard,
        children: [
          (0, u.jsxs)(n.default, {
            style: x.appointmentTop,
            children: [
              (0, u.jsxs)(n.default, {
                style: [
                  x.dateBox,
                  "pending" === e.status && {
                    backgroundColor: s.colors.softOrange,
                  },
                ],
                children: [
                  (0, u.jsx)(l.default, {
                    name: "calendar-outline",
                    size: 20,
                    color:
                      "pending" === e.status ? s.colors.orange : s.colors.ink,
                  }),
                  (0, u.jsx)(o.default, {
                    style: x.dateText,
                    children: (0, c.formatDate)(e.date, {
                      month: "short",
                      day: "numeric",
                    }),
                  }),
                ],
              }),
              (0, u.jsxs)(n.default, {
                style: { flex: 1 },
                children: [
                  (0, u.jsx)(o.default, {
                    style: x.serviceName,
                    children: e.serviceName,
                  }),
                  (0, u.jsx)(o.default, {
                    style: x.personName,
                    children: "admin" === t ? `${p} \u2192 ${h}` : y,
                  }),
                ],
              }),
              (0, u.jsx)(f.Badge, {
                label: e.status[0].toUpperCase() + e.status.slice(1),
                tone: (0, c.appointmentTone)(e.status),
              }),
            ],
          }),
          (0, u.jsxs)(n.default, {
            style: x.appointmentDetails,
            children: [
              (0, u.jsxs)(n.default, {
                style: x.metaItem,
                children: [
                  (0, u.jsx)(l.default, {
                    name: "time-outline",
                    size: 15,
                    color: s.colors.muted,
                  }),
                  (0, u.jsxs)(o.default, {
                    style: x.metaText,
                    children: [e.time, " \xb7 ", e.duration, " min"],
                  }),
                ],
              }),
              (0, u.jsxs)(n.default, {
                style: x.metaItem,
                children: [
                  (0, u.jsx)(l.default, {
                    name: "car-sport-outline",
                    size: 15,
                    color: s.colors.muted,
                  }),
                  (0, u.jsx)(o.default, {
                    style: x.metaText,
                    numberOfLines: 1,
                    children: e.carLabel || "Vehicle not specified",
                  }),
                ],
              }),
            ],
          }),
          !!e.note &&
            (0, u.jsxs)(o.default, {
              style: x.note,
              numberOfLines: 3,
              children: ["\u201c", e.note, "\u201d"],
            }),
          j && (0, u.jsx)(n.default, { style: x.actions, children: j }),
        ],
      });
    }),
    (_e.CarCard = function ({ car: e, onPress: t }) {
      return (0, u.jsxs)(f.Card, {
        onPress: t,
        style: x.carCard,
        children: [
          (0, u.jsx)(n.default, {
            style: x.carIcon,
            children: (0, u.jsx)(l.default, {
              name: "car-sport",
              size: 24,
              color: s.colors.ink,
            }),
          }),
          (0, u.jsxs)(n.default, {
            style: { flex: 1 },
            children: [
              (0, u.jsxs)(o.default, {
                style: x.carName,
                children: [e.year, " ", e.make, " ", e.model],
              }),
              (0, u.jsxs)(o.default, {
                style: x.carMeta,
                children: [e.color, " \xb7 ", e.fuel],
              }),
              (0, u.jsxs)(o.default, {
                style: x.carSub,
                children: [
                  e.plate || "No plate",
                  " \xb7 ",
                  e.mileage.toLocaleString(),
                  " km",
                ],
              }),
            ],
          }),
          t &&
            (0, u.jsx)(l.default, {
              name: "chevron-forward",
              size: 18,
              color: s.colors.faint,
            }),
        ],
      });
    }),
    r(d[0]));
  var t = e(r(d[1])),
    o = e(r(d[2])),
    n = e(r(d[3])),
    l = e(r(d[4])),
    s = r(d[5]),
    c = r(d[6]),
    f = r(d[7]),
    u = r(d[8]);
  const x = t.default.create({
    mechanicCard: { marginBottom: 12 },
    mechanicTop: { flexDirection: "row", alignItems: "center", gap: 13 },
    nameLine: { flexDirection: "row", alignItems: "center", gap: 7 },
    onlineDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: "#6EA83B",
    },
    mechanicName: {
      fontSize: 18,
      fontWeight: "800",
      color: s.colors.text,
      flexShrink: 1,
    },
    specialty: { color: s.colors.muted, fontSize: 13, marginVertical: 3 },
    bio: { color: s.colors.muted, fontSize: 13, lineHeight: 19, marginTop: 14 },
    mechanicMeta: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 16,
      marginTop: 12,
    },
    metaItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      flexShrink: 1,
    },
    metaText: { color: s.colors.muted, fontSize: 12, flexShrink: 1 },
    mechanicBottom: {
      borderTopWidth: 1,
      borderTopColor: s.colors.line,
      paddingTop: 12,
      marginTop: 14,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
    },
    fromPrice: { color: s.colors.text, fontWeight: "800", fontSize: 13 },
    appointmentCard: { marginBottom: 12 },
    appointmentTop: { flexDirection: "row", alignItems: "center", gap: 11 },
    dateBox: {
      width: 66,
      minHeight: 62,
      borderRadius: 14,
      backgroundColor: s.colors.softGreen,
      alignItems: "center",
      justifyContent: "center",
      padding: 5,
    },
    dateText: {
      fontSize: 11,
      color: s.colors.text,
      fontWeight: "700",
      marginTop: 3,
      textAlign: "center",
    },
    serviceName: {
      fontSize: 15,
      fontWeight: "800",
      color: s.colors.text,
      lineHeight: 20,
    },
    personName: { fontSize: 12, color: s.colors.muted, marginTop: 4 },
    appointmentDetails: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      gap: 13,
      marginTop: 15,
    },
    price: {
      marginLeft: "auto",
      color: s.colors.text,
      fontWeight: "800",
      fontSize: 15,
    },
    note: {
      fontSize: 12,
      lineHeight: 18,
      color: s.colors.muted,
      fontStyle: "italic",
      backgroundColor: s.colors.canvas,
      borderRadius: 10,
      padding: 10,
      marginTop: 12,
    },
    actions: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 14,
      borderTopWidth: 1,
      borderTopColor: s.colors.line,
      paddingTop: 13,
    },
    carCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
      marginBottom: 10,
    },
    carIcon: {
      width: 48,
      height: 48,
      borderRadius: 15,
      backgroundColor: s.colors.softGreen,
      alignItems: "center",
      justifyContent: "center",
    },
    carName: { fontSize: 15, fontWeight: "800", color: s.colors.text },
    carMeta: { fontSize: 12, color: s.colors.muted, marginTop: 4 },
    carSub: { fontSize: 11, color: s.colors.faint, marginTop: 3 },
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
