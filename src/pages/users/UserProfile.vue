<template>
  <div class="max-w-xl mx-auto p-6 mt-8">
    <UserCard v-if="user" :user="user" />

    <!-- Botón de cerrar sesión -->
    <button @click="handleLogout"
            class="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
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
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    router.push('/login');
  }
};

onMounted(getUserProfile);
</script>
