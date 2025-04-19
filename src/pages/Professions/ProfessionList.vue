<script setup>
import { ref, computed, watchEffect } from 'vue'
import ProfessionCard from '@/components/Professions/ProfessionCard.vue'
import { useProfessions } from '@/composables/useProfessions.js'

const searchTerm = ref('')
const sortMode = ref('normal') // 'normal' | 'desc' | 'asc'
const { data, loading, error } = useProfessions()

// DEBUG opcional
watchEffect(() => {
  console.log('Profesiones cargadas:', data.value)
})

function toggleSortMode() {
  if (sortMode.value === 'normal') sortMode.value = 'desc'
  else if (sortMode.value === 'desc') sortMode.value = 'asc'
  else sortMode.value = 'normal'
}

const filteredProfessions = computed(() => {
  if (!data.value) return []

  const term = searchTerm.value.toLowerCase().trim()
  let professions = data.value

  if (term) {
    professions = professions.filter(p =>
      p.profession_name.toLowerCase().includes(term)
    )
  }

  if (sortMode.value === 'desc') {
    professions = [...professions].sort((a, b) =>
      parseFloat(b.current_salary) - parseFloat(a.current_salary)
    )
  } else if (sortMode.value === 'asc') {
    professions = [...professions].sort((a, b) =>
      parseFloat(a.current_salary) - parseFloat(b.current_salary)
    )
  }

  return professions
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

    <button @click="toggleSortMode" class="sort-button">
      Ordenar por salario:
      <span v-if="sortMode === 'normal'">Normal</span>
      <span v-else-if="sortMode === 'desc'">⬇️ Mayor a menor</span>
      <span v-else>⬆️ Menor a mayor</span>
    </button>

    <div v-if="loading">Cargando...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="professions-container">
      <ProfessionCard
        v-for="profession in filteredProfessions"
        :key="profession.id"
        :profession="profession"
      />
      <div v-if="filteredProfessions.length === 0">
        No se encontraron profesiones.
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  display: block;
  margin: 20px auto 10px;
  padding: 10px;
  width: 80%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
}

.sort-button {
  display: block;
  margin: 0 auto 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #eee;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.sort-button:hover {
  background-color: #ccc;
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
