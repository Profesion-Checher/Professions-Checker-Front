<script setup>
import ProfessionCard from '@/components/Professions/ProfessionCard.vue'
import { useProfessions } from '@/composables/useProfessions.js'

const { data, loading, error } = useProfessions()

</script>

<template>
  <div v-if="loading">Cargando...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
  <div v-else class="professions-container">
    <ProfessionCard v-for="profession in data" :key="profession.id" :profession="profession" />
  </div>
</template>

<style scoped>
.professions-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
}
</style>
