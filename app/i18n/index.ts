import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import fr from './fr.json';

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
	fallbackLng: 'fr',
	resources: {
		fr: { translation: fr },
		en: { translation: en },
	},
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
