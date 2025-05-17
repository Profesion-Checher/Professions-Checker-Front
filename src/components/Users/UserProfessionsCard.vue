<template>
  <div class="user-professions-card" v-if="user.interested_professions.length > 0">
    <h2>Mis Profesiones de Interés</h2>
    <ul>
      <li v-for="prof in user.interested_professions" :key="prof.id" class="profession-item">
        <strong>{{ prof.profession_name }}</strong>
        <p>Experiencia: {{ prof.experience || 'N/A' }}</p>
        <p>Salario actual: ${{ prof.current_salary.toLocaleString() }}</p>
      </li>
    </ul>
  </div>
  <div v-else>
    <p>No tienes profesiones marcadas como interés.</p>
  </div>
</template>

<script setup>
const props = defineProps({
  user: Object
})
</script>

<style scoped>
.user-professions-card {
  max-width: 600px;
  margin: 20px auto;
  background: #f7f9fc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.user-professions-card h2 {
  margin-bottom: 15px;
  color: #2c3e50;
}

.user-professions-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.profession-item {
  padding: 15px;
  border-bottom: 1px solid #ddd;
}

.profession-item:last-child {
  border-bottom: none;
}

.profession-item strong {
  font-size: 18px;
  color: #2e86de;
}

.profession-item p {
  margin: 5px 0;
  color: #34495e;
}
</style>
