/* TextInput whose placeholder follows the selected app language. */
import React, { forwardRef } from 'react';
import { TextInput } from 'react-native';
import { t, useLanguage } from './i18n';

const TranslatedTextInput = forwardRef(function TranslatedTextInput({ placeholder, ...props }, ref) {
  const language = useLanguage();
  return <TextInput ref={ref} {...props} placeholder={t(placeholder, language)} />;
});

export default TranslatedTextInput;
