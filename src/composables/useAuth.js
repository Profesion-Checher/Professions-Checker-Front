import { ref } from 'vue'

const isAuthenticated = ref(false)

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (_) {
    return null
  }
}

const isAccessTokenValid  = () => {
  const token = localStorage.getItem('access')
  if (!token) return false
  const payload = parseJwt(token)
  if (!payload || !payload.exp) return false
  return Date.now() < payload.exp * 1000
}

export const syncAuthStatus  = () => {
  isAuthenticated.value = isAccessTokenValid()
}

const login = (accessToken, refreshToken) => {
  localStorage.setItem('access', accessToken)
  localStorage.setItem('refresh', refreshToken)
  syncAuthStatus()
}

const logout  = () => {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  isAuthenticated.value = false
}

export const useAuth  = () => {
  return { isAuthenticated, login, logout, syncAuthStatus }
}
