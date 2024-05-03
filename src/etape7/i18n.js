import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18next
  .use(initReactI18next)
  .use(Backend)
  .init({
    interpolation: { escapeValue: false },
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    backend: {
      // for all available options read the backend's repository readme file
      loadPath: '/locales/{{lng}}/translation.json'
    }
  });

export default i18next;