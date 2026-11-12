/* My Mechanic — app language (EN / RU / UZ). */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSyncExternalStore } from 'react';
import { dictionary, patterns } from './dictionary';

const STORAGE_KEY = 'mm.language.v1';
export const LANGUAGES = ['en', 'ru', 'uz'];
export const LANGUAGE_LABELS = { en: 'EN', ru: 'RU', uz: 'UZ' };

let current = 'en';
const listeners = new Set();

AsyncStorage.getItem(STORAGE_KEY)
  .then((saved) => {
    if (saved && LANGUAGES.includes(saved) && saved !== current) {
      current = saved;
      listeners.forEach((l) => l());
    }
  })
  .catch(() => {});

export function getLanguage() {
  return current;
}

export function setLanguage(language) {
  if (!LANGUAGES.includes(language) || language === current) return;
  current = language;
  AsyncStorage.setItem(STORAGE_KEY, language).catch(() => {});
  listeners.forEach((l) => l());
}

export function cycleLanguage() {
  setLanguage(LANGUAGES[(LANGUAGES.indexOf(current) + 1) % LANGUAGES.length]);
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useLanguage() {
  return useSyncExternalStore(subscribe, getLanguage, getLanguage);
}

const column = { ru: 0, uz: 1 };

/** Translates an English UI string; keeps surrounding whitespace/punctuation. */
export function t(text, language = current) {
  if (typeof text !== 'string' || language === 'en' || !text.trim()) return text;
  const col = column[language];
  const exact = dictionary[text];
  if (exact) return exact[col];
  const match = text.match(/^(\s*[·•\-–—(]?\s*)(.*?)(\s*[·:,.)]?\s*)$/s);
  if (match) {
    const core = dictionary[match[2]];
    if (core) return match[1] + core[col] + match[3];
  }
  for (const [regex, ru, uz] of patterns) {
    const m = text.match(regex);
    if (m) return (language === 'ru' ? ru : uz)(...m.slice(1));
  }
  return text;
}

/** Translates a React children value (strings, numbers, arrays). */
export function translateChildren(children, language = current) {
  if (language === 'en') return children;
  if (typeof children === 'string') return t(children, language);
  if (Array.isArray(children)) {
    const allPrimitive = children.every((c) => typeof c === 'string' || typeof c === 'number');
    if (allPrimitive && children.length > 1) {
      const joined = children.join('');
      const whole = t(joined, language);
      if (whole !== joined) return whole;
    }
    return children.map((c) => (typeof c === 'string' ? t(c, language) : c));
  }
  return children;
}

export function yandexLang(language = current) {
  return language === 'ru' ? 'ru_RU' : language === 'uz' ? 'uz_UZ' : 'en_US';
}
