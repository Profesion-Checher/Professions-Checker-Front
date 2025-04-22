<script setup>
import { useAuth } from '@/composables/useAuth.js'
import { RouterLink, useRouter } from 'vue-router'

const { isAuthenticated, logout } = useAuth()
const router = useRouter()

function handleLogout() {
  logout()
  router.push('/login')
}
</script>

<template>
  <header class="header">
    <nav class="nav-bar">
      <h1 class="app-name">Professions Checker</h1>
      <div class="nav-buttons">
        <RouterLink to="/" class="nav-option">Inicio</RouterLink>
        <RouterLink to="/professions" class="nav-option">Profesiones</RouterLink>
        <RouterLink to="/companies" class="nav-option">Empresas</RouterLink>
        <RouterLink to="/about" class="nav-option">Nosotros</RouterLink>

        <template v-if="!isAuthenticated">
          <RouterLink to="/register" class="nav-option">Registrarse</RouterLink>
          <RouterLink to="/login" class="nav-option">Iniciar sesión</RouterLink>
        </template>

        <template v-else>
          <RouterLink to="/profile" class="nav-option">Mi Perfil</RouterLink>
          <button @click="handleLogout" class="nav-option">Cerrar sesión</button>
        </template>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header {
  /* Usa sticky en lugar de fixed para mantener el flujo */
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--primary-color);
  padding: 20px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000; /* Asegura que esté por encima */
}

.nav-bar {
  display: flex;
  align-items: center;
  width: 90%;
  justify-content: space-between;
}

.app-name {
  font-size: 24px;
  font-weight: bold;
  color: var(--secondary-color);
  margin: 0;
}

.nav-buttons {
  display: flex;
  gap: 20px;
}

.nav-option {
  color: var(--secondary-color);
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
  padding: 8px 12px;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.nav-option:hover {
  background-color: var(--secondary-color);
  color: var(--hover-color);
  border-radius: 5px;
}
</style>
