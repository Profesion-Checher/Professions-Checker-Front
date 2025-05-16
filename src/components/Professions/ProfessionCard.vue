<script setup>
import { ref, onMounted, defineProps } from "vue"
import { useRouter } from "vue-router";

const props = defineProps({
  profession: Object
})

const router = useRouter()
const acceder = (profession) => {
  localStorage.setItem("selectedProfession", JSON.stringify(profession))
  router.push({
    path: `/professions/${profession.id}`,
  })
}

</script>

<template>
  <div class="profession-card">
    <div class="info-card">
      <h2>{{ profession.profession_name }}</h2>
      <p class="card-info">
        <strong>Experiencia:</strong> {{ profession.experience }}
      </p>
      <p class="card-info">
        <strong>Salario actual:</strong> ${{ profession.current_salary.toLocaleString() }}
      </p>
    </div>
    
    <button @click="acceder(profession)">Ver</button>

  </div>
</template>

<style scoped>
/* 
--primary-color: #DC3545 ;
--secondary-color: #F8F9FA ;
--tertiary-color: #343A40;

--text-color: #212529; 
--hover-color: #C82333;

--font-size-base: 16px;
--font-family: Arial, sans-serif;
*/

.profession-card {
  border: 1px solid #ccc;
  padding: 15px;
  margin: 10px;
  border-radius: 8px;
  background-color: var(--tertiary-color);
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profession-card:hover {
  background-color: #6e2b2b;
  transition: background-color 0.3s ease-in-out;
}

.info-card {
  padding: 5px;
  color: var(--secondary-color);
}

/* Estilos para el botón "Ver" */
button {
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

button:active {
  background-color: #003f7f;
  transform: translateY(0);
}
</style>

