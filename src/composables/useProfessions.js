import { ref, onMounted } from 'vue'

const API_PROFESSIONS = import.meta.env.VITE_API_PROFESSIONS_URL

export function useProfessions() {
  const data = ref([])
  const loading = ref(true)
  const error = ref(null)

  const fetchProfessions = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(API_PROFESSIONS)
      if (!response.ok) throw new Error('Error al obtener profesiones.')

      const json = await response.json()
      if (!Array.isArray(json)) {
        throw new Error('La respuesta no es un arreglo de profesiones.')
      }

      data.value = json
    } catch (err) {
      console.error(err)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchProfessions)

  return { data, loading, error }
}
