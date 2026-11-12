/* My Mechanic — Settings: one place for language, profile/account management and sign-out.
   Role-aware (admin / mechanic / client). Uses only existing Store actions and screens:
   - language: i18n setLanguage (applies to the whole app, persisted in AsyncStorage 'mm.language.v1')
   - profile:  ClientProfileForm (client), Profile tab (mechanic), ChangePassword (all roles)
   - sign out: Store.signOut → backend.signOut (supabase.auth.signOut) → RootNavigator shows Sign in */
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Badge, Button, Card, IconButton, InfoBanner, Screen, ScreenTitle, SectionHeader } from '../components/ui';
import { LANGUAGES, setLanguage, useLanguage } from '../i18n/i18n';
import Text from '../i18n/TranslatedText';
import { useStore } from '../store/StoreContext';
import { colors, radius } from '../theme';

const LANGUAGE_NAMES = { en: 'English', ru: 'Русский', uz: 'O‘zbekcha' };
const ROLE_LABEL = { admin: 'Admin', mechanic: 'Mechanic', client: 'Driver' };
const ROLE_TONE = { admin: 'orange', mechanic: 'blue', client: 'green' };

function Row({ icon, label, value, onPress, danger }) {
  const content = (
    <>
      <View style={[styles.rowIcon, danger && { backgroundColor: colors.softRed }]}>
        <Ionicons name={icon} size={19} color={danger ? colors.red : colors.ink} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.rowLabel, danger && { color: colors.red }]}>{label}</Text>
        {!!value && <Text style={styles.rowValue}>{value}</Text>}
      </View>
      {onPress && <Ionicons name="chevron-forward" size={17} color={colors.faint} />}
    </>
  );
  return onPress ? (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}>
      {content}
    </Pressable>
  ) : (
    <View style={styles.row}>{content}</View>
  );
}

export function SettingsScreen({ navigation }) {
  const { state, signOut, backendMode, realtimeStatus } = useStore();
  const language = useLanguage();
  const [signingOut, setSigningOut] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const session = state.session;
  const role = session?.role;
  const account =
    role === 'admin'
      ? state.admins.find((a) => a.id === session.userId)
      : role === 'mechanic'
        ? state.mechanics.find((m) => m.id === session.userId)
        : state.clients.find((c) => c.id === session?.userId);

  const doSignOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    // Store.signOut: await supabase.auth.signOut() → clear user/session → reset navigation to Sign in.
    await signOut();
  };
  // In-app confirmation (browser confirm() dialogs are blocked inside embedded previews/iframes).
  const confirmSignOut = () => setConfirmVisible(true);

  return (
    <Screen edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <ScreenTitle
          eyebrow="ACCOUNT"
          title="Settings"
          subtitle="Language, profile and account in one place."
          right={<IconButton icon="close" label="Close" onPress={() => navigation.goBack()} />}
        />

        {/* Profile */}
        <Card style={styles.profileCard}>
          <Avatar name={account?.name || session?.name || '?'} color={account?.color} size={58} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name} numberOfLines={1}>
              {account?.name || session?.name || '—'}
            </Text>
            <Text style={styles.contact} numberOfLines={1}>
              {account?.email || session?.email || ''}
            </Text>
            {!!account?.phone && (
              <Text style={styles.contact} numberOfLines={1}>
                {account.phone}
              </Text>
            )}
            <View style={{ marginTop: 8, flexDirection: 'row' }}>
              <Badge label={ROLE_LABEL[role] || 'Driver'} tone={ROLE_TONE[role] || 'neutral'} />
            </View>
          </View>
        </Card>

        <SectionHeader title="Profile & personal data" />
        <Card style={styles.group}>
          {role === 'client' && (
            <Row
              icon="person-circle-outline"
              label="Edit profile"
              value="Name, phone, address, preferred contact"
              onPress={() => navigation.navigate('ClientProfileForm')}
            />
          )}
          {role === 'client' && (
            <Row icon="car-sport-outline" label="Garage" value="Your vehicles" onPress={() => navigation.navigate('ClientMain', { screen: 'Garage' })} />
          )}
          {role === 'mechanic' && (
            <Row
              icon="construct-outline"
              label="Edit public profile"
              value="Specialization, experience, address, bio"
              onPress={() => navigation.navigate('MechanicMain', { screen: 'Profile' })}
            />
          )}
          {role === 'mechanic' && (
            <Row
              icon="calendar-outline"
              label="Schedule"
              value="Open or close time slots"
              onPress={() => navigation.navigate('MechanicMain', { screen: 'Schedule' })}
            />
          )}
          {role === 'admin' && (
            <Row
              icon="people-outline"
              label="User management"
              value="Drivers and mechanics"
              onPress={() => navigation.navigate('AdminMain', { screen: 'Users' })}
            />
          )}
          <Row icon="lock-closed-outline" label="Change password" onPress={() => navigation.navigate('ChangePassword')} />
        </Card>

        <SectionHeader title="App language" subtitle="Applies to the whole app and is remembered on this device." />
        <Card style={styles.group}>
          {LANGUAGES.map((code) => {
            const active = code === language;
            return (
              <Pressable
                key={code}
                accessibilityRole="radio"
                accessibilityState={{ selected: active }}
                onPress={() => setLanguage(code)}
                style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}
              >
                <View style={[styles.rowIcon, active && { backgroundColor: colors.lime }]}>
                  <Ionicons name="globe-outline" size={19} color={colors.ink} />
                </View>
                <View style={{ flex: 1 }}>
                  {/* Language names are shown in their own language on purpose (not translated). */}
                  <Text style={styles.rowLabel}>{LANGUAGE_NAMES[code]}</Text>
                </View>
                <Ionicons
                  name={active ? 'checkmark-circle' : 'ellipse-outline'}
                  size={21}
                  color={active ? colors.limeDark : colors.faint}
                />
              </Pressable>
            );
          })}
        </Card>

        <SectionHeader title="Connection" />
        <Card style={styles.group}>
          <Row
            icon="cloud-done-outline"
            label={backendMode === 'supabase' ? 'Online (Supabase)' : 'Local demo mode'}
            value={backendMode === 'supabase' ? (realtimeStatus === 'connected' ? 'Live updates are on' : 'Connecting…') : 'Data stays on this device'}
          />
          {role === 'mechanic' && (
            <Row
              icon="navigate-outline"
              label="Workshop location"
              value="Fixed coordinates on the map"
              onPress={() => navigation.navigate(role === 'mechanic' ? 'MechanicMain' : 'ClientMain', { screen: 'LiveMap' })}
            />
          )}
        </Card>

        {account?.status === 'blocked' && (
          <InfoBanner tone="red" message="Your account is blocked. Contact an administrator." />
        )}

        <Button
          label="Sign out"
          icon="log-out-outline"
          variant="danger"
          full
          size="large"
          loading={signingOut}
          style={{ marginTop: 22 }}
          onPress={confirmSignOut}
        />
      </ScrollView>
      <Modal visible={confirmVisible} transparent animationType="fade" onRequestClose={() => setConfirmVisible(false)}>
        <View style={styles.backdrop}>
          <Card style={styles.dialog}>
            <View style={[styles.rowIcon, { backgroundColor: colors.softRed, marginBottom: 12 }]}>
              <Ionicons name="log-out-outline" size={19} color={colors.red} />
            </View>
            <Text style={styles.dialogTitle}>Sign out?</Text>
            <Text style={styles.dialogText}>You will need your email and password to sign in again.</Text>
            <View style={styles.dialogActions}>
              <View style={{ flex: 1 }}>
                <Button label="Cancel" variant="secondary" full disabled={signingOut} onPress={() => setConfirmVisible(false)} />
              </View>
              <View style={{ flex: 1 }}>
                <Button label="Sign out" variant="danger" icon="log-out-outline" full loading={signingOut} onPress={doSignOut} />
              </View>
            </View>
          </Card>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20, paddingBottom: 40, width: '100%', maxWidth: 680, alignSelf: 'center' },
  profileCard: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 },
  name: { color: colors.text, fontSize: 18, fontWeight: '800' },
  contact: { color: colors.muted, fontSize: 12, marginTop: 2 },
  group: { padding: 4 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 12, paddingVertical: 12, borderRadius: radius.md },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.canvas,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: { color: colors.text, fontSize: 14, fontWeight: '700' },
  rowValue: { color: colors.muted, fontSize: 12, marginTop: 2 },
  backdrop: { flex: 1, backgroundColor: 'rgba(22,34,27,0.45)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  dialog: { width: '100%', maxWidth: 380, padding: 20 },
  dialogTitle: { color: colors.text, fontSize: 18, fontWeight: '800' },
  dialogText: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 6 },
  dialogActions: { flexDirection: 'row', gap: 10, marginTop: 18 },
});
