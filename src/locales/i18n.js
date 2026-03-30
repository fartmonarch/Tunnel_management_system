import { createI18n } from "vue-i18n";
import zh from "./lang/zh.js";
import en from "./lang/en.js";

const messages = {
	zh,
	en,
};

const i18n = createI18n({
	legacy: false,
	locale: localStorage.getItem("lang") || "zh",
	fallbackLocale: "zh",
	globalInjection: true,
	messages,
});

export default i18n;
