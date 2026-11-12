/* My Mechanic — config/supabase.js. Restored from the production build of the existing app. */
/* eslint-disable */
const __deps = [
  require("react-native-url-polyfill/auto"),
  require("@react-native-async-storage/async-storage"),
  require("expo-constants"),
  require("@supabase/supabase-js"),
  require("../utils/security"),
];
(function (g, r, i, a, m, _e, d) {
  "use strict";
  function e(e) {
    return e && e.__esModule ? e : { default: e };
  }
  (Object.defineProperty(_e, "__esModule", { value: !0 }),
    Object.defineProperty(_e, "DEFAULT_SUPABASE_URL", {
      enumerable: !0,
      get: function () {
        return l;
      },
    }),
    Object.defineProperty(_e, "environmentSupabaseConfig", {
      enumerable: !0,
      get: function () {
        return p;
      },
    }),
    Object.defineProperty(_e, "environmentYandexKey", {
      enumerable: !0,
      get: function () {
        return b;
      },
    }),
    (_e.getSavedSupabaseConfig = async function () {
      try {
        const e = await t.default.getItem(o);
        if (!e) return null;
        const n = JSON.parse(e);
        return n.url && n.anonKey ? n : null;
      } catch {
        return null;
      }
    }),
    (_e.saveSupabaseConfig = async function (e) {
      await t.default.setItem(o, JSON.stringify(e));
    }),
    (_e.clearSupabaseConfig = async function () {
      await t.default.removeItem(o);
    }),
    (_e.getSavedYandexKey = async function () {
      return (await t.default.getItem(c)) || b;
    }),
    (_e.saveYandexKey = async function (e) {
      e.trim()
        ? await t.default.setItem(c, e.trim())
        : await t.default.removeItem(c);
    }),
    (_e.makeSupabaseClient = function (e) {
      return (0, s.createClient)(e.url.replace(/\/$/, ""), e.anonKey.trim(), {
        auth: {
          storage: u.secureStorage,
          autoRefreshToken: !0,
          persistSession: !0,
          // Web: pick up the session from email links (signup confirmation, password reset).
          detectSessionInUrl: "undefined" != typeof window && !!window.location && !!window.document,
        },
        realtime: { params: { eventsPerSecond: 10 } },
      });
    }),
    (_e.readableSupabaseError = function (e) {
      if (
        /relation .* does not exist|schema cache|Could not find the table/i.test(
          e,
        )
      )
        return "The database tables are not installed yet. Run supabase/schema.sql in your Supabase SQL Editor, then connect again.";
      if (/row-level security|permission denied/i.test(e))
        return "Supabase connected, but access is blocked by RLS. Run the policies in supabase/schema.sql.";
      return /invalid api key|jwt|apikey/i.test(e)
        ? "The Supabase anon/publishable key is invalid. Copy it from Project Settings \u2192 API."
        : e;
    }),
    r(d[0]));
  var t = e(r(d[1])),
    n = e(r(d[2])),
    s = r(d[3]),
    u = r(d[4]);
  const o = "mm.supabase.config.v2",
    c = "mm.yandex.key.v1",
    l = "https://ewdsginkjxltdlkysnri.supabase.co",
    // Built-in project connection (public publishable key only; the service-role key is never in the app).
    EMBEDDED_ANON_KEY = "sb_publishable_d43Le1J7ugQdl4k5Io644g_zjRjqr8a",
    f = n.default.expoConfig?.extra ?? {},
    p = { url: f.supabaseUrl || l, anonKey: f.supabaseAnonKey || EMBEDDED_ANON_KEY },
    b = f.yandexMapsApiKey || "";
})(
  globalThis,
  (x) => x,
  (x) => (x && x.__esModule ? x.default : x),
  (x) => x,
  module,
  exports,
  __deps,
);
