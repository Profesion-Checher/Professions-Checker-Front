<template>
  <div class="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8">
    <h2 class="text-2xl font-bold mb-4">Perfil de Usuario</h2>
    <p><strong>Nombre:</strong> {{ user.first_name }} {{ user.last_name }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <p><strong>Empresa:</strong> {{ user.company || 'N/A' }}</p>
    <p><strong>Profesión:</strong> {{ user.profession?.profession_name || 'N/A' }}</p>
    <p><strong>Salario:</strong> {{ user.salary || 'N/A' }}</p>

    <!-- Botón de cerrar sesión -->
    <button
      @click="logout"
      class="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Cerrar sesión
    </button>
  </div>
</template>

<script>
import axios from '@/services/axios.js';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

export default {
  setup() {
    const user = ref({});
    const router = useRouter();

    const getUserProfile = async () => {
      try {
        const response = await axios.get('/users/profile/');
        user.value = response.data;
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
        router.push('/login'); // Si el token no es válido
      }
    };

    const logout = () => {
      // Eliminar el token de localStorage
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      // Redirigir al login
      router.push('/login');
    };

    onMounted(getUserProfile);

    return { user, logout };
  }
};
</script>
