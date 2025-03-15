<script setup>
import { ref, onMounted, defineProps } from "vue"
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
import { useRouter } from "vue-router";

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

const props = defineProps({
  profession: Object
})

const canvasRef = ref(null);

onMounted(() => {
  if (canvasRef.value) {
    new Chart(canvasRef.value, {
      type: "line",
      data: {
        labels: ["2026", "2027", "2028"],
        datasets: [{
          label: "Salario Futuro",
          data: props.profession.future_salaries,
          borderColor: "#ccc",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
          pointRadius: 5,
          pointBackgroundColor: "#ccc"
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: "#ccc", // Cambia el color del texto de la leyenda
              font: {
                size: 14, // Tamaño del texto
                weight: "bold", // Negrita
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#36A2EB", // Color de los valores en el eje X
            },
            grid: {
              color: "rgba(54, 162, 235, 0.2)", // Color de las líneas de la tabla en X
            },
            border: {
              color: "#36A2EB", // Color del eje X
            },
          },
          y: {
            ticks: {
              color: "#36A2EB", // Color de los valores en el eje Y
            },
            grid: {
              color: "rgba(54, 162, 235, 0.2)", // Color de las líneas de la tabla en Y
            },
            border: {
              color: "#36A2EB", // Color del eje Y
            },
            suggestedMin: 500000,
            suggestedMax: 20000000,
          }
        },
      }
    });
  }
});

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
    
    <div class="chart-container">
      <canvas ref="canvasRef"></canvas>
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

.chart-container {
  width: 100%;
  height: 200px;
  margin-top: 15px;
}
</style>

