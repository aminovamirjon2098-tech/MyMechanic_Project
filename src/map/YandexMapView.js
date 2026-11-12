/* Native (iOS / Android) Yandex map: same HTML map as the web build, hosted in a WebView. */
import React, { useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLanguage } from '../i18n/i18n';
import { createYandexHtml } from './yandexHtml';

export default function YandexMapView({
  locations,
  apiKey,
  selectedId,
  placing,
  fitSignal,
  onSelect,
  onMapPress,
  onReady,
  onError,
}) {
  const language = useLanguage();
  const webview = useRef(null);
  const ready = useRef(false);
  const html = useMemo(() => createYandexHtml(apiKey, language), [apiKey, language]);
  const latest = useRef({});
  latest.current = { locations, selectedId, placing, onSelect, onMapPress, onReady, onError };

  const post = (data) => {
    if (!ready.current) return;
    webview.current?.postMessage(JSON.stringify(data));
  };

  useEffect(() => {
    post({ type: 'locations', locations, selectedId });
  }, [locations, selectedId]);
  useEffect(() => {
    post({ type: 'placing', value: !!placing });
  }, [placing]);
  useEffect(() => {
    if (fitSignal) post({ type: 'fit' });
  }, [fitSignal]);

  return (
    <View style={styles.container}>
      <WebView
        ref={webview}
        originWhitelist={['*']}
        source={{ html, baseUrl: 'https://yandex.ru' }}
        javaScriptEnabled
        domStorageEnabled
        geolocationEnabled={false}
        setSupportMultipleWindows={false}
        style={styles.web}
        onLoadStart={() => {
          ready.current = false;
        }}
        onMessage={(event) => {
          try {
            const data = JSON.parse(event.nativeEvent.data);
            const cb = latest.current;
            if (data.type === 'ready') {
              ready.current = true;
              cb.onReady?.();
              post({ type: 'locations', locations: cb.locations, selectedId: cb.selectedId });
              post({ type: 'placing', value: !!cb.placing });
            }
            if (data.type === 'select') cb.onSelect?.(data.profileId);
            if (data.type === 'mapPress') cb.onMapPress?.(Number(data.latitude), Number(data.longitude));
            if (data.type === 'error') cb.onError?.(data.message);
          } catch {}
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, overflow: 'hidden' },
  web: { flex: 1, backgroundColor: '#e9ece6' },
});
