import { ref, onMounted } from 'vue'

const API_PROFESSIONS = import.meta.env.VITE_API_PROFESSIONS_URL

export function useProfessions () {
  
  const data = ref(null)
  const loading = ref(true)
  const error = ref(null)


  const dataProfessions = async () => {
    try {
      const response = await fetch(API_PROFESSIONS)
      if (!response.ok) throw new Error();
      data.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false;
    }
  } 
  onMounted(dataProfessions)

  return { data, loading, error }
}