<script setup>
import { onMounted, ref, nextTick} from "vue";
import {useAuth} from '@/composables/useAuth.js';
import axios from "axios";
import {
  Chart,
  LineController,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
)

const profession = ref(null)
const canvasRef = ref(null);
const { isAuthenticated } = useAuth()
const API_USER_ADD_PROFESSIONS = import.meta.env.VITE_API_USER_ADD_PROFESSIONS

const alreadySent = ref(false);

const handleInterest = async () => {
  if (!profession.value) return;

  const token = localStorage.getItem('access');
  if (!token) {
    alert("Debes iniciar sesión para marcar interés.");
    return;
  }

  try {
    const response = await axios.post(API_USER_ADD_PROFESSIONS, 
      { profession_id: profession.value.id },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    alert(response.data.message);
    alreadySent.value = true;
  } catch (error) {
    console.error('Error agregando profesión de interés:', error);
    if (error.response) {
      alert(`Error: ${error.response.data.error || 'No se pudo agregar la profesión.'}`);
    } else {
      alert('Error al conectar con el servidor.');
    }
  }
};


onMounted(async () => {
  const savedProfession = localStorage.getItem("selectedProfession");
  if (savedProfession) {
    profession.value = JSON.parse(savedProfession);
  }
  console.log("Future Salaries:", profession.value.future_salaries);

  if (profession.value) {
    document.title = `Detalles: ${profession.value.profession_name}`;
    await nextTick();

    if (canvasRef.value) {
      const ctx = canvasRef.value.getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["2026", "2027", "2028", "2029", "2030"],
          datasets: [{
            label: "Proyección Salarial",
            data: profession.value.future_salaries,
            borderColor: "#4bc0c0",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 3,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: "#4bc0c0",
            fill: true,
            tension: 0.4, // curva suave
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              color: "#333",
              font: {
                size: 18,
                weight: "bold",
              },
              padding: {
                top: 10,
                bottom: 20
              }
            },
            legend: {
              display: true,
              labels: {
                color: "#333",
                font: {
                  size: 14,
                  weight: "bold"
                }
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: "#333",
              titleColor: "#fff",
              bodyColor: "#fff",
              borderColor: "#4bc0c0",
              borderWidth: 1,
            }
          },
          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
          },
          scales: {
            x: {
              ticks: {
                color: "#333",
                font: {
                  size: 13
                }
              },
              grid: {
                color: "rgba(0,0,0,0.05)"
              }
            },
            y: {
              ticks: {
                color: "#333",
                font: {
                  size: 13
                },
                callback: (value) => `$${value.toLocaleString()}`
              },
              grid: {
                color: "rgba(0,0,0,0.05)"
              },
              beginAtZero: true
            }
          }
        }
      });
    }
  }
});

</script>

<template>
  <div v-if="profession" class="details-wrapper">
    <button v-if="isAuthenticated" class="interest-button" @click="handleInterest">
      Me interesa
    </button>

    <h1 class="title">{{ profession.profession_name }}: {{ profession.experience }}</h1>
    <p class="salary">Salario actual: <span>${{ profession.current_salary.toLocaleString() }}</span></p>

    <div class="chart-container">
      <canvas ref="canvasRef"></canvas>
    </div>

    <div class="future-info">
      <h2>Proyecciones futuras</h2>
      <ul>
        <li>📈 Salario proyectado: entre ${{ Math.min(...profession.future_salaries).toLocaleString() }} y ${{ Math.max(...profession.future_salaries).toLocaleString() }}</li>
      </ul>
    </div>
  </div>

  <div v-else class="no-info">
    <p>No hay información disponible.</p>
  </div>
</template>

<style scoped>
.details-wrapper {
  padding: 20px;
  background-color: #f7f9fc;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  max-width: 800px;
  margin: auto;
}

.title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.salary {
  font-size: 18px;
  color: #444;
  margin-bottom: 20px;
}

.salary span {
  font-weight: bold;
  color: #2e86de;
}

.chart-container {
  width: 100%;
  height: 400px;
  margin: 20px 0;
}

.future-info {
  background-color: #eaf2ff;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}

.future-info h2 {
  margin-bottom: 12px;
  font-size: 20px;
  color: #2c3e50;
}

.future-info ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.future-info li {
  margin-bottom: 10px;
  font-size: 16px;
  color: #34495e;
}

.no-info {
  text-align: center;
  font-size: 18px;
  padding: 40px;
  color: #888;
}

.interest-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #2e86de;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

.interest-button:hover {
  background-color: #1b4f72;
}

.details-wrapper {
  position: relative; /* Asegura que el botón se posicione respecto a este contenedor */
}
</style>
