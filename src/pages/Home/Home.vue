<script setup>
import ProfessionBarView from '@/components/Professions/ProfessionBarView.vue'
import { useProfessions } from '@/composables/useProfessions.js'

const { data, loading, error } = useProfessions()
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
