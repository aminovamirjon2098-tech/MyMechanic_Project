/* Compact EN / RU / UZ switch that matches the existing pill styling. */
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';
import { LANGUAGES, LANGUAGE_LABELS, setLanguage, useLanguage } from './i18n';

export function LanguageSwitcher({ dark = false, style }) {
  const language = useLanguage();
  return (
    <View style={[styles.row, dark ? styles.rowDark : styles.rowLight, style]} accessibilityRole="tablist">
      {LANGUAGES.map((code) => {
        const active = code === language;
        return (
          <Pressable
            key={code}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => setLanguage(code)}
            hitSlop={4}
            style={[styles.option, active && (dark ? styles.activeDark : styles.activeLight)]}
          >
            <Text
              style={[
                styles.label,
                { color: active ? (dark ? colors.ink : colors.lime) : dark ? '#C5CEC8' : colors.muted },
              ]}
            >
              {LANGUAGE_LABELS[code]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', borderRadius: 99, padding: 3, gap: 2 },
  rowDark: { backgroundColor: '#26352C' },
  rowLight: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, height: 42, paddingHorizontal: 4 },
  option: { paddingHorizontal: 8, paddingVertical: 5, borderRadius: 99 },
  activeDark: { backgroundColor: colors.lime },
  activeLight: { backgroundColor: colors.ink },
  label: { fontSize: 10, fontWeight: '800', letterSpacing: 0.6 },
});
