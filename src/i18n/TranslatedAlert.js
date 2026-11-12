/* Alert with translated texts. On the web build it falls back to window.alert/confirm
   so confirmation buttons (e.g. "Done") still run their callbacks. */
import { Alert, Platform } from 'react-native';
import { t } from './i18n';

const TranslatedAlert = {
  alert(title, message, buttons, options) {
    const tt = t(title);
    const tm = typeof message === 'string' ? message.split('\n').map((line) => t(line)).join('\n') : message;
    const tb = buttons?.map((b) => ({ ...b, text: t(b.text) }));
    if (Platform.OS === 'web') {
      const text = [tt, tm].filter(Boolean).join('\n\n');
      const list = tb ?? [];
      const cancel = list.find((b) => b.style === 'cancel');
      const actions = list.filter((b) => b.style !== 'cancel');
      if (cancel && actions.length) {
        if (typeof window !== 'undefined' && window.confirm(text)) actions[actions.length - 1].onPress?.();
        else cancel.onPress?.();
      } else {
        if (typeof window !== 'undefined') window.alert(text);
        actions[actions.length - 1]?.onPress?.();
      }
      return;
    }
    Alert.alert(tt, tm, tb, options);
  },
};

export default TranslatedAlert;
