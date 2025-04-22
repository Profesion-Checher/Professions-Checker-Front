<script setup>
import { ref } from 'vue'
import axios from 'axios'

const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  company: '',
  profession: '',
  salary: null
})

const error = ref(null)
const success = ref(false)

const API_USER_REGISTER = import.meta.env.VITE_API_USER_REGISTER

const registerUser = async () => {
  error.value = null
  success.value = false
  try {
    const response = await axios.post(API_USER_REGISTER, form.value)
    success.value = true
    console.log('Usuario registrado:', response.data)
  } catch (err) {
    if (err.response && err.response.data) {
      const errors = Object.values(err.response.data).flat()
      error.value = errors.join(', ')
    } else {
      error.value = 'Error al registrar usuario'
    }
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10">
    <h2 class="text-2xl font-bold mb-4">Registro de Usuario</h2>
    <form @submit.prevent="registerUser">
      <input v-model="form.first_name" type="text" placeholder="Nombre" class="input" required />
      <input v-model="form.last_name" type="text" placeholder="Apellido" class="input" required />
      <input v-model="form.email" type="email" placeholder="Correo electrónico" class="input" required />
      <input v-model="form.password" type="password" placeholder="Contraseña" class="input" required />
      <input v-model="form.company" type="text" placeholder="Empresa (opcional)" class="input" />
      <input v-model="form.profession" type="text" placeholder="Profesión (opcional)" class="input" />
      <input v-model="form.salary" type="number" placeholder="Salario (opcional)" class="input" />
      <button type="submit" class="btn">Registrarse</button>
    </form>
    <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
    <div v-if="success" class="text-green-500 mt-2">¡Usuario registrado con éxito!</div>
  </div>
</template>


<style scoped>
.input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.btn {
  background-color: #4f46e5;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
