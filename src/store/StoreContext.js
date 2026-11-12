/* My Mechanic — store/StoreContext.js. Restored from the production build of the existing app. */
/* eslint-disable */
const { resetToSignIn: __resetToSignIn } = require("../navigation/navigationRef");
const __deps = [
  require("react"),
  require("../backend/LocalBackend"),
  require("../state/seed"),
  require("../config/supabase"),
  require("../backend/SupabaseBackend"),
  require("react/jsx-runtime"),
];
(function (g, r, i, a, m, e, d) {
  "use strict";
  (Object.defineProperty(e, "__esModule", { value: !0 }),
    (e.StoreProvider = function ({ children: k }) {
      const C = (0, t.useRef)(new n.LocalBackend()),
        p = (0, t.useRef)(null),
        y = (0, t.useRef)(!0),
        [S, v] = (0, t.useState)(() => (0, s.createSeedState)()),
        [w, h] = (0, t.useState)(!1),
        [f, P] = (0, t.useState)("local"),
        [A, R] = (0, t.useState)("local"),
        [L, M] = (0, t.useState)(""),
        [K, x] = (0, t.useState)(""),
        U = (0, t.useCallback)((t) => {
          (p.current?.(),
            (p.current = t.subscribe((t) => {
              y.current && v(t);
            })),
            (C.current = t));
        }, []);
      (0, t.useEffect)(() => {
        y.current = !0;
        let t = !1;
        return (
          (async () => {
            const [n, s] = await Promise.all([
              (0, c.getSavedSupabaseConfig)(),
              (0, c.getSavedYandexKey)(),
            ]);
            if (t) return;
            x(s);
            const l = c.environmentSupabaseConfig.anonKey
              ? c.environmentSupabaseConfig
              : n;
            if (l?.anonKey) {
              const n = new o.SupabaseBackend(l, (t, n) => {
                y.current && (R(t), n && M(n));
              });
              (U(n), P("supabase"), v(n.state));
              try {
                const s = await n.init();
                t || (v(s), M(""));
              } catch (n) {
                t || M(b(n));
              }
            } else {
              const n = C.current;
              U(n);
              try {
                const s = await n.init();
                t || v(s);
              } catch (n) {
                t || M(b(n));
              }
            }
            t || h(!0);
          })(),
          () => {
            ((t = !0), (y.current = !1), p.current?.(), C.current.destroy?.());
          }
        );
      }, [U]);
      const E = (0, t.useCallback)(async (t) => {
          try {
            (await t(C.current), M(""));
          } catch (t) {
            M(b(t));
          }
        }, []),
        B = (0, t.useCallback)(async (t) => {
          try {
            const n = await t(C.current);
            return (n.error || M(""), n);
          } catch (t) {
            return { error: b(t) };
          }
        }, []),
        D = (0, t.useCallback)((t) => B((n) => n.signUpDriver(t)), [B]),
        O = (0, t.useCallback)((t, n) => B((s) => s.signIn(t, n)), [B]),
        _ = (0, t.useCallback)(async () => {
          // 1) backend.signOut() awaits supabase.auth.signOut(); 2) clear local user/session; 3) reset navigation.
          try {
            await C.current.signOut();
          } catch (t) {
            M(b(t));
          }
          (v((t) => ({ ...t, session: null })), __resetToSignIn());
        }, []),
        Y = (0, t.useCallback)((t) => B((n) => n.requestPasswordReset(t)), [B]),
        j = (0, t.useCallback)(
          (t, n, s) => B((c) => c.confirmPasswordReset(t, n, s)),
          [B],
        ),
        q = (0, t.useCallback)((t, n) => B((s) => s.changePassword(t, n)), [B]),
        I = (0, t.useCallback)(
          (t) => B((n) => n.createMechanicAccount(t)),
          [B],
        ),
        W = (0, t.useCallback)((t, n) => E((s) => s.updateMechanic(t, n)), [E]),
        $ = (0, t.useCallback)((t) => E((n) => n.toggleMechanicActive(t)), [E]),
        z = (0, t.useCallback)(
          (t, n, s) => E((c) => c.toggleAvailability(t, n, s)),
          [E],
        ),
        J = (0, t.useCallback)(
          (t, n, s) => E((c) => c.setDayAvailability(t, n, s)),
          [E],
        ),
        T = (0, t.useCallback)((t) => B((n) => n.bookAppointment(t)), [B]),
        F = (0, t.useCallback)(
          (t, n) => E((s) => s.setAppointmentStatus(t, n)),
          [E],
        ),
        G = (0, t.useCallback)(
          (t, n) => E((s) => s.updateClientProfile(t, n)),
          [E],
        ),
        H = (0, t.useCallback)((t, n) => E((s) => s.saveCar(t, n)), [E]),
        N = (0, t.useCallback)((t, n) => E((s) => s.deleteCar(t, n)), [E]),
        Q = (0, t.useCallback)((t) => E((n) => n.addReview(t)), [E]),
        V = (0, t.useCallback)((t) => E((n) => n.blockUser(t)), [E]),
        X = (0, t.useCallback)((t) => E((n) => n.unblockUser(t)), [E]),
        Z = (0, t.useCallback)(() => E((t) => t.resetWorkspace()), [E]),
        ee = (0, t.useCallback)((t) => B((n) => n.setLiveLocation(t)), [B]),
        ae = (0, t.useCallback)(
          (t, n) => B((s) => s.setLocationSharing(t, n)),
          [B],
        ),
        te = (0, t.useCallback)(async () => {
          try {
            const t = await C.current.init();
            (v(t), M(""));
          } catch (t) {
            M(b(t));
          }
        }, []),
        re = (0, t.useCallback)(
          async (t) => {
            if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(t.url.trim()))
              return {
                error: "Enter a valid https://PROJECT.supabase.co URL.",
              };
            if (t.anonKey.trim().length < 20)
              return {
                error: "Paste the complete Supabase anon or publishable key.",
              };
            const n = {
              url: t.url.trim().replace(/\/$/, ""),
              anonKey: t.anonKey.trim(),
            };
            R("connecting");
            const s = new o.SupabaseBackend(n, (t, n) => {
              y.current && (R(t), n && M(n));
            });
            try {
              const t = await s.init();
              return (
                await (0, c.saveSupabaseConfig)(n),
                C.current.destroy?.(),
                U(s),
                P("supabase"),
                v(t),
                M(""),
                R("connected"),
                {
                  message:
                    "Supabase connected. Profiles and fixed mechanic locations are active.",
                }
              );
            } catch (t) {
              return (
                s.destroy(),
                R("local" === C.current.mode ? "local" : "error"),
                { error: b(t) }
              );
            }
          },
          [U],
        ),
        ne = (0, t.useCallback)(async () => {
          (C.current.destroy?.(), await (0, c.clearSupabaseConfig)());
          const t = new n.LocalBackend();
          U(t);
          const s = await t.init();
          (P("local"), R("local"), M(""), v(s));
        }, [U]),
        se = (0, t.useCallback)(async (t) => {
          (await (0, c.saveYandexKey)(t.trim()), x(t.trim()));
        }, []),
        ce = (0, t.useMemo)(
          () => ({
            state: S,
            hydrated: w,
            // Existing Supabase client of the active backend (null in local mode). No new client is created.
            getSupabaseClient: () => C.current?.client ?? null,
            backendMode: f,
            realtimeStatus: A,
            backendError: L,
            yandexApiKey: K,
            signUpDriver: D,
            signIn: O,
            signOut: _,
            requestPasswordReset: Y,
            confirmPasswordReset: j,
            changePassword: q,
            createMechanicAccount: I,
            updateMechanic: W,
            toggleMechanicActive: $,
            toggleAvailability: z,
            setDayAvailability: J,
            bookAppointment: T,
            setAppointmentStatus: F,
            updateClient: G,
            saveCar: H,
            deleteCar: N,
            addReview: Q,
            blockUser: V,
            unblockUser: X,
            resetWorkspace: Z,
            setLiveLocation: ee,
            setLocationSharing: ae,
            reload: te,
            configureSupabase: re,
            useLocalMode: ne,
            updateYandexApiKey: se,
          }),
          [
            S,
            w,
            f,
            A,
            L,
            K,
            D,
            O,
            _,
            Y,
            j,
            q,
            I,
            W,
            $,
            z,
            J,
            T,
            F,
            G,
            H,
            N,
            Q,
            V,
            X,
            Z,
            ee,
            ae,
            te,
            re,
            ne,
            se,
          ],
        );
      return (0, l.jsx)(u.Provider, { value: ce, children: k });
    }),
    (e.useStore = function () {
      const n = (0, t.useContext)(u);
      if (!n) throw new Error("useStore must be used inside StoreProvider");
      return n;
    }));
  var t = r(d[0]),
    n = r(d[1]),
    s = r(d[2]),
    c = r(d[3]),
    o = r(d[4]),
    l = r(d[5]);
  const u = (0, t.createContext)(null),
    b = (t) =>
      t instanceof Error
        ? t.message
        : "Something went wrong. Please try again.";
})(
  globalThis,
  (x) => x,
  (x) => (x && x.__esModule ? x.default : x),
  (x) => x,
  module,
  exports,
  __deps,
);
