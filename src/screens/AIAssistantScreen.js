/* My Mechanic AI — automotive assistant chat for drivers.
   Uses the EXISTING Supabase client of the active backend (Store.getSupabaseClient) and the deployed
   Edge Function `ai-chat`: supabase.functions.invoke('ai-chat', { body: { messages } }).
   The authenticated session is attached automatically by supabase-js; no tokens are read or stored here.
   Bookings are never created from this screen — it only opens the existing Booking screen. */
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text as RawText,
  View,
} from 'react-native';
import { Avatar, Badge, Button, Card, InfoBanner, Rating, Screen, ScreenTitle } from '../components/ui';
import Text from '../i18n/TranslatedText';
import TextInput from '../i18n/TranslatedTextInput';
import { t as translate, useLanguage } from '../i18n/i18n';
import { useStore } from '../store/StoreContext';
import { colors, radius, shadow, spacing } from '../theme';

const MAX_LENGTH = 2000;
const MAX_HISTORY = 10; // limit enforced by the ai-chat Edge Function
const SUGGESTIONS = [
  'My car makes a strange noise.',
  "The engine won't start.",
  'My car vibrates when braking.',
  'Help me find a mechanic.',
];

let nextId = 1;
const newId = () => `m${Date.now().toString(36)}${nextId++}`;

const num = (v) => (v === null || v === undefined || v === '' || Number.isNaN(Number(v)) ? null : Number(v));
const str = (v) => (typeof v === 'string' && v.trim() ? v.trim() : null);

/** Normalises a mechanic returned by the Edge Function and enriches it ONLY with real data from the store. */
function normalizeMechanic(raw, storeMechanics, reviews) {
  if (!raw || typeof raw !== 'object') return null;
  const id = str(raw.id) || str(raw.profile_id) || str(raw.mechanicId) || str(raw.mechanic_id);
  const known = id ? storeMechanics.find((m) => m.id === id) : null;
  const rawServices = Array.isArray(raw.services) ? raw.services : null;
  const services = (rawServices ?? known?.services ?? [])
    .map((s) => ({
      id: str(s?.id),
      name: str(s?.name),
      duration: num(s?.duration ?? s?.duration_minutes),
    }))
    .filter((s) => s.name);
  const own = reviews.filter((r) => r.mechanicId === id);
  const storeRating = own.length ? own.reduce((a, r) => a + r.rating, 0) / own.length : null;
  return {
    id,
    bookable: !!known && known.isActive !== false && known.status !== 'blocked',
    name: str(raw.name) || str(raw.full_name) || known?.name || null,
    color: known?.color,
    specialization: str(raw.specialization) || str(known?.specialization),
    address: str(raw.address) || str(raw.mechanic_address) || str(known?.address),
    rating: num(raw.rating ?? raw.average_rating ?? raw.avg_rating) ?? storeRating,
    reviewCount: num(raw.reviews_count ?? raw.review_count) ?? (own.length || null),
    experience: num(raw.experience_years ?? raw.experienceYears) ?? (known ? num(known.experienceYears) : null),
    services,
  };
}

async function readFunctionError(error) {
  try {
    const body = await error?.context?.json?.();
    return body?.error || body?.message || '';
  } catch {
    return '';
  }
}

export function AIAssistantScreen({ navigation }) {
  const { state, backendMode, getSupabaseClient } = useStore();
  const language = useLanguage();
  const session = state.session;
  const me = state.clients.find((c) => c.id === session?.userId);
  const scrollRef = useRef(null);
  const busyRef = useRef(false);

  const welcome = useMemo(
    () => ({
      id: 'welcome',
      role: 'model',
      content: translate(
        "Hi! I'm My Mechanic AI. Describe what is happening with your car and I will help you understand the problem and find a suitable mechanic.",
        language,
      ),
      welcome: true,
    }),
    [language],
  );

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const access = useMemo(() => {
    if (!session || session.role !== 'client') return 'Only signed-in driver accounts can use My Mechanic AI.';
    if (backendMode !== 'supabase') return 'My Mechanic AI needs the online (Supabase) connection.';
    if (!me || me.status === 'blocked') return 'Your account is not active. Contact an administrator.';
    return '';
  }, [session, backendMode, me]);

  const scrollToEnd = useCallback(() => {
    requestAnimationFrame(() => scrollRef.current?.scrollToEnd({ animated: true }));
  }, []);
  useEffect(scrollToEnd, [messages.length, loading, scrollToEnd]);

  const send = useCallback(
    async (textArg) => {
      const text = String(textArg ?? input).trim();
      if (!text || busyRef.current || access) return;
      if (text.length > MAX_LENGTH) {
        setError(translate('Messages are limited to 2000 characters.', language));
        return;
      }
      const client = getSupabaseClient?.();
      if (!client) {
        setError(translate('My Mechanic AI needs the online (Supabase) connection.', language));
        return;
      }
      busyRef.current = true;
      setLoading(true);
      setError('');
      setInput('');
      const userMessage = { id: newId(), role: 'user', content: text };
      const history = [...messages, userMessage];
      setMessages(history);
      try {
        // ai-chat accepts at most 10 messages: send only the latest ones, and the window
        // must start and end with a "user" message (the newest one is always the user's).
        let conversationMessages = history
          .filter((m) => (m.role === 'user' || m.role === 'model') && str(m.content))
          .map((m) => ({ role: m.role, content: String(m.content).slice(0, MAX_LENGTH) }))
          .slice(-MAX_HISTORY);
        while (conversationMessages.length > 1 && conversationMessages[0].role !== 'user') {
          conversationMessages = conversationMessages.slice(1);
        }
        if (conversationMessages[conversationMessages.length - 1]?.role !== 'user') {
          conversationMessages = [...conversationMessages, { role: 'user', content: text }].slice(-MAX_HISTORY);
        }
        const { data, error: fnError } = await client.functions.invoke('ai-chat', {
          body: { messages: conversationMessages },
        });
        if (fnError) {
          const detail = await readFunctionError(fnError);
          const status = fnError?.context?.status;
          throw new Error(
            status === 401 || /session/i.test(detail)
              ? translate('Your session has expired. Please sign out and sign in again.', language)
              : status === 403
                ? translate('Only signed-in driver accounts can use My Mechanic AI.', language)
                : status === 429
                  ? translate('Too many requests. Please wait a moment and try again.', language)
                  : detail || translate('My Mechanic AI is temporarily unavailable. Please try again.', language),
          );
        }
        if (!data?.success || !str(data?.reply)) {
          throw new Error(
            str(data?.error) || translate('My Mechanic AI is temporarily unavailable. Please try again.', language),
          );
        }
        const mechanics = Array.isArray(data.mechanics)
          ? data.mechanics.map((m) => normalizeMechanic(m, state.mechanics, state.reviews)).filter((m) => m && m.name)
          : [];
        setMessages((list) => [
          ...list,
          {
            id: newId(),
            role: 'model',
            content: data.reply.trim(),
            mechanics,
            askedForMechanic: /mechanic|механик|mexanik|usta/i.test(text),
          },
        ]);
      } catch (e) {
        setError(
          e instanceof Error && !/Failed to fetch|NetworkError/i.test(e.message)
            ? e.message
            : translate('Could not reach My Mechanic AI. Check your connection and try again.', language),
        );
        // Let the user resend the same text easily.
        setMessages((list) => list.filter((m) => m.id !== userMessage.id));
        setInput(text);
      } finally {
        busyRef.current = false;
        setLoading(false);
      }
    },
    [input, access, getSupabaseClient, messages, state.mechanics, state.reviews, language],
  );

  const openBooking = (mechanicId, serviceId) => {
    const params = serviceId ? { mechanicId, serviceId } : { mechanicId };
    (navigation.getParent?.() ?? navigation).navigate('Booking', params);
  };

  const remaining = MAX_LENGTH - input.length;
  const canSend = !!input.trim() && !loading && !access && remaining >= 0;

  return (
    <Screen>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          onContentSizeChange={scrollToEnd}
        >
          <ScreenTitle
            eyebrow="AI ASSISTANT"
            title="My Mechanic AI"
            subtitle="Describe the symptoms — get guidance and real mechanics."
          />
          {!!access && <InfoBanner tone="orange" icon="lock-closed-outline" message={access} />}

          <Bubble message={welcome} />
          {messages.length === 0 && !access && (
            <View style={styles.suggestions}>
              <Text style={styles.suggestionTitle}>Try asking</Text>
              {SUGGESTIONS.map((s) => (
                <Pressable
                  key={s}
                  onPress={() => send(translate(s, language))}
                  disabled={loading}
                  style={({ pressed }) => [styles.suggestion, pressed && styles.pressed]}
                >
                  <Ionicons name="sparkles-outline" size={15} color={colors.ink} />
                  <Text style={styles.suggestionText}>{s}</Text>
                  <Ionicons name="arrow-forward" size={14} color={colors.muted} />
                </Pressable>
              ))}
            </View>
          )}

          {messages.map((m) => (
            <View key={m.id}>
              <Bubble message={m} />
              {m.role === 'model' && m.mechanics?.length > 0 && (
                <View style={styles.mechanicList}>
                  <Text style={styles.recommendTitle}>Recommended mechanics</Text>
                  {m.mechanics.map((mech, i) => (
                    <MechanicResult key={mech.id || `${m.id}-${i}`} mechanic={mech} onBook={openBooking} />
                  ))}
                </View>
              )}
              {m.role === 'model' && m.askedForMechanic && !m.mechanics?.length && (
                <InfoBanner
                  tone="blue"
                  icon="information-circle-outline"
                  message="No matching mechanics were found right now. You can browse all mechanics on the Explore tab."
                />
              )}
            </View>
          ))}

          {loading && <TypingIndicator />}
          {!!error && <InfoBanner tone="red" message={error} />}
        </ScrollView>

        <View style={styles.composer}>
          <View style={[styles.inputWrap, remaining < 0 && { borderColor: colors.red }]}>
            <TextInput
              value={input}
              onChangeText={(v) => setInput(v.slice(0, MAX_LENGTH))}
              placeholder="Describe the problem with your car…"
              placeholderTextColor={colors.faint}
              multiline
              maxLength={MAX_LENGTH}
              editable={!access}
              style={styles.input}
              onKeyPress={(e) => {
                if (Platform.OS === 'web' && e.nativeEvent.key === 'Enter' && !e.nativeEvent.shiftKey) {
                  e.preventDefault?.();
                  send();
                }
              }}
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={translate('Send', language)}
              onPress={() => send()}
              disabled={!canSend}
              style={({ pressed }) => [styles.sendButton, !canSend && styles.sendDisabled, pressed && styles.pressed]}
            >
              {loading ? (
                <ActivityIndicator size="small" color={colors.ink} />
              ) : (
                <Ionicons name="arrow-up" size={20} color={colors.ink} />
              )}
            </Pressable>
          </View>
          {input.length > MAX_LENGTH - 200 && (
            <RawText style={styles.counter}>
              {input.length}/{MAX_LENGTH}
            </RawText>
          )}
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

function Bubble({ message }) {
  const mine = message.role === 'user';
  return (
    <View style={[styles.row, mine ? styles.rowMine : styles.rowAi]}>
      {!mine && (
        <View style={styles.aiAvatar}>
          <Ionicons name="sparkles" size={15} color={colors.lime} />
        </View>
      )}
      <View style={[styles.bubble, mine ? styles.bubbleMine : styles.bubbleAi]}>
        <RawText selectable style={[styles.bubbleText, mine && { color: colors.white }]}>
          {message.content}
        </RawText>
      </View>
    </View>
  );
}

function TypingIndicator() {
  const dots = [useRef(new Animated.Value(0.3)).current, useRef(new Animated.Value(0.3)).current, useRef(new Animated.Value(0.3)).current];
  useEffect(() => {
    const anims = dots.map((d, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 150),
          Animated.timing(d, { toValue: 1, duration: 350, useNativeDriver: Platform.OS !== 'web' }),
          Animated.timing(d, { toValue: 0.3, duration: 350, useNativeDriver: Platform.OS !== 'web' }),
        ]),
      ),
    );
    anims.forEach((a) => a.start());
    return () => anims.forEach((a) => a.stop());
  }, []);
  return (
    <View style={[styles.row, styles.rowAi]}>
      <View style={styles.aiAvatar}>
        <Ionicons name="sparkles" size={15} color={colors.lime} />
      </View>
      <View style={[styles.bubble, styles.bubbleAi, styles.typing]}>
        {dots.map((d, i) => (
          <Animated.View key={i} style={[styles.dot, { opacity: d }]} />
        ))}
        <Text style={styles.typingText}>My Mechanic AI is typing…</Text>
      </View>
    </View>
  );
}

function MechanicResult({ mechanic: m, onBook }) {
  const canBook = !!m.id && m.bookable;
  return (
    <Card style={styles.mechCard}>
      <View style={styles.mechTop}>
        <Avatar name={m.name} color={m.color} size={46} />
        <View style={{ flex: 1 }}>
          <RawText style={styles.mechName} numberOfLines={1}>
            {m.name}
          </RawText>
          {!!m.specialization && <Text style={styles.mechSpec}>{m.specialization}</Text>}
          {m.rating !== null ? (
            <View style={{ marginTop: 5 }}>
              <Rating value={m.rating} count={m.reviewCount ?? undefined} />
            </View>
          ) : (
            <Badge label="New" tone="neutral" />
          )}
        </View>
      </View>
      {!!m.address && (
        <View style={styles.mechLine}>
          <Ionicons name="location-outline" size={15} color={colors.muted} />
          <RawText style={styles.mechLineText}>{m.address}</RawText>
        </View>
      )}
      {m.experience !== null && m.experience > 0 && (
        <View style={styles.mechLine}>
          <Ionicons name="briefcase-outline" size={15} color={colors.muted} />
          <Text style={styles.mechLineText}>{`${m.experience} years experience`}</Text>
        </View>
      )}
      {m.services.length > 0 ? (
        <View style={styles.services}>
          {m.services.map((s, i) => (
            <View key={s.id || i} style={styles.serviceRow}>
              <View style={{ flex: 1 }}>
                <RawText style={styles.serviceName}>{s.name}</RawText>
                <RawText style={styles.serviceMeta}>
                  {[s.duration !== null ? `${s.duration} ${translate('min')}` : null]
                    .filter(Boolean)
                    .join(' · ')}
                </RawText>
              </View>
              {canBook && !!s.id && (
                <Button label="Book" size="small" variant="secondary" icon="calendar-outline" onPress={() => onBook(m.id, s.id)} />
              )}
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.noServices}>This mechanic has not added services yet.</Text>
      )}
      {canBook ? (
        <Button
          label="Book an appointment"
          icon="calendar-outline"
          full
          style={{ marginTop: 12 }}
          onPress={() => onBook(m.id, m.services[0]?.id)}
        />
      ) : (
        <Text style={styles.noServices}>Online booking is not available for this mechanic.</Text>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: spacing.xl, paddingBottom: 24, width: '100%', maxWidth: 760, alignSelf: 'center' },
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginBottom: 12 },
  rowMine: { justifyContent: 'flex-end' },
  rowAi: { justifyContent: 'flex-start' },
  aiAvatar: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: { maxWidth: '82%', paddingHorizontal: 14, paddingVertical: 11, borderRadius: radius.lg },
  bubbleAi: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, borderBottomLeftRadius: 6, ...shadow },
  bubbleMine: { backgroundColor: colors.ink, borderBottomRightRadius: 6 },
  bubbleText: { color: colors.text, fontSize: 14, lineHeight: 21 },
  typing: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.limeDark },
  typingText: { color: colors.muted, fontSize: 11, marginLeft: 6 },
  suggestions: { marginLeft: 38, marginBottom: 14, gap: 8 },
  suggestionTitle: { color: colors.muted, fontSize: 11, fontWeight: '800', letterSpacing: 0.8, textTransform: 'uppercase' },
  suggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    paddingHorizontal: 13,
    paddingVertical: 11,
  },
  suggestionText: { flex: 1, color: colors.text, fontSize: 13, fontWeight: '600' },
  pressed: { opacity: 0.8, transform: [{ scale: 0.99 }] },
  mechanicList: { marginLeft: 38, marginBottom: 12, gap: 10 },
  recommendTitle: { color: colors.muted, fontSize: 11, fontWeight: '800', letterSpacing: 0.8, textTransform: 'uppercase' },
  mechCard: { padding: 15 },
  mechTop: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  mechName: { color: colors.text, fontSize: 16, fontWeight: '800' },
  mechSpec: { color: colors.muted, fontSize: 12, marginTop: 2 },
  mechLine: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10 },
  mechLineText: { color: colors.muted, fontSize: 12, flex: 1 },
  services: { marginTop: 12, borderTopWidth: 1, borderTopColor: colors.line },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  serviceName: { color: colors.text, fontSize: 13, fontWeight: '700' },
  serviceMeta: { color: colors.muted, fontSize: 12, marginTop: 2 },
  noServices: { color: colors.muted, fontSize: 12, marginTop: 10 },
  composer: {
    paddingHorizontal: spacing.lg,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: colors.canvas,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.lg,
    paddingLeft: 14,
    paddingRight: 6,
    paddingVertical: 6,
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
  },
  input: { flex: 1, minHeight: 38, maxHeight: 120, color: colors.text, fontSize: 14, paddingVertical: 9, outlineStyle: 'none' },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendDisabled: { opacity: 0.45 },
  counter: { color: colors.muted, fontSize: 11, textAlign: 'right', marginTop: 4, maxWidth: 760, alignSelf: 'center', width: '100%' },
});
