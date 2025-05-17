<script setup>
const props = defineProps({
  user: Object
})
</script>

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
  <div v-else class="no-professions">
    <p>No tienes profesiones marcadas como interés.</p>
  </div>
</template>

<style scoped>
.user-professions-card {
  max-width: 600px;
  margin: 20px auto;
  background: #1f2937; /* gris oscuro */
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  color: #f9fafb; /* texto claro */
  text-align: left;
}

.user-professions-card h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #60a5fa; /* azul claro */
  border-bottom: 2px solid #3b82f6;
  padding-bottom: 0.5rem;
}

.user-professions-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.profession-item {
  padding: 1rem 0;
  border-bottom: 1px solid #4b5563; /* gris intermedio */
}

.profession-item:last-child {
  border-bottom: none;
}

.profession-item strong {
  font-size: 1.1rem;
  color: #93c5fd; /* azul suave */
  display: block;
  margin-bottom: 0.25rem;
}

.profession-item p {
  margin: 0.2rem 0;
  color: #d1d5db; /* gris claro */
}

.no-professions {
  max-width: 600px;
  margin: 20px auto;
  background: #1f2937;
  color: #f9fafb;
  padding: 2rem;
  border-radius: 0.75rem;
  text-align: left;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
</style>
