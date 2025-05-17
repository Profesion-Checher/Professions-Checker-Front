<template>
  <div class="max-w-xl mx-auto p-6 mt-8">
    <UserCard v-if="user" :user="user" />
    <UserProfessionsCard v-if="user" :user="user"/>

    <!-- Botón de cerrar sesión -->
    <button @click="handleLogout" class="logout-button">
      Cerrar sesión
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from '@/services/axios.js';
import { useAuth } from '@/composables/useAuth';
import UserCard from '@/components/Users/UserCard.vue';
import UserProfessionsCard from '@/components/Users/UserProfessionsCard.vue';

const user = ref(null);
const router = useRouter();
const { logout } = useAuth();

const handleLogout = () => {
  logout();
  router.push('/login');
};

const getUserProfile = async () => {
  try {
    const response = await axios.get('/users/profile/');
    user.value = response.data;
    console.log(response.data)
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    router.push('/login');
  }
};

onMounted(getUserProfile);
</script>

<style scoped>
.logout-button {
  margin-top: 1.5rem;
  padding: 0.5rem 1rem;
  background-color: #ef4444; /* bg-red-500 */
  color: white;
  font-weight: 600;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease-in-out;
  border: none;
  cursor: pointer;
}
.logout-button:hover {
  background-color: #dc2626; /* hover:bg-red-600 */
}
.logout-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(252, 165, 165, 0.5); /* focus:ring-red-400 */
}
</style>
