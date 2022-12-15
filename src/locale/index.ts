import { createI18n } from 'vue-i18n';
import zhLocale from './zh-CN';
import enLocale from './en-GB';

const messages = {
    en: {
        ...enLocale
    },
    zh: {
        ...zhLocale
    }
};

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem("locale") || "zh",
    globalInjection: true,
    messages
});

export default i18n