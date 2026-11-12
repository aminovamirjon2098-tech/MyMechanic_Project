/* My Mechanic — map/LiveMap.js. Restored from the production build of the existing app. */
/* eslint-disable */
const __RN = require("react-native");
const __rn = (name) => ({ __esModule: true, default: __RN[name] });
const __deps = [
  require("react"),
  __rn("FlatList"),
  __rn("Linking"),
  __rn("Pressable"),
  __rn("RefreshControl"),
  __rn("StyleSheet"),
  __rn("Switch"),
  require("../i18n/TranslatedText"),
  __rn("useWindowDimensions"),
  __rn("View"),
  require("@expo/vector-icons/Ionicons"),
  {}, // expo-location removed: locations are fixed (manual coordinates), no GPS
  require("./YandexMapView"),
  require("../components/ui"),
  require("../theme"),
  require("../utils/helpers"),
  require("../store/StoreContext"),
  require("react/jsx-runtime"),
];
(function (g, r, i, _a, m, _e, _d) {
  "use strict";
  function e(e) {
    return e && e.__esModule ? e : { default: e };
  }
  (Object.defineProperty(_e, "__esModule", { value: !0 }),
    Object.defineProperty(_e, "default", {
      enumerable: !0,
      get: function () {
        return v;
      },
    }));
  var t = r(_d[0]),
    o = e(r(_d[1])),
    a = e(r(_d[2])),
    n = e(r(_d[3])),
    l = e(r(_d[4])),
    s = e(r(_d[5])),
    c = e(r(_d[6])),
    d = e(r(_d[7])),
    u = e(r(_d[8])),
    f = e(r(_d[9])),
    h = e(r(_d[10])),
    p = (function (e) {
      if (e && e.__esModule) return e;
      var t = {};
      return (
        e &&
          Object.keys(e).forEach(function (o) {
            var a = Object.getOwnPropertyDescriptor(e, o);
            Object.defineProperty(
              t,
              o,
              a.get
                ? a
                : {
                    enumerable: !0,
                    get: function () {
                      return e[o];
                    },
                  },
            );
          }),
        (t.default = e),
        t
      );
    })(r(_d[11])),
    x = e(r(_d[12])),
    y = r(_d[13]),
    j = r(_d[14]),
    S = r(_d[15]),
    b = r(_d[16]),
    C = r(_d[17]);
  function v({ navigation: e }) {
    const {
        state: s,
        backendMode: v,
        realtimeStatus: I,
        backendError: k,
        yandexApiKey: D,
        setLiveLocation: T,
        setLocationSharing: L,
      } = (0, b.useStore)(),
      z = s.session,
      P = (0, t.useMemo)(
        () =>
          [...s.mechanics]
            .filter((e) => "active" === e.status && e.isActive !== false)
            .sort((e, t) => e.name.localeCompare(t.name)),
        [s.mechanics],
      ),
      [A, B] = (0, t.useState)(
        "client" === z?.role || "mechanic" === z?.role
          ? z.userId
          : P[0]?.id || "",
      ),
      [R, E] = (0, t.useState)("all"),
      [W, M] = (0, t.useState)(!1),
      [N, O] = (0, t.useState)(0),
      [F, V] = (0, t.useState)(!1),
      [H, Y] = (0, t.useState)(""),
      [$, U] = (0, t.useState)(""),
      [_, G] = (0, t.useState)(""),
      [q, K] = (0, t.useState)(!1),
      [X, J] = (0, t.useState)(!1),
      Q = (0, t.useRef)(null),
      { width: Z } = (0, u.default)(),
      ee = (0, y.useRefresh)();
    // Manual coordinate entry (administrators, or your own marker).
    const [__latIn, __setLatIn] = (0, t.useState)(""),
      [__lngIn, __setLngIn] = (0, t.useState)("");
    ((0, t.useEffect)(() => {
      P.some((e) => e.id === A) ||
        B("admin" === z?.role ? P[0]?.id || "" : z?.userId || "");
    }, [P, A, z]),
      (0, t.useEffect)(
        () => () => {
          Q.current?.remove();
        },
        [],
      ));
    (0, t.useEffect)(() => {
      const __loc = s.liveLocations.find((e) => e.profileId === A),
        __person = P.find((e) => e.id === A),
        __src = __loc || (__person && (__person.latitude != null || __person.longitude != null) ? __person : null);
      (__setLatIn(__src ? Number(__src.latitude).toFixed(5) : ""),
        __setLngIn(__src ? Number(__src.longitude).toFixed(5) : ""));
    }, [A]);
    const te = P.find((e) => e.id === A),
      oe = s.liveLocations.find((e) => e.profileId === A),
      re = (0, t.useMemo)(
        () =>
          s.liveLocations
            .filter((e) => e.isSharing && ("all" === R || e.role === R))
            .sort(
              (e, t) =>
                new Date(t.updatedAt).getTime() -
                new Date(e.updatedAt).getTime(),
            ),
        [s.liveLocations, R],
      ),
      ae = !!z && z.userId === A,
      ne = 0,
      le = s.liveLocations.filter(
        (e) => e.isSharing && "mechanic" === e.role,
      ).length,
      ie = async (e, t, o = 0, a = 0) => {
        if (!te) return { error: "Select a mechanic first." };
        if (te.role !== "mechanic") return { error: "Only mechanic locations are supported." };
        (K(!0), G(""), U(""));
        const n = await T({
          profileId: te.id,
          role: te.role,
          name: te.name,
          phone: te.phone,
          latitude: e,
          longitude: t,
          heading: o,
          speed: a,
          isSharing: !0,
          updatedAt: new Date().toISOString(),
        });
        return (
          K(!1),
          n.error
            ? G(n.error)
            : (U(`${te.name}\u2019s fixed location has been saved.`), M(!1)),
          n
        );
      },
      se = () => {
        (Q.current?.remove(), (Q.current = null));
      },
      me = (e) => {
        const t = `https://yandex.com/maps/?ll=${e.longitude}%2C${e.latitude}&z=16&pt=${e.longitude},${e.latitude},pm2rdl`;
        a.default.openURL(t);
      },
      fe = (0, C.jsxs)(C.Fragment, {
        children: [
          (0, C.jsx)(y.ScreenTitle, {
            eyebrow: "WORKSHOP LOCATIONS",
            title: "Mechanic locations",
            subtitle: "Yandex Maps \xb7 fixed workshop pins, updated manually.",
            right: (0, C.jsx)(y.IconButton, {
              icon: "scan-outline",
              label: "Fit all markers",
              onPress: () => O((e) => e + 1),
            }),
          }),
          (k || _) &&
            (0, C.jsx)(y.InfoBanner, { tone: "red", message: _ || k }),
          !!$ &&
            (0, C.jsx)(y.InfoBanner, {
              tone: "green",
              icon: "checkmark-circle-outline",
              message: $,
            }),
          "local" === v &&
            (0, C.jsxs)(y.Card, {
              style: w.connectCard,
              children: [
                (0, C.jsx)(f.default, {
                  style: w.connectIcon,
                  children: (0, C.jsx)(h.default, {
                    name: "people-outline",
                    size: 22,
                    color: j.colors.ink,
                  }),
                }),
                (0, C.jsxs)(f.default, {
                  style: { flex: 1 },
                  children: [
                    (0, C.jsx)(d.default, {
                      style: w.connectTitle,
                      children: "Local demo is syncing open tabs",
                    }),
                    (0, C.jsx)(d.default, {
                      style: w.connectText,
                      children:
                        "Connect Supabase to show mechanic workshop locations consistently on every device.",
                    }),
                  ],
                }),
                (0, C.jsx)(y.Button, {
                  label: "Connect",
                  size: "small",
                  icon: "cloud-outline",
                  onPress: () => e.getParent()?.navigate("SupabaseSetup"),
                }),
              ],
            }),
          (0, C.jsxs)(f.default, {
            style: w.statRow,
            children: [
              (0, C.jsxs)(y.Card, {
                style: w.mapStat,
                children: [
                  (0, C.jsx)(f.default, {
                    style: [
                      w.mapStatIcon,
                      { backgroundColor: j.colors.softGreen },
                    ],
                    children: (0, C.jsx)(h.default, {
                      name: "car-sport",
                      size: 19,
                      color: j.colors.ink,
                    }),
                  }),
                  (0, C.jsxs)(f.default, {
                    children: [
                      (0, C.jsx)(d.default, {
                        style: w.mapStatValue,
                        children: "OFF",
                      }),
                      (0, C.jsx)(d.default, {
                        style: w.mapStatLabel,
                        children: "Driver tracking",
                      }),
                    ],
                  }),
                ],
              }),
              (0, C.jsxs)(y.Card, {
                style: w.mapStat,
                children: [
                  (0, C.jsx)(f.default, {
                    style: [
                      w.mapStatIcon,
                      { backgroundColor: j.colors.softBlue },
                    ],
                    children: (0, C.jsx)(h.default, {
                      name: "construct",
                      size: 19,
                      color: j.colors.ink,
                    }),
                  }),
                  (0, C.jsxs)(f.default, {
                    children: [
                      (0, C.jsx)(d.default, {
                        style: w.mapStatValue,
                        children: le,
                      }),
                      (0, C.jsx)(d.default, {
                        style: w.mapStatLabel,
                        children: "Pinned mechanics",
                      }),
                    ],
                  }),
                ],
              }),
              (0, C.jsxs)(y.Card, {
                style: w.mapStat,
                children: [
                  (0, C.jsx)(f.default, {
                    style: [
                      w.mapStatIcon,
                      { backgroundColor: j.colors.softOrange },
                    ],
                    children: (0, C.jsx)(h.default, {
                      name: "radio",
                      size: 19,
                      color: j.colors.ink,
                    }),
                  }),
                  (0, C.jsxs)(f.default, {
                    children: [
                      (0, C.jsx)(d.default, {
                        style: w.mapStatValue,
                        children:
                          "connected" === I
                            ? "LIVE"
                            : "local" === I
                              ? "LOCAL"
                              : "SYNC",
                      }),
                      (0, C.jsx)(d.default, {
                        style: w.mapStatLabel,
                        children:
                          "supabase" === v
                            ? "Supabase channel"
                            : "Browser channel",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, C.jsx)(y.SegmentedControl, {
            value: R,
            onChange: E,
            options: [
              { value: "all", label: "All mechanics", count: le },
              { value: "mechanic", label: "Mechanics", count: le },
            ],
          }),
          (0, C.jsxs)(y.Card, {
            style: w.mapCard,
            children: [
              (0, C.jsxs)(f.default, {
                style: [w.mapWrap, { height: Z > 800 ? 550 : 430 }],
                children: [
                  (0, C.jsx)(x.default, {
                    locations: re,
                    apiKey: D,
                    selectedId: A,
                    placing: W,
                    fitSignal: N,
                    onSelect: (e) => {
                      (B(e), M(!1));
                    },
                    onMapPress: (e, t) => {
                      ie(e, t, oe?.heading ?? 0, 0);
                    },
                    onReady: () => {
                      (V(!0), Y(""));
                    },
                    onError: Y,
                  }),
                  !F &&
                    !H &&
                    (0, C.jsxs)(f.default, {
                      style: w.mapLoading,
                      children: [
                        (0, C.jsx)(h.default, {
                          name: "map-outline",
                          size: 24,
                          color: j.colors.ink,
                        }),
                        (0, C.jsx)(d.default, {
                          style: w.mapLoadingText,
                          children: "Loading live Yandex map\u2026",
                        }),
                      ],
                    }),
                ],
              }),
              (0, C.jsxs)(f.default, {
                style: w.mapFooter,
                children: [
                  (0, C.jsxs)(f.default, {
                    style: w.mapFooterStatus,
                    children: [
                      (0, C.jsx)(f.default, {
                        style: [
                          w.liveDot,
                          {
                            backgroundColor:
                              "error" === I ? j.colors.red : j.colors.limeDark,
                          },
                        ],
                      }),
                      (0, C.jsxs)(d.default, {
                        style: w.mapFooterText,
                        children: [
                          re.length,
                          " visible markers \xb7 tap a marker for details",
                        ],
                      }),
                    ],
                  }),
                  (0, C.jsx)(y.Badge, {
                    label: W ? "TAP MAP TO PLACE" : "YANDEX MAPS",
                    tone: W ? "orange" : "neutral",
                  }),
                ],
              }),
            ],
          }),
          !!H &&
            (0, C.jsx)(y.InfoBanner, {
              tone: "orange",
              icon: "map-outline",
              message: `${H} Live profiles remain available below.`,
            }),
          (0, C.jsx)(d.default, {
            style: w.selectorTitle,
            children: "Choose a mechanic",
          }),
          (0, C.jsx)(o.default, {
            horizontal: !0,
            data: P.filter((e) => "all" === R || e.role === R),
            keyExtractor: (e) => e.id,
            showsHorizontalScrollIndicator: !1,
            contentContainerStyle: w.profileSelector,
            renderItem: ({ item: e }) => {
              const t = e.id === A,
                o = s.liveLocations.some(
                  (t) => t.profileId === e.id && t.isSharing,
                );
              return (0, C.jsxs)(n.default, {
                onPress: () => {
                  (se(), J(!1), B(e.id), M(!1), U(""), G(""));
                },
                style: [w.profileChip, t && w.profileChipSelected],
                children: [
                  (0, C.jsx)(y.Avatar, {
                    name: e.name,
                    color: e.color,
                    size: 34,
                  }),
                  (0, C.jsxs)(f.default, {
                    children: [
                      (0, C.jsx)(d.default, {
                        style: [
                          w.profileChipName,
                          t && { color: j.colors.white },
                        ],
                        children: e.name,
                      }),
                      (0, C.jsxs)(d.default, {
                        style: [w.profileChipRole, t && { color: "#B7C2BA" }],
                        children: [
                          "Mechanic",
                          " \xb7 ",
                          o ? "pinned" : "not set",
                        ],
                      }),
                    ],
                  }),
                ],
              });
            },
          }),
          te &&
            (0, C.jsxs)(y.Card, {
              style: w.editorCard,
              children: [
                (0, C.jsxs)(f.default, {
                  style: w.editorTop,
                  children: [
                    (0, C.jsx)(y.Avatar, {
                      name: te.name,
                      color: te.color,
                      size: 50,
                    }),
                    (0, C.jsxs)(f.default, {
                      style: { flex: 1 },
                      children: [
                        (0, C.jsx)(d.default, {
                          style: w.editorName,
                          children: te.name,
                        }),
                        (0, C.jsx)(d.default, {
                          style: w.editorPhone,
                          children: te.phone,
                        }),
                      ],
                    }),
                    (0, C.jsx)(y.Badge, {
                      label: "MECHANIC",
                      tone: "blue",
                    }),
                  ],
                }),
                (0, C.jsxs)(f.default, {
                  style: w.editorDetails,
                  children: [
                    (0, C.jsxs)(f.default, {
                      style: w.editorDetail,
                      children: [
                        (0, C.jsx)(d.default, {
                          style: w.editorDetailLabel,
                          children: "LAST UPDATE",
                        }),
                        (0, C.jsx)(d.default, {
                          style: w.editorDetailValue,
                          children: oe
                            ? (0, S.formatTimeAgo)(oe.updatedAt)
                            : "Not shared yet",
                        }),
                      ],
                    }),
                    (0, C.jsxs)(f.default, {
                      style: w.editorDetail,
                      children: [
                        (0, C.jsx)(d.default, {
                          style: w.editorDetailLabel,
                          children: "COORDINATES",
                        }),
                        (0, C.jsx)(d.default, {
                          style: w.editorDetailValue,
                          children: oe
                            ? `${oe.latitude.toFixed(5)}, ${oe.longitude.toFixed(5)}`
                            : "Tap map to place",
                        }),
                      ],
                    }),
                  ],
                }),
                z?.role !== "client" &&
                  (ae || "admin" === z?.role) &&
                  (0, C.jsxs)(f.default, {
                    style: { marginTop: 14 },
                    children: [
                      (0, C.jsxs)(f.default, {
                        style: { flexDirection: "row", gap: 10 },
                        children: [
                          (0, C.jsx)(y.Field, {
                            label: "Latitude",
                            icon: "navigate-outline",
                            value: __latIn,
                            onChangeText: __setLatIn,
                            keyboardType: "numbers-and-punctuation",
                            placeholder: "41.31110",
                            containerStyle: { flex: 1, marginBottom: 10 },
                          }),
                          (0, C.jsx)(y.Field, {
                            label: "Longitude",
                            icon: "navigate-outline",
                            value: __lngIn,
                            onChangeText: __setLngIn,
                            keyboardType: "numbers-and-punctuation",
                            placeholder: "69.27970",
                            containerStyle: { flex: 1, marginBottom: 10 },
                          }),
                        ],
                      }),
                      (0, C.jsx)(y.Button, {
                        label: "Set coordinates",
                        icon: "pin-outline",
                        variant: "secondary",
                        size: "small",
                        loading: q,
                        onPress: () => {
                          const __la = Number(__latIn.trim().replace(",", ".")),
                            __lo = Number(__lngIn.trim().replace(",", "."));
                          if (
                            !__latIn.trim() ||
                            !__lngIn.trim() ||
                            !Number.isFinite(__la) ||
                            !Number.isFinite(__lo) ||
                            Math.abs(__la) > 90 ||
                            Math.abs(__lo) > 180
                          )
                            return void G(
                              "Enter valid coordinates: latitude −90…90, longitude −180…180.",
                            );
                          ie(__la, __lo, oe?.heading ?? 0, 0).then((e) => {
                            e && !e.error && O((e) => e + 1);
                          });
                        },
                      }),
                    ],
                  }),
                (0, C.jsxs)(f.default, {
                  style: w.editorActions,
                  children: [
                    (ae || "admin" === z?.role) &&
                      (0, C.jsx)(y.Button, {
                      label: W ? "Cancel placing" : "Place on map",
                      icon: W ? "close-outline" : "pin-outline",
                      variant: W ? "danger" : "primary",
                      size: "small",
                      loading: q,
                      onPress: () => {
                        (M((e) => !e),
                          U(
                            W ? "" : `Tap the Yandex map to place ${te.name}.`,
                          ));
                      },
                    }),
                    oe &&
                      (0, C.jsx)(y.Button, {
                        label: "Open in Yandex",
                        icon: "open-outline",
                        variant: "secondary",
                        size: "small",
                        onPress: () => me(oe),
                      }),

                  ],
                }),
                (0, C.jsx)(d.default, {
                  style: w.permissionNote,
                  children:
                    "admin" === z?.role
                      ? "Administrator mode: you can update fixed coordinates for any mechanic."
                      : ae
                        ? "Your workshop location is fixed. It changes only when you enter new coordinates or place it on the map."
                        : "Mechanic locations are fixed pins, not live GPS tracking.",
                }),
              ],
            }),
          (0, C.jsxs)(f.default, {
            style: w.listHeader,
            children: [
              (0, C.jsx)(d.default, {
                style: w.selectorTitle,
                children: "Workshop locations",
              }),
              (0, C.jsx)(d.default, {
                style: w.listHint,
                children: "Saved workshop locations",
              }),
            ],
          }),
        ],
      });
    return (0, C.jsx)(y.Screen, {
      edges: ["top"],
      children: (0, C.jsx)(o.default, {
        data: re,
        keyExtractor: (e) => e.profileId,
        ListHeaderComponent: fe,
        contentContainerStyle: w.content,
        refreshControl: (0, C.jsx)(l.default, {
          refreshing: ee.refreshing,
          onRefresh: ee.onRefresh,
          tintColor: j.colors.ink,
        }),
        showsVerticalScrollIndicator: !1,
        keyboardShouldPersistTaps: "handled",
        ListEmptyComponent: (0, C.jsx)(y.EmptyState, {
          icon: "location-outline",
          title: "No shared locations yet",
          message:
            "Select a mechanic above, choose Place on map, then tap the workshop position. The fixed pin will be saved.",
        }),
        renderItem: ({ item: e }) => {
          const t = (0, S.locationIsFresh)(e);
          return (0, C.jsxs)(y.Card, {
            onPress: () => {
              (B(e.profileId), O((e) => e + 1));
            },
            style: w.locationRow,
            children: [
              (0, C.jsx)(f.default, {
                style: [
                  w.locationRole,
                  {
                    backgroundColor:
                      j.colors.softBlue,
                  },
                ],
                children: (0, C.jsx)(h.default, {
                  name: "construct",
                  size: 21,
                  color: j.colors.ink,
                }),
              }),
              (0, C.jsxs)(f.default, {
                style: { flex: 1 },
                children: [
                  (0, C.jsxs)(f.default, {
                    style: w.locationNameRow,
                    children: [
                      (0, C.jsx)(d.default, {
                        style: w.locationName,
                        children: e.name,
                      }),
                      e.profileId === z?.userId &&
                        (0, C.jsx)(y.Badge, { label: "YOU", tone: "green" }),
                    ],
                  }),
                  (0, C.jsxs)(d.default, {
                    style: w.locationMeta,
                    children: [
                      "Mechanic",
                      " \xb7 ",
                      (0, S.formatTimeAgo)(e.updatedAt),
                      e.speed > 0.5
                        ? ` \xb7 ${(3.6 * e.speed).toFixed(0)} km/h`
                        : "",
                    ],
                  }),
                ],
              }),
              (0, C.jsxs)(f.default, {
                style: w.freshColumn,
                children: [
                  (0, C.jsx)(f.default, {
                    style: [
                      w.liveDot,
                      {
                        backgroundColor: t ? j.colors.limeDark : j.colors.faint,
                      },
                    ],
                  }),
                  (0, C.jsx)(d.default, {
                    style: w.freshText,
                    children: "Fixed pin",
                  }),
                ],
              }),
              (0, C.jsx)(h.default, {
                name: "chevron-forward",
                size: 17,
                color: j.colors.faint,
              }),
            ],
          });
        },
      }),
    });
  }
  const w = s.default.create({
    content: {
      padding: 20,
      paddingBottom: 120,
      maxWidth: 1080,
      width: "100%",
      alignSelf: "center",
    },
    connectCard: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 12,
      marginBottom: 16,
      backgroundColor: j.colors.softGreen,
    },
    connectIcon: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor: j.colors.white,
      alignItems: "center",
      justifyContent: "center",
    },
    connectTitle: { color: j.colors.text, fontSize: 13, fontWeight: "800" },
    connectText: {
      color: j.colors.muted,
      fontSize: 11,
      lineHeight: 17,
      marginTop: 4,
      maxWidth: 580,
    },
    statRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginBottom: 18,
    },
    mapStat: {
      flex: 1,
      minWidth: 150,
      padding: 13,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    mapStatIcon: {
      width: 38,
      height: 38,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    mapStatValue: { color: j.colors.text, fontSize: 19, fontWeight: "800" },
    mapStatLabel: { color: j.colors.muted, fontSize: 10, marginTop: 2 },
    mapCard: { padding: 0, overflow: "hidden", marginBottom: 14 },
    mapWrap: { backgroundColor: "#E9ECE6", position: "relative" },
    mapLoading: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: "#E9ECE6",
    },
    mapLoadingText: { color: j.colors.muted, fontSize: 12 },
    mapFooter: {
      padding: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
    },
    mapFooterStatus: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      flex: 1,
    },
    mapFooterText: { color: j.colors.muted, fontSize: 11, flexShrink: 1 },
    liveDot: { width: 7, height: 7, borderRadius: 4 },
    selectorTitle: {
      color: j.colors.text,
      fontSize: 17,
      fontWeight: "800",
      marginBottom: 11,
      marginTop: 6,
    },
    profileSelector: { gap: 9, paddingBottom: 16 },
    profileChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 9,
      backgroundColor: j.colors.white,
      borderWidth: 1,
      borderColor: j.colors.line,
      borderRadius: 15,
      padding: 9,
      paddingRight: 14,
      minWidth: 158,
    },
    profileChipSelected: {
      backgroundColor: j.colors.ink,
      borderColor: j.colors.ink,
    },
    profileChipName: { color: j.colors.text, fontSize: 12, fontWeight: "800" },
    profileChipRole: { color: j.colors.muted, fontSize: 9, marginTop: 3 },
    editorCard: { marginBottom: 20 },
    editorTop: { flexDirection: "row", alignItems: "center", gap: 11 },
    editorName: { color: j.colors.text, fontSize: 17, fontWeight: "800" },
    editorPhone: { color: j.colors.muted, fontSize: 12, marginTop: 3 },
    editorDetails: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 20,
      marginTop: 16,
      paddingVertical: 13,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: j.colors.line,
    },
    editorDetail: { flex: 1, minWidth: 170 },
    editorDetailLabel: {
      color: j.colors.faint,
      fontSize: 9,
      letterSpacing: 1,
      fontWeight: "800",
    },
    editorDetailValue: {
      color: j.colors.text,
      fontSize: 12,
      fontWeight: "700",
      marginTop: 5,
    },
    shareRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      marginTop: 15,
      backgroundColor: j.colors.softGreen,
      padding: 12,
      borderRadius: 13,
    },
    shareTitle: { color: j.colors.text, fontSize: 13, fontWeight: "800" },
    shareText: { color: j.colors.muted, fontSize: 10, marginTop: 3 },
    editorActions: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 15,
    },
    permissionNote: {
      color: j.colors.faint,
      fontSize: 10,
      lineHeight: 15,
      marginTop: 12,
    },
    listHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
    },
    listHint: { color: j.colors.faint, fontSize: 10, marginBottom: 10 },
    locationRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
      marginBottom: 9,
      padding: 13,
    },
    locationRole: {
      width: 42,
      height: 42,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
    },
    locationNameRow: { flexDirection: "row", alignItems: "center", gap: 7 },
    locationName: { color: j.colors.text, fontSize: 14, fontWeight: "800" },
    locationMeta: { color: j.colors.muted, fontSize: 11, marginTop: 4 },
    freshColumn: { alignItems: "center", gap: 4 },
    freshText: { color: j.colors.muted, fontSize: 9 },
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
