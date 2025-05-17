<script setup>
import axios from 'axios'

const API_OLD_AI_MODEL = import.meta.env.VITE_API_OLD_AI_MODEL
const API_NEW_AI_MODEL = import.meta.env.VITE_API_NEW_AI_MODEL
const getOldData = async () => {
  try {
    await axios.get(API_OLD_AI_MODEL)
    console.log("Viejos datos traidos con exito")
  } catch (error) {
    console.error('Error al ejecutar acción:', error)
  }
}

const getNewData = async () => {
  try {
    await axios.get(API_NEW_AI_MODEL)
    console.log("Viejos datos traidos con exito")
  } catch (error) {
    console.error('Error al ejecutar acción:', error)
  }
}

</script>

<template>
  <div class="button-container">
    <button @click="getOldData" class="model-button">
      Viejo modelo
    </button>

    <button @click="getNewData" class="model-button alt">
      Nuevo modelo
    </button>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.model-button {
  padding: 0.6rem 1.2rem;
  background-color: #3b82f6; /* blue-500 */
  color: white;
  font-weight: 600;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.model-button:hover {
  background-color: #2563eb; /* blue-600 */
}

.model-button.alt {
  background-color: #10b981; /* green-500 */
}

.model-button.alt:hover {
  background-color: #059669; /* green-600 */
}
</style>