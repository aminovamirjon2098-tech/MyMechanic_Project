/* My Mechanic — navigation/RootNavigator.js. Restored from the production build of the existing app. */
/* eslint-disable */
const __RN = require("react-native");
const __rn = (name) => ({ __esModule: true, default: __RN[name] });
const { t: __t, useLanguage: __useLanguage } = require("../i18n/i18n");
const { AIAssistantScreen: __AIAssistantScreen } = require("../screens/AIAssistantScreen");
const { SettingsScreen: __SettingsScreen } = require("../screens/SettingsScreen");
const __deps = [
  require("react"),
  __rn("StyleSheet"),
  require("@react-navigation/native-stack"),
  require("@react-navigation/bottom-tabs"),
  require("@expo/vector-icons/Ionicons"),
  require("../screens/AuthScreens"),
  require("../screens/AdminScreens"),
  require("../screens/MechanicScreens"),
  require("../screens/ClientScreens"),
  require("../map/LiveMap"),
  require("../screens/ModalScreens"),
  require("../components/ui"),
  require("../theme"),
  require("../store/StoreContext"),
  require("react/jsx-runtime"),
];
(function (g, r, i, a, m, _e, d) {
  "use strict";
  function e(e) {
    return e && e.__esModule ? e : { default: e };
  }
  (Object.defineProperty(_e, "__esModule", { value: !0 }),
    (_e.RootNavigator = function () {
      __useLanguage();
      const { state: e, hydrated: n } = (0, v.useStore)();
      if (!n) return (0, b.jsx)(x.LoadingScreen, {});
      const o = e.session;
      return o
        ? (0, b.jsxs)(f.Navigator, {
            screenOptions: {
              headerShown: !1,
              contentStyle: { backgroundColor: j.colors.canvas },
            },
            children: [
              "admin" === o.role &&
                (0, b.jsx)(f.Screen, { name: "AdminMain", component: k }),
              "mechanic" === o.role &&
                (0, b.jsx)(f.Screen, { name: "MechanicMain", component: O }),
              "client" === o.role &&
                (0, b.jsx)(f.Screen, { name: "ClientMain", component: L }),
              (0, b.jsxs)(f.Group, {
                screenOptions: {
                  presentation: "modal",
                  animation: "slide_from_bottom",
                },
                children: [
                  (0, b.jsx)(f.Screen, {
                    name: "MechanicForm",
                    component: h.MechanicFormScreen,
                  }),
                  (0, b.jsx)(f.Screen, {
                    name: "MechanicDetail",
                    component: h.MechanicDetailScreen,
                  }),
                  (0, b.jsx)(f.Screen, {
                    name: "ClientDetail",
                    component: h.ClientDetailScreen,
                  }),
                  (0, b.jsx)(f.Screen, {
                    name: "Booking",
                    component: h.BookingScreen,
                  }),
                  (0, b.jsx)(f.Screen, {
                    name: "ClientProfileForm",
                    component: h.ClientProfileFormScreen,
                  }),
                  (0, b.jsx)(f.Screen, {
                    name: "CarForm",
                    component: h.CarFormScreen,
                  }),
                  (0, b.jsx)(f.Screen, {
                    name: "ReviewForm",
                    component: h.ReviewFormScreen,
                  }),
                  (0, b.jsx)(f.Screen, {
                    name: "ChangePassword",
                    component: h.ChangePasswordScreen,
                  }),
                  (0, b.jsx)(f.Screen, {
                    name: "Settings",
                    component: __SettingsScreen,
                  }),
                  (0, b.jsx)(f.Screen, {
                    name: "SupabaseSetup",
                    component: s.SupabaseSetupScreen,
                  }),
                ],
              }),
            ],
          })
        : (0, b.jsx)(C, {});
    }),
    r(d[0]));
  var n = e(r(d[1])),
    o = r(d[2]),
    t = r(d[3]),
    c = e(r(d[4])),
    s = r(d[5]),
    l = r(d[6]),
    p = r(d[7]),
    S = r(d[8]),
    u = e(r(d[9])),
    h = r(d[10]),
    x = r(d[11]),
    j = r(d[12]),
    v = r(d[13]),
    b = r(d[14]);
  const f = (0, o.createNativeStackNavigator)(),
    M = (0, o.createNativeStackNavigator)(),
    w = (0, t.createBottomTabNavigator)();
  function C() {
    return (0, b.jsxs)(M.Navigator, {
      screenOptions: {
        headerShown: !1,
        contentStyle: { backgroundColor: j.colors.canvas },
      },
      children: [
        (0, b.jsx)(M.Screen, { name: "SignIn", component: s.SignInScreen }),
        (0, b.jsxs)(M.Group, {
          screenOptions: {
            presentation: "modal",
            animation: "slide_from_bottom",
          },
          children: [
            (0, b.jsx)(M.Screen, { name: "SignUp", component: s.SignUpScreen }),
            (0, b.jsx)(M.Screen, {
              name: "ForgotPassword",
              component: s.ForgotPasswordScreen,
            }),
            (0, b.jsx)(M.Screen, {
              name: "SupabaseSetup",
              component: s.SupabaseSetupScreen,
            }),
          ],
        }),
      ],
    });
  }
  const __TAB_TITLES = { LiveMap: "Live map", Bookings: "My bookings", Assistant: "AI" };
  const B = ({ route: e }) => ({
    headerShown: !1,
    tabBarLabel: __t(__TAB_TITLES[e.name] || e.name),
    tabBarActiveTintColor: j.colors.ink,
    tabBarInactiveTintColor: j.colors.faint,
    tabBarStyle: N.tabBar,
    tabBarLabelStyle: N.tabLabel,
    tabBarItemStyle: N.tabItem,
    tabBarIcon: ({ color: n, size: o, focused: t }) =>
      (0, b.jsx)(c.default, {
        name:
          {
            Overview: "grid-outline",
            Mechanics: "construct-outline",
            Users: "people-outline",
            LiveMap: "map",
            Requests: "clipboard-outline",
            Schedule: "calendar-outline",
            Profile: "person-outline",
            Explore: "search-outline",
            Bookings: "clipboard-outline",
            Garage: "car-sport-outline",
            Assistant: "sparkles-outline",
          }[e.name] || "ellipse",
        size: t ? o + 1 : o,
        color: "LiveMap" === e.name && t ? j.colors.limeDark : n,
      }),
  });
  function k() {
    __useLanguage();
    return (0, b.jsxs)(w.Navigator, {
      screenOptions: B,
      children: [
        (0, b.jsx)(w.Screen, {
          name: "Overview",
          component: l.AdminOverviewScreen,
        }),
        (0, b.jsx)(w.Screen, {
          name: "Mechanics",
          component: l.AdminMechanicsScreen,
        }),
        (0, b.jsx)(w.Screen, { name: "Users", component: l.AdminUsersScreen }),
        (0, b.jsx)(w.Screen, {
          name: "LiveMap",
          component: u.default,
          options: { title: "Live map" },
        }),
      ],
    });
  }
  function O() {
    __useLanguage();
    const { state: e } = (0, v.useStore)(),
      n = e.appointments.filter(
        (n) => n.mechanicId === e.session?.userId && "pending" === n.status,
      ).length;
    return (0, b.jsxs)(w.Navigator, {
      screenOptions: B,
      children: [
        (0, b.jsx)(w.Screen, {
          name: "Overview",
          component: p.MechanicOverviewScreen,
        }),
        (0, b.jsx)(w.Screen, {
          name: "Requests",
          component: p.MechanicRequestsScreen,
          options: {
            title: "Requests",
            tabBarBadge: n || void 0,
            tabBarBadgeStyle: N.badge,
          },
        }),
        (0, b.jsx)(w.Screen, {
          name: "Schedule",
          component: p.MechanicScheduleScreen,
        }),
        (0, b.jsx)(w.Screen, {
          name: "LiveMap",
          component: u.default,
          options: { title: "Live map" },
        }),
        (0, b.jsx)(w.Screen, {
          name: "Profile",
          component: p.MechanicProfileScreen,
        }),
      ],
    });
  }
  function L() {
    __useLanguage();
    return (0, b.jsxs)(w.Navigator, {
      screenOptions: B,
      children: [
        (0, b.jsx)(w.Screen, {
          name: "Explore",
          component: S.ClientExploreScreen,
        }),
        (0, b.jsx)(w.Screen, {
          name: "Bookings",
          component: S.ClientBookingsScreen,
          options: { title: "My bookings" },
        }),
        (0, b.jsx)(w.Screen, {
          name: "LiveMap",
          component: u.default,
          options: { title: "Live map" },
        }),
        (0, b.jsx)(w.Screen, {
          name: "Garage",
          component: S.ClientGarageScreen,
        }),
        (0, b.jsx)(w.Screen, {
          name: "Assistant",
          component: __AIAssistantScreen,
          options: { title: "My Mechanic AI" },
        }),
      ],
    });
  }
  const N = n.default.create({
    tabBar: {
      backgroundColor: j.colors.white,
      borderTopColor: j.colors.line,
      borderTopWidth: 1,
      height: 70,
      paddingTop: 7,
      paddingBottom: 9,
      elevation: 12,
      shadowColor: j.colors.ink,
      shadowOpacity: 0.07,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: -5 },
    },
    tabLabel: { fontSize: 9, fontWeight: "700", marginTop: 2 },
    tabItem: { paddingHorizontal: 0 },
    badge: {
      backgroundColor: j.colors.orange,
      color: j.colors.white,
      fontSize: 9,
      fontWeight: "800",
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
