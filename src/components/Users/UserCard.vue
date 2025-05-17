<script setup>
const prop = defineProps({
  user: Object
})
</script>

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

<style scoped>
.user-card {
  background-color: #1f2937; /* dark gray */
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  max-width: 100%;
  color: #f9fafb; /* text color light */
  border: 1px solid #374151;
  transition: transform 0.2s ease;
}

.user-card:hover {
  transform: translateY(-2px);
}

.card-title {
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #60a5fa; /* blue-400 */
  border-bottom: 2px solid #3b82f6;
  padding-bottom: 0.5rem;
}

.card-content p {
  margin-bottom: 0.75rem;
  font-size: 1.05rem;
  line-height: 1.6;
}

.label {
  font-weight: 700;
  color: #93c5fd; /* blue-300 */
}
</style>
