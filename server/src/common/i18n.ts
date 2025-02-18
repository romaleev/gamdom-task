import i18n from 'i18next'
import translationEN from '#common/locales/en'

const resources = {
	en: {
		translation: translationEN,
	},
}

i18n.init({
	resources,
	lng: 'en', // default language
	fallbackLng: 'en', // fallback language if key is missing
	interpolation: {
		escapeValue: false, // react already handles escaping
	},
	// Prevent returning null or empty strings for missing keys
	returnNull: false,
	returnEmptyString: false,
	parseMissingKeyHandler: (key) => {
		throw new Error(`Missing locale value for key: '${key}'`)
	},
})

export default i18n
