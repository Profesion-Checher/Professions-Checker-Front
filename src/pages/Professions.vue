<script setup>
import { ref, onMounted } from 'vue'

const data = ref(null)
const loading = ref(true)
const error = ref(null)

const API_PROFESSIONS = import.meta.VITE_API_PROFESSIONS_URL

const datos_django = async () => {
  try {
    const response = await fetch(API_PROFESSIONS)
    if (!response.ok) throw new Error('Error al obtener datos')

    data.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false;
  }
} 
onMounted(datos_django)

</script>

<template>
  <div v-if="loading">Cargando...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
  <pre v-else> {{ data }} </pre>
</template>

<style scoped>
</style>
