import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export default defineStore('theme', () => {
  const isDark = ref(localStorage.getItem('theme') === 'dark')

  const themeClass = computed(() => (isDark.value ? 'dark' : 'light'))

  const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  return { isDark, themeClass, toggleTheme }
})
