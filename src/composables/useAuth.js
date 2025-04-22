import { ref, watchEffect } from 'vue'

// Estado reactivo global
const isAuthenticated = ref(!!localStorage.getItem('access'))

// Si alguien modifica localStorage manualmente, mantenemos el ref sincronizado
watchEffect(() => {
  isAuthenticated.value = !!localStorage.getItem('access')
})

function login(accessToken, refreshToken) {
  localStorage.setItem('access', accessToken)
  localStorage.setItem('refresh', refreshToken)
  isAuthenticated.value = true
}

function logout() {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  isAuthenticated.value = false
}

export function useAuth() {
  return { isAuthenticated, login, logout }
}
