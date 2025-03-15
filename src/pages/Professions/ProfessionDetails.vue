<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const profession = ref(null)

onMounted(() => {
  const savedProfession = localStorage.getItem("selectedProfession");
  if (savedProfession) {
    profession.value = JSON.parse(savedProfession);
  }

  console.log(profession.value)
})

</script>

<template>
  <div v-if="profession">
    <h1>{{ profession.profession_name }}</h1>
    <p>Salario: ${{ profession.current_salary }}</p>
  </div>
  <div v-else>
    <p>No hay información</p>
  </div>
</template>