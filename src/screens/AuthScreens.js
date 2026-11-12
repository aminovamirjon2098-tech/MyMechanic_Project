/* My Mechanic — screens/AuthScreens.js. Restored from the production build of the existing app. */
/* eslint-disable */
const __RN = require("react-native");
const __rn = (name) => ({ __esModule: true, default: __RN[name] });
const { LanguageSwitcher: __LanguageSwitcher } = require("../i18n/LanguageSwitcher");
const __deps = [
  require("react"),
  require("../i18n/TranslatedAlert"),
  __rn("KeyboardAvoidingView"),
  __rn("Platform"),
  __rn("Pressable"),
  __rn("ScrollView"),
  __rn("StyleSheet"),
  require("../i18n/TranslatedText"),
  __rn("useWindowDimensions"),
  __rn("View"),
  require("@expo/vector-icons/Ionicons"),
  require("react-native-safe-area-context"),
  require("../components/ui"),
  require("../theme"),
  require("../state/seed"),
  require("../config/supabase"),
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
    (_e.SignInScreen = function ({ navigation: e }) {
      const {
          signIn: t,
          backendMode: c,
          realtimeStatus: j,
          backendError: k,
        } = (0, C.useStore)(),
        [B, P] = (0, o.useState)("client"),
        [R, E] = (0, o.useState)(""),
        [z, I] = (0, o.useState)(""),
        [A, F] = (0, o.useState)(!1),
        [L, D] = (0, o.useState)(""),
        [W, M] = (0, o.useState)(!1),
        [Y, U] = (0, o.useState)(!1),
        { width: O } = (0, h.default)(),
        H = O >= 900,
        N = async () => {
          if (!R.trim() || !z)
            return void D("Enter your email/phone and password.");
          (M(!0), D(""));
          const e = await t(R.trim(), z);
          (M(!1), e.error && D(e.error));
        };
      return (0, w.jsx)(x.SafeAreaView, {
        style: v.authPage,
        edges: ["top", "bottom"],
        children: (0, w.jsx)(n.default, {
          style: { flex: 1 },
          behavior: void 0,
          children: (0, w.jsxs)(s.default, {
            contentContainerStyle: [v.authScroll, H && v.authScrollWide],
            keyboardShouldPersistTaps: "handled",
            showsVerticalScrollIndicator: !1,
            children: [
              (0, w.jsxs)(p.default, {
                style: [v.hero, H && v.heroWide],
                children: [
                  (0, w.jsx)(p.default, { style: v.ringOne }),
                  (0, w.jsx)(p.default, { style: v.ringTwo }),
                  (0, w.jsxs)(p.default, {
                    style: v.brandRow,
                    children: [
                      (0, w.jsx)(p.default, {
                        style: v.brandMark,
                        children: (0, w.jsx)(f.default, {
                          name: "construct",
                          size: 23,
                          color: y.colors.ink,
                        }),
                      }),
                      (0, w.jsx)(u.default, {
                        style: v.brand,
                        children: "MY MECHANIC",
                      }),
                      (0, w.jsxs)(p.default, {
                        style: v.localBadge,
                        children: [
                          (0, w.jsx)(p.default, {
                            style: [
                              v.localDot,
                              "error" === j && {
                                backgroundColor: y.colors.orange,
                              },
                            ],
                          }),
                          (0, w.jsx)(u.default, {
                            style: v.localText,
                            children:
                              "supabase" === c
                                ? "connected" === j
                                  ? "SUPABASE REALTIME"
                                  : "SUPABASE CONNECTING"
                                : "LOCAL SECURE MODE",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, w.jsxs)(u.default, {
                    style: v.heroTitle,
                    children: ["Car care,", "\n", "beautifully coordinated."],
                  }),
                  (0, w.jsx)(u.default, {
                    style: v.heroCopy,
                    children:
                      "One place to manage trusted mechanics, busy workshop schedules, and every driver booking.",
                  }),
                  (0, w.jsx)(p.default, {
                    style: v.heroFeatureRow,
                    children: [
                      ["shield-checkmark-outline", "Secure accounts"],
                      ["calendar-outline", "Smart scheduling"],
                      ["location-outline", "Live locations"],
                    ].map(([e, o]) =>
                      (0, w.jsxs)(
                        p.default,
                        {
                          style: v.heroFeature,
                          children: [
                            (0, w.jsx)(f.default, {
                              name: e,
                              size: 17,
                              color: y.colors.lime,
                            }),
                            (0, w.jsx)(u.default, {
                              style: v.heroFeatureText,
                              children: o,
                            }),
                          ],
                        },
                        o,
                      ),
                    ),
                  }),
                  // Supabase is built in, so the connection link is replaced by the language switch.
                  (0, w.jsx)(__LanguageSwitcher, {
                    dark: !0,
                    style: { marginTop: 26, alignSelf: "flex-start" },
                  }),
                ],
              }),
              (0, w.jsxs)(p.default, {
                style: [v.formCard, H && v.formCardWide],
                children: [
                  (0, w.jsx)(u.default, {
                    style: v.formEyebrow,
                    children: "WELCOME BACK",
                  }),
                  (0, w.jsx)(u.default, {
                    style: v.formTitle,
                    children: "Sign in to your account",
                  }),
                  (0, w.jsx)(u.default, {
                    style: v.formSubtitle,
                    children:
                      "Each role has its own focused, access-controlled workspace.",
                  }),
                  !!k && (0, w.jsx)(b.InfoBanner, { message: k, tone: "red" }),
                  (0, w.jsx)(p.default, {
                    style: v.roleRow,
                    children: T.map((e) => {
                      const o = B === e.role;
                      return (0, w.jsxs)(
                        l.default,
                        {
                          onPress: () => {
                            (P(e.role),
                              "local" === c
                                ? (E(S.demoCredentials[e.role].email),
                                  I(S.demoCredentials[e.role].password),
                                  U(!0))
                                : U(!1),
                              D(""));
                          },
                          style: [v.roleCard, o && v.roleCardActive],
                          children: [
                            (0, w.jsx)(p.default, {
                              style: [v.roleIcon, o && v.roleIconActive],
                              children: (0, w.jsx)(f.default, {
                                name: e.icon,
                                size: 21,
                                color: o ? y.colors.lime : y.colors.ink,
                              }),
                            }),
                            (0, w.jsx)(u.default, {
                              style: [
                                v.roleLabel,
                                o && { color: y.colors.white },
                              ],
                              children: e.label,
                            }),
                            (0, w.jsx)(u.default, {
                              style: [
                                v.roleDescription,
                                o && { color: "#B7C2BA" },
                              ],
                              numberOfLines: 2,
                              children: e.description,
                            }),
                            o &&
                              (0, w.jsx)(p.default, { style: v.selectedDot }),
                          ],
                        },
                        e.role,
                      );
                    }),
                  }),
                  (0, w.jsx)(b.Field, {
                    label: "Email or phone",
                    icon: "mail-outline",
                    value: R,
                    onChangeText: (e) => {
                      (E(e), U(!1));
                    },
                    autoCapitalize: "none",
                    keyboardType: "email-address",
                    returnKeyType: "next",
                    placeholder: "you@example.com or +1 512\u2026",
                  }),
                  (0, w.jsx)(b.Field, {
                    label: "Password",
                    icon: "lock-closed-outline",
                    value: z,
                    onChangeText: (e) => {
                      (I(e), U(!1));
                    },
                    secureTextEntry: !A,
                    autoCapitalize: "none",
                    returnKeyType: "go",
                    onSubmitEditing: N,
                    placeholder: "Your password",
                    error: L,
                    right: (0, w.jsx)(l.default, {
                      onPress: () => F((e) => !e),
                      hitSlop: 10,
                      children: (0, w.jsx)(f.default, {
                        name: A ? "eye-off-outline" : "eye-outline",
                        size: 19,
                        color: y.colors.muted,
                      }),
                    }),
                  }),
                  (0, w.jsx)(l.default, {
                    onPress: () => e.navigate("ForgotPassword"),
                    style: v.forgotLink,
                    children: (0, w.jsx)(u.default, {
                      style: v.forgotText,
                      children: "Forgot password?",
                    }),
                  }),
                  (0, w.jsx)(b.Button, {
                    label: "Sign in",
                    onPress: N,
                    icon: "arrow-forward",
                    size: "large",
                    full: !0,
                    loading: W,
                  }),
                  Y &&
                    (0, w.jsxs)(p.default, {
                      style: v.demoBox,
                      children: [
                        (0, w.jsxs)(p.default, {
                          style: v.demoTitleRow,
                          children: [
                            (0, w.jsx)(f.default, {
                              name: "key-outline",
                              size: 16,
                              color: y.colors.ink,
                            }),
                            (0, w.jsx)(u.default, {
                              style: v.demoTitle,
                              children: "Demo credentials loaded",
                            }),
                          ],
                        }),
                        (0, w.jsxs)(u.default, {
                          style: v.demoText,
                          children: [
                            S.demoCredentials[B].email,
                            " \xb7 ",
                            S.demoCredentials[B].password,
                          ],
                        }),
                      ],
                    }),
                  (0, w.jsxs)(p.default, {
                    style: v.signupRow,
                    children: [
                      (0, w.jsx)(u.default, {
                        style: v.signupText,
                        children: "New to My Mechanic?",
                      }),
                      (0, w.jsx)(l.default, {
                        onPress: () => e.navigate("SignUp"),
                        children: (0, w.jsx)(u.default, {
                          style: v.signupLink,
                          children: "Create a driver account",
                        }),
                      }),
                    ],
                  }),
                  (0, w.jsx)(u.default, {
                    style: v.authFootnote,
                    children:
                      "Driver profiles and shared locations sync across every signed-in device when Supabase is connected.",
                  }),
                ],
              }),
            ],
          }),
        }),
      });
    }),
    (_e.SignUpScreen = function ({ navigation: e }) {
      const { signUpDriver: t, backendMode: l } = (0, C.useStore)(),
        [c, h] = (0, o.useState)(""),
        [x, S] = (0, o.useState)(""),
        [j, T] = (0, o.useState)(""),
        [B, P] = (0, o.useState)(""),
        [R, E] = (0, o.useState)(""),
        [z, I] = (0, o.useState)({}),
        [A, F] = (0, o.useState)(""),
        [L, D] = (0, o.useState)(""),
        [W, M] = (0, o.useState)(!1),
        Y = () => {
          const e = {};
          return (
            c.trim() || (e.name = "Enter your full name."),
            (0, k.isValidEmail)(x) ||
              (e.email = "Enter a valid email address."),
            (0, k.isValidPhone)(j) || (e.phone = "Enter a valid phone number."),
            (0, k.isStrongEnoughPassword)(B) ||
              (e.password = "Use at least 6 characters."),
            B !== R && (e.confirm = "Passwords do not match."),
            I(e),
            0 === Object.keys(e).length
          );
        },
        U = async () => {
          if ((F(""), D(""), !Y())) return;
          M(!0);
          const e = await t({
            name: c.trim(),
            email: x.trim(),
            phone: j.trim(),
            password: B,
          });
          (M(!1),
            e.error
              ? F(e.error)
              : D(e.message || "Your driver account was created."));
        };
      return (0, w.jsx)(b.Screen, {
        edges: ["top", "bottom"],
        children: (0, w.jsx)(n.default, {
          style: { flex: 1 },
          behavior: void 0,
          children: (0, w.jsxs)(s.default, {
            contentContainerStyle: v.formScroll,
            keyboardShouldPersistTaps: "handled",
            children: [
              (0, w.jsx)(b.ScreenTitle, {
                eyebrow: "JOIN MY MECHANIC",
                title: "Create your driver account",
                subtitle:
                  "Book trusted mechanics, manage your garage, and share your live location when you choose.",
                right: (0, w.jsx)(b.IconButton, {
                  icon: "close",
                  label: "Close",
                  onPress: () => e.goBack(),
                }),
              }),
              "supabase" === l &&
                (0, w.jsx)(b.InfoBanner, {
                  tone: "green",
                  icon: "cloud-done-outline",
                  message:
                    "Supabase is connected. Your new driver profile is inserted immediately and appears in every administrator\u2019s user directory through Realtime.",
                }),
              !!L &&
                (0, w.jsx)(b.InfoBanner, {
                  tone: "green",
                  icon: "checkmark-circle-outline",
                  message: L,
                }),
              !!A && (0, w.jsx)(b.InfoBanner, { tone: "red", message: A }),
              (0, w.jsx)(b.Field, {
                label: "Full name",
                icon: "person-outline",
                value: c,
                onChangeText: h,
                autoComplete: "name",
                placeholder: "Your full name",
                error: z.name,
              }),
              (0, w.jsx)(b.Field, {
                label: "Email address",
                icon: "mail-outline",
                value: x,
                onChangeText: S,
                autoCapitalize: "none",
                keyboardType: "email-address",
                autoComplete: "email",
                placeholder: "you@example.com",
                error: z.email,
              }),
              (0, w.jsx)(b.Field, {
                label: "Phone number",
                icon: "call-outline",
                value: j,
                onChangeText: T,
                keyboardType: "phone-pad",
                autoComplete: "tel",
                placeholder: "+1 512 555 0100",
                error: z.phone,
              }),
              (0, w.jsx)(b.Field, {
                label: "Password",
                icon: "lock-closed-outline",
                value: B,
                onChangeText: P,
                secureTextEntry: !0,
                autoCapitalize: "none",
                placeholder: "At least 6 characters",
                error: z.password,
              }),
              (0, w.jsx)(b.Field, {
                label: "Confirm password",
                icon: "lock-closed-outline",
                value: R,
                onChangeText: E,
                secureTextEntry: !0,
                autoCapitalize: "none",
                returnKeyType: "done",
                onSubmitEditing: U,
                placeholder: "Repeat your password",
                error: z.confirm,
              }),
              (0, w.jsx)(b.Button, {
                label: "Create account",
                onPress: U,
                icon: "arrow-forward",
                size: "large",
                full: !0,
                loading: W,
              }),
              (0, w.jsxs)(p.default, {
                style: v.noteBox,
                children: [
                  (0, w.jsx)(f.default, {
                    name: "shield-checkmark-outline",
                    size: 20,
                    color: y.colors.ink,
                  }),
                  (0, w.jsx)(u.default, {
                    style: v.noteText,
                    children:
                      "Your phone number can be used to sign in. Location sharing stays off until you explicitly enable it.",
                  }),
                ],
              }),
              !!L &&
                "supabase" === l &&
                (0, w.jsx)(b.Button, {
                  label: "Back to sign in",
                  variant: "secondary",
                  onPress: () => e.goBack(),
                  full: !0,
                }),
            ],
          }),
        }),
      });
    }),
    (_e.ForgotPasswordScreen = function ({ navigation: e }) {
      const {
          requestPasswordReset: t,
          confirmPasswordReset: n,
          backendMode: l,
        } = (0, C.useStore)(),
        [c, u] = (0, o.useState)("request"),
        [h, p] = (0, o.useState)(""),
        [f, x] = (0, o.useState)(""),
        [y, S] = (0, o.useState)(""),
        [j, T] = (0, o.useState)(""),
        [B, P] = (0, o.useState)(""),
        [R, E] = (0, o.useState)(""),
        [z, I] = (0, o.useState)(!1);
      return (0, w.jsx)(b.Screen, {
        edges: ["top", "bottom"],
        children: (0, w.jsxs)(s.default, {
          contentContainerStyle: v.formScroll,
          keyboardShouldPersistTaps: "handled",
          children: [
            (0, w.jsx)(b.ScreenTitle, {
              eyebrow: "ACCOUNT RECOVERY",
              title: "Reset your password",
              subtitle:
                "request" === c
                  ? "Enter the email or phone linked to your account."
                  : "confirm" === c
                    ? "supabase" === l
                      ? "We emailed you a secure reset link. Once opened, set a new password below."
                      : "Enter the 6-digit code and choose a new password."
                    : "All set.",
              right: (0, w.jsx)(b.IconButton, {
                icon: "close",
                label: "Close",
                onPress: () => e.goBack(),
              }),
            }),
            "request" === c &&
              (0, w.jsxs)(w.Fragment, {
                children: [
                  (0, w.jsx)(b.Field, {
                    label: "Email or phone",
                    icon: "mail-outline",
                    value: h,
                    onChangeText: p,
                    autoCapitalize: "none",
                    placeholder: "you@example.com",
                    error: B,
                  }),
                  (0, w.jsx)(b.Button, {
                    label: "Send reset code",
                    onPress: async () => {
                      if (!h.trim())
                        return void P(
                          "Enter the email or phone number on your account.",
                        );
                      (I(!0), P(""));
                      const e = await t(h.trim());
                      (I(!1),
                        e.error
                          ? P(e.error)
                          : (e.devCode && T(e.devCode),
                            E(e.message || ""),
                            u("confirm")));
                    },
                    icon: "paper-plane-outline",
                    size: "large",
                    full: !0,
                    loading: z,
                  }),
                ],
              }),
            "confirm" === c &&
              (0, w.jsxs)(w.Fragment, {
                children: [
                  !!R &&
                    (0, w.jsx)(b.InfoBanner, { message: R, tone: "green" }),
                  !!j &&
                    (0, w.jsx)(b.InfoBanner, {
                      message: `Local demo reset code: ${j}`,
                      tone: "blue",
                      icon: "key-outline",
                    }),
                  "local" === l &&
                    (0, w.jsx)(b.Field, {
                      label: "Reset code",
                      icon: "key-outline",
                      value: f,
                      onChangeText: x,
                      keyboardType: "number-pad",
                      maxLength: 6,
                      placeholder: "6-digit code",
                    }),
                  (0, w.jsx)(b.Field, {
                    label: "New password",
                    icon: "lock-closed-outline",
                    value: y,
                    onChangeText: S,
                    secureTextEntry: !0,
                    placeholder: "At least 6 characters",
                    error: B,
                  }),
                  (0, w.jsx)(b.Button, {
                    label: "Update password",
                    onPress: async () => {
                      if (!(0, k.isStrongEnoughPassword)(y))
                        return void P("Use at least 6 characters.");
                      if ("local" === l && 6 !== f.trim().length)
                        return void P("Enter the 6-digit reset code.");
                      I(!0);
                      const e = await n(h, f, y);
                      (I(!1), e.error ? P(e.error) : u("done"));
                    },
                    icon: "checkmark",
                    size: "large",
                    full: !0,
                    loading: z,
                  }),
                ],
              }),
            "done" === c &&
              (0, w.jsxs)(w.Fragment, {
                children: [
                  (0, w.jsx)(b.InfoBanner, {
                    tone: "green",
                    icon: "checkmark-circle-outline",
                    message:
                      "Your password has been updated. You can sign in with it now.",
                  }),
                  (0, w.jsx)(b.Button, {
                    label: "Back to sign in",
                    onPress: () => e.goBack(),
                    size: "large",
                    full: !0,
                  }),
                ],
              }),
            "done" !== c &&
              (0, w.jsx)(b.Button, {
                label: "Back to sign in",
                onPress: () => e.goBack(),
                variant: "ghost",
                full: !0,
                style: { marginTop: 8 },
              }),
          ],
        }),
      });
    }),
    (_e.SupabaseSetupScreen = function ({ navigation: e }) {
      const {
          backendMode: n,
          realtimeStatus: l,
          configureSupabase: c,
          useLocalMode: h,
          yandexApiKey: f,
          updateYandexApiKey: x,
        } = (0, C.useStore)(),
        [y, S] = (0, o.useState)(j.DEFAULT_SUPABASE_URL),
        [k, T] = (0, o.useState)(""),
        [B, P] = (0, o.useState)(f),
        [R, E] = (0, o.useState)(!1),
        [z, I] = (0, o.useState)(""),
        [A, F] = (0, o.useState)("");
      return (0, w.jsx)(b.Screen, {
        edges: ["top", "bottom"],
        children: (0, w.jsxs)(s.default, {
          contentContainerStyle: v.formScroll,
          keyboardShouldPersistTaps: "handled",
          children: [
            (0, w.jsx)(b.ScreenTitle, {
              eyebrow: "REALTIME INFRASTRUCTURE",
              title: "Supabase & Yandex",
              subtitle:
                "Connect the shared database used for driver registration, live locations, mechanics, and bookings.",
              right: (0, w.jsx)(b.IconButton, {
                icon: "close",
                label: "Close",
                onPress: () => e.goBack(),
              }),
            }),
            (0, w.jsx)(b.InfoBanner, {
              tone: "supabase" === n && "connected" === l ? "green" : "blue",
              icon: "cloud-outline",
              message:
                "supabase" === n
                  ? `Supabase mode \xb7 ${l}. Postgres changes update profiles and live markers without refreshing.`
                  : "Local demo mode is device-only. Connect Supabase to make newly registered drivers visible to everyone.",
            }),
            !!z && (0, w.jsx)(b.InfoBanner, { tone: "green", message: z }),
            !!A && (0, w.jsx)(b.InfoBanner, { tone: "red", message: A }),
            (0, w.jsxs)(p.default, {
              style: v.setupSteps,
              children: [
                (0, w.jsx)(u.default, {
                  style: v.setupTitle,
                  children: "One-time cloud setup",
                }),
                (0, w.jsx)(u.default, {
                  style: v.setupStep,
                  children:
                    "1. In Supabase, open Project Settings \u2192 API and copy the anon public or publishable key.",
                }),
                (0, w.jsx)(u.default, {
                  style: v.setupStep,
                  children:
                    "2. Run the included supabase/schema.sql file once in the SQL Editor. It creates profiles, locations, RLS policies, registration triggers, and Realtime publication.",
                }),
                (0, w.jsx)(u.default, {
                  style: v.setupStep,
                  children:
                    "3. Deploy the included admin-create-user Edge Function if administrators need to create mechanic accounts.",
                }),
              ],
            }),
            (0, w.jsx)(b.Field, {
              label: "Supabase project URL",
              icon: "link-outline",
              value: y,
              onChangeText: S,
              autoCapitalize: "none",
              keyboardType: "url",
              placeholder: "https://PROJECT.supabase.co",
            }),
            (0, w.jsx)(b.Field, {
              label: "Anon / publishable key",
              icon: "key-outline",
              value: k,
              onChangeText: T,
              autoCapitalize: "none",
              multiline: !0,
              placeholder:
                "supabase" === n
                  ? "Paste the key again to reconnect"
                  : "Paste your public Supabase key",
            }),
            (0, w.jsx)(b.Button, {
              label: "Test & connect Supabase",
              onPress: async () => {
                (E(!0), F(""), I(""), await x(B));
                const e = await c({ url: y, anonKey: k });
                (E(!1),
                  e.error ? F(e.error) : (I(e.message || "Connected."), T("")));
              },
              icon: "cloud-done-outline",
              size: "large",
              full: !0,
              loading: R,
            }),
            (0, w.jsxs)(p.default, {
              style: v.yandexSection,
              children: [
                (0, w.jsx)(u.default, {
                  style: v.setupTitle,
                  children: "Yandex Maps JavaScript API",
                }),
                (0, w.jsx)(u.default, {
                  style: v.setupStep,
                  children:
                    "The map loads Yandex directly. Add your API key for production quotas and reliable map tiles; the key is stored only on this device.",
                }),
                (0, w.jsx)(b.Field, {
                  label: "Yandex API key (optional)",
                  icon: "map-outline",
                  value: B,
                  onChangeText: P,
                  autoCapitalize: "none",
                  placeholder: "Yandex developer key",
                }),
                (0, w.jsx)(b.Button, {
                  label: "Save Yandex key",
                  variant: "secondary",
                  icon: "save-outline",
                  full: !0,
                  onPress: () => {
                    x(B).then(() => {
                      (I("Yandex API key saved. The live map will use it now."),
                        F(""));
                    });
                  },
                }),
              ],
            }),
            "supabase" === n
              ? (0, w.jsx)(b.Button, {
                  label: "Disconnect and use local demo",
                  variant: "danger",
                  icon: "phone-portrait-outline",
                  full: !0,
                  style: { marginTop: 18 },
                  onPress: () =>
                    t.default.alert(
                      "Use local demo instead?",
                      "This disconnects this device from Supabase. Your cloud data is not deleted.",
                      [
                        { text: "Cancel", style: "cancel" },
                        {
                          text: "Use local demo",
                          style: "destructive",
                          onPress: () => {
                            h().then(() => e.goBack());
                          },
                        },
                      ],
                    ),
                })
              : (0, w.jsx)(b.Button, {
                  label: "Continue with local demo",
                  variant: "ghost",
                  full: !0,
                  style: { marginTop: 12 },
                  onPress: () => e.goBack(),
                }),
          ],
        }),
      });
    }));
  var o = r(d[0]),
    t = e(r(d[1])),
    n = e(r(d[2]));
  r(d[3]);
  var l = e(r(d[4])),
    s = e(r(d[5])),
    c = e(r(d[6])),
    u = e(r(d[7])),
    h = e(r(d[8])),
    p = e(r(d[9])),
    f = e(r(d[10])),
    x = r(d[11]),
    b = r(d[12]),
    y = r(d[13]),
    S = r(d[14]),
    j = r(d[15]),
    k = r(d[16]),
    C = r(d[17]),
    w = r(d[18]);
  const T = [
    {
      role: "admin",
      label: "Admin",
      icon: "shield-checkmark-outline",
      description: "Manage the network",
    },
    {
      role: "mechanic",
      label: "Mechanic",
      icon: "construct-outline",
      description: "Run your workshop",
    },
    {
      role: "client",
      label: "Driver",
      icon: "person-outline",
      description: "Book trusted care",
    },
  ];
  const v = c.default.create({
    authPage: { flex: 1, backgroundColor: y.colors.ink },
    authScroll: { flexGrow: 1, backgroundColor: y.colors.canvas },
    authScrollWide: {
      flexDirection: "row",
      padding: 22,
      gap: 20,
      backgroundColor: y.colors.ink,
      maxWidth: 1240,
      width: "100%",
      alignSelf: "center",
    },
    hero: {
      backgroundColor: y.colors.ink,
      padding: 25,
      paddingTop: 24,
      paddingBottom: 34,
      overflow: "hidden",
      borderBottomLeftRadius: 32,
      borderBottomRightRadius: 32,
    },
    heroWide: {
      flex: 1.05,
      borderRadius: 30,
      justifyContent: "center",
      padding: 40,
    },
    ringOne: {
      position: "absolute",
      width: 260,
      height: 260,
      borderRadius: 130,
      borderWidth: 1,
      borderColor: "#334139",
      right: -120,
      top: -90,
    },
    ringTwo: {
      position: "absolute",
      width: 180,
      height: 180,
      borderRadius: 90,
      borderWidth: 1,
      borderColor: "#334139",
      right: -60,
      top: -45,
    },
    brandRow: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 10,
      marginBottom: 35,
    },
    brandMark: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor: y.colors.lime,
      alignItems: "center",
      justifyContent: "center",
    },
    brand: {
      color: y.colors.white,
      fontSize: 13,
      letterSpacing: 1.8,
      fontWeight: "800",
    },
    localBadge: {
      marginLeft: "auto",
      backgroundColor: "#26352C",
      borderRadius: 99,
      paddingHorizontal: 9,
      paddingVertical: 6,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    localDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: y.colors.lime,
    },
    localText: {
      color: "#C5CEC8",
      fontSize: 8,
      letterSpacing: 0.7,
      fontWeight: "800",
    },
    heroTitle: {
      color: y.colors.white,
      fontSize: 35,
      lineHeight: 42,
      letterSpacing: -1.2,
      fontWeight: "800",
    },
    heroCopy: {
      color: "#B7C2BA",
      fontSize: 14,
      lineHeight: 21,
      marginTop: 14,
      maxWidth: 450,
    },
    heroFeatureRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 15,
      marginTop: 24,
    },
    heroFeature: { flexDirection: "row", alignItems: "center", gap: 6 },
    heroFeatureText: { color: "#D6DDD8", fontSize: 11 },
    connectionLink: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      marginTop: 26,
      alignSelf: "flex-start",
    },
    connectionLinkText: {
      color: y.colors.lime,
      fontSize: 12,
      fontWeight: "700",
    },
    formCard: {
      backgroundColor: y.colors.canvas,
      padding: 22,
      paddingTop: 28,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      marginTop: -16,
    },
    formCardWide: {
      flex: 0.95,
      borderRadius: 30,
      marginTop: 0,
      padding: 34,
      justifyContent: "center",
    },
    formEyebrow: {
      color: y.colors.muted,
      fontSize: 10,
      fontWeight: "800",
      letterSpacing: 1.5,
    },
    formTitle: {
      color: y.colors.text,
      fontSize: 25,
      lineHeight: 31,
      fontWeight: "800",
      letterSpacing: -0.7,
      marginTop: 5,
    },
    formSubtitle: {
      color: y.colors.muted,
      fontSize: 12,
      lineHeight: 18,
      marginTop: 6,
      marginBottom: 20,
    },
    roleRow: { flexDirection: "row", gap: 8, marginBottom: 20 },
    roleCard: {
      flex: 1,
      minHeight: 115,
      backgroundColor: y.colors.white,
      borderWidth: 1,
      borderColor: y.colors.line,
      borderRadius: 16,
      padding: 10,
      position: "relative",
    },
    roleCardActive: {
      backgroundColor: y.colors.ink,
      borderColor: y.colors.ink,
    },
    roleIcon: {
      width: 33,
      height: 33,
      borderRadius: 10,
      backgroundColor: y.colors.canvas,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 8,
    },
    roleIconActive: { backgroundColor: "#2C3D32" },
    roleLabel: { color: y.colors.text, fontSize: 12, fontWeight: "800" },
    roleDescription: {
      color: y.colors.muted,
      fontSize: 9,
      lineHeight: 12,
      marginTop: 3,
    },
    selectedDot: {
      position: "absolute",
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: y.colors.lime,
      right: 10,
      top: 10,
    },
    forgotLink: { alignSelf: "flex-end", marginTop: -5, marginBottom: 15 },
    forgotText: { color: y.colors.ink, fontSize: 12, fontWeight: "700" },
    demoBox: {
      backgroundColor: y.colors.softGreen,
      borderRadius: 12,
      padding: 12,
      marginTop: 14,
    },
    demoTitleRow: { flexDirection: "row", alignItems: "center", gap: 6 },
    demoTitle: { fontSize: 11, fontWeight: "800", color: y.colors.ink },
    demoText: { fontSize: 10, color: y.colors.muted, marginTop: 5 },
    signupRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 5,
      marginTop: 22,
    },
    signupText: { color: y.colors.muted, fontSize: 12 },
    signupLink: { color: y.colors.ink, fontSize: 12, fontWeight: "800" },
    authFootnote: {
      color: y.colors.faint,
      fontSize: 10,
      lineHeight: 15,
      textAlign: "center",
      marginTop: 18,
      paddingHorizontal: 10,
    },
    formScroll: {
      padding: 20,
      paddingBottom: 60,
      width: "100%",
      maxWidth: 720,
      alignSelf: "center",
    },
    noteBox: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
      backgroundColor: y.colors.softGreen,
      borderRadius: 14,
      padding: 14,
      marginTop: 16,
    },
    noteText: { flex: 1, color: y.colors.muted, fontSize: 12, lineHeight: 18 },
    setupSteps: {
      backgroundColor: y.colors.softGreen,
      borderRadius: 18,
      padding: 18,
      marginBottom: 20,
    },
    setupTitle: {
      color: y.colors.text,
      fontSize: 17,
      fontWeight: "800",
      marginBottom: 9,
    },
    setupStep: {
      color: y.colors.muted,
      fontSize: 12,
      lineHeight: 19,
      marginBottom: 8,
    },
    yandexSection: {
      marginTop: 26,
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: y.colors.line,
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
