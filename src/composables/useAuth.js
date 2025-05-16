import { ref, watchEffect } from 'vue'

const isAuthenticated = ref(false)

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (_) {
    return null
  }
}

function isAccessTokenValid() {
  const token = localStorage.getItem('access')
  if (!token) return false
  const payload = parseJwt(token)
  if (!payload || !payload.exp) return false
  return Date.now() < payload.exp * 1000
}

function syncAuthStatus() {
  isAuthenticated.value = isAccessTokenValid()
}

// Ejecutar al cargar el archivo
syncAuthStatus()

function login(accessToken, refreshToken) {
  localStorage.setItem('access', accessToken)
  localStorage.setItem('refresh', refreshToken)
  syncAuthStatus()
}

function logout() {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  isAuthenticated.value = false
}

export function useAuth() {
  return { isAuthenticated, login, logout }
}
