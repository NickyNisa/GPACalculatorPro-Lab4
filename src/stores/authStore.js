import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const isLoggedIn = ref(false)
    const username = ref('')

    const login = (name) => {
      isLoggedIn.value = true
      username.value = name
    }

    const logout = () => {
      isLoggedIn.value = false
      username.value = ''
    }

    return { isLoggedIn, username, login, logout }
  },
  {
    persist: true,
  },
)
