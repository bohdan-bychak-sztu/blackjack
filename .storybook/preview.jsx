import React, { Suspense, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo"
    }
  },

  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      defaultValue: 'uk',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'uk', right: '🇺🇦', title: 'Українська' },
          { value: 'en', right: '🇺🇸', title: 'English' },
          { value: 'es', right: 'es', title: 'Espanol' },
          { value: 'zh', right: 'zh', title: 'Chinese' },
        ],
      },
    },
  },

  decorators: [
    (Story, context) => {
      const { locale } = context.globals;

      useEffect(() => {
        i18n.changeLanguage(locale);
      }, [locale]);

      return (
          <Suspense fallback={<div>Завантаження перекладів...</div>}>
            <I18nextProvider i18n={i18n}>
              <Story />
            </I18nextProvider>
          </Suspense>
      );
    },
  ],
};

export default preview;