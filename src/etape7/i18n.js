import i18next from 'i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false },
    lng: 'en',
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        translation: {
          test: "This is a test",
          manageTasks: "Managing tasks (step {{step_number}})"
        }
      },
      fr: {
        translation: {
          test: "Ceci est un test",
          manageTasks: "Gestion des tâches (étape {{step_number}})"
        }
      }
    }
  });

//TODO: to remove
console.log(i18next.t("test"));

export default i18next;