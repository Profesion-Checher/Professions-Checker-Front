<script setup>
import ProfessionBarView from '@/components/ProfessionBarView.vue'

import { ref, onMounted } from 'vue'

const data = ref(null)
const loading = ref(true)
const error = ref(null)

const API_PROFESSIONS = import.meta.env.VITE_API_PROFESSIONS_URL

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
  <div v-else class="professions-container">
    <ProfessionBarView v-for="profession in data" :key="profession.pk" :profession="profession" />
   
  </div>
</template>


<style scoped>
</style>
