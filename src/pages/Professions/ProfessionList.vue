<script setup>
import { ref, computed } from 'vue'
import ProfessionCard from '@/components/Professions/ProfessionCard.vue'
import { useProfessions } from '@/composables/useProfessions.js'

const searchTerm = ref('')
const { data, loading, error } = useProfessions()

const filteredProfessions = computed(() => {
  const term = searchTerm.value.toLowerCase().trim()
  if (!term) return data.value
  return data.value.filter(p =>
    p.profession_name.toLowerCase().includes(term)
  )
})

</script>

<template>
  <div>
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Buscar profesión..."
      class="search-bar"
    />

    <div v-if="loading">Cargando...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="professions-container">
      <ProfessionCard
        v-for="profession in filteredProfessions"
        :key="profession.id"
        :profession="profession"
      />
      <div v-if="filteredProfessions.length === 0">No se encontraron profesiones.</div>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  display: block;
  margin: 20px auto;
  padding: 10px;
  width: 80%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
}

.professions-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
}
</style>
