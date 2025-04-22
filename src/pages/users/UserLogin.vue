<script setup>
import { ref } from 'vue'
import api from '@/services/axios.js'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth.js'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const { login } = useAuth()

async function handleLogin() {
  try {
    const { data } = await api.post(
      import.meta.env.VITE_API_USER_LOGIN,
      { email: email.value, password: password.value }
    )
    // Guardar tokens y marcar autenticado
    login(data.access, data.refresh)
    router.push('/profile')
  } catch {
    error.value = 'Correo o contraseña incorrectos'
  }
}
</script>

<template>
  <div class="login-form">
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Correo" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit">Iniciar sesión</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 80px auto;
  padding: 30px;
  background: #fff;
  border-radius: 10px;
}
input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 5px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
