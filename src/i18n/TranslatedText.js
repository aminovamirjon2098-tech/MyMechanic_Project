/* Text that follows the selected app language (EN / RU / UZ). */
import React, { forwardRef } from 'react';
import { Text } from 'react-native';
import { translateChildren, useLanguage } from './i18n';

const TranslatedText = forwardRef(function TranslatedText({ children, ...props }, ref) {
  const language = useLanguage();
  return (
    <Text ref={ref} {...props}>
      {translateChildren(children, language)}
    </Text>
  );
});

export default TranslatedText;
