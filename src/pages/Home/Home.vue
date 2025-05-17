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
  <button @click="getOldData">
    Viejo modelo
  </button>

  <button @click="getNewData">
    Nuevo modelo
  </button>
</template>

<style scoped>
</style>
