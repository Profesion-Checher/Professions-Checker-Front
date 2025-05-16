<template>
  <div class="user-card">
    <h3 class="card-title">Perfil de Usuario</h3>
    <div class="card-content">
      <p><span class="label">Nombre:</span> {{ user.first_name }} {{ user.last_name }}</p>
      <p><span class="label">Email:</span> {{ user.email }}</p>
      <p><span class="label">Empresa:</span> {{ user.company || 'N/A' }}</p>
      <p><span class="label">Profesión:</span> {{ user.profession || 'N/A' }}</p>
      <p><span class="label">Salario:</span> {{ user.salary || 'N/A' }}</p>
    </div>
  </div>
</template>

<script setup>
const prop = defineProps({
  user: Object
})
</script>

<style scoped>
.user-card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 100%;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1f2937; /* gray-800 */
}

.card-content {
  color: #374151; /* gray-700 */
}

.label {
  font-weight: 600;
}
</style>
