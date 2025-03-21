import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export default defineStore('i18n', () => {
  const locale = ref(localStorage.getItem('lang') || 'es')

  const messages = {
    es: {
      hello: 'Hola Mundo',
      toggle_lang: 'Cambiar a Inglés',
    },
    en: {
      hello: 'Hello World',
      toggle_lang: 'Switch to Spanish',
    },
  }

  const currentMessages = computed(() => messages[locale.value])

  const toggleLanguage = () => {
    locale.value = locale.value === 'es' ? 'en' : 'es'
    localStorage.setItem('lang', locale.value)
  }

  return { locale, currentMessages, toggleLanguage }
})
