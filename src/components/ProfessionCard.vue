<script setup>
import { ref, onMounted, defineProps } from "vue";
import { Chart, LineController, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from "chart.js";

Chart.register(LineController, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const props = defineProps({
  profession: Object
});

const canvasRef = ref(null);

onMounted(() => {
  if (canvasRef.value) {
    new Chart(canvasRef.value, {
      type: "line",
      data: {
        labels: ["Año 1", "Año 2", "Año 3"],
        datasets: [{
          label: "Salario Futuro",
          data: props.profession.future_salaries,
          borderColor: "#FF6384",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
          pointRadius: 5,
          pointBackgroundColor: "#FF6384"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
});
</script>


<template>
  <div class="profession-card">
    <h2>{{ profession.profession_name }}</h2>
    <p><strong>Salario actual:</strong> ${{ profession.current_salary.toLocaleString() }}</p>
    <p><strong>Salarios futuros:</strong> {{ profession.future_salaries.join(", ") }}</p>
    <p><strong>Empresas:</strong> {{ profession.companies.join(", ") }}</p>
    <p><strong>Experiencia:</strong> {{ profession.experience }}</p>

    <!-- Canvas para la gráfica -->
    <div class="chart-container">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>

<style scoped>
.profession-card {
  border: 1px solid #ccc;
  padding: 15px;
  margin: 10px;
  border-radius: 8px;
  background-color: #f8f9fa;
  width: 320px;
  text-align: center;
}

.chart-container {
  height: 200px;
  margin-top: 15px;
}
</style>
