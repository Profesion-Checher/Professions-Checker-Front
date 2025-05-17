<script setup>
import { ref, computed, watchEffect } from 'vue'
import ProfessionCard from '@/components/Professions/ProfessionCard.vue'
import { useProfessions } from '@/composables/useProfessions.js'

const searchTerm = ref('')
const minSalary = ref('')
const maxSalary = ref('')
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

// Filtro de profesiones con búsqueda por nombre, salario mínimo y máximo
const filteredProfessions = computed(() => {
  if (!data.value) return []

  const term = searchTerm.value.toLowerCase().trim()
  let professions = data.value

  // Filtro por nombre de profesión
  if (term) {
    professions = professions.filter(p =>
      p.profession_name.toLowerCase().includes(term)
    )
  }

  // Filtro por salario mínimo y máximo
  if (minSalary.value) {
    professions = professions.filter(p =>
      parseFloat(p.current_salary) >= parseFloat(minSalary.value)
    )
  }

  if (maxSalary.value) {
    professions = professions.filter(p =>
      parseFloat(p.current_salary) <= parseFloat(maxSalary.value)
    )
  }

  // Orden por salario
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
    <!-- Panel de filtros como submenú -->
    <div class="filters-panel">
      <!-- Buscador por nombre -->
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Buscar profesión..."
        class="search-bar"
      />

      <!-- Filtro por salario mínimo y máximo -->
      <div class="salary-filter">
        <input
          v-model="minSalary"
          type="number"
          placeholder="Salario mínimo"
          class="salary-input"
          min="0"
        />
        <input
          v-model="maxSalary"
          type="number"
          placeholder="Salario máximo"
          class="salary-input"
          min="0"
        />
      </div>

      <!-- Botón para ordenar por salario -->
      <button @click="toggleSortMode" class="sort-button">
        Ordenar por salario:
        <span v-if="sortMode === 'normal'">🔁 Normal</span>
        <span v-else-if="sortMode === 'desc'">⬇️ Mayor a menor</span>
        <span v-else>⬆️ Menor a mayor</span>
      </button>
    </div>

    <!-- Mostrar profesiones -->
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
/* Contenedor del submenú */
.filters-panel {
  background-color: white;
  padding: 20px;
  margin: 20px auto;
  max-width: 700px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

/* Buscador */
.search-bar {
  display: block;
  margin: 0 auto 15px;
  padding: 10px 16px;
  width: 95%;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 16px;
  background-color: #f9fafb;
  color: #1f2937;
}

/* Filtro de salario */
.salary-filter {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 15px;
}

.salary-input {
  flex: 1 1 45%;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  font-size: 16px;
  background-color: #f9fafb;
  color: #111827;
}

/* Botón de orden */
.sort-button {
  display: block;
  width: 100%;
  padding: 10px 24px;
  font-size: 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.sort-button:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
}

/* Contenedor general de tarjetas */
.professions-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
}
</style>
