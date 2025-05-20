<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const API_OLD_AI_MODEL = import.meta.env.VITE_API_OLD_AI_MODEL
const API_NEW_AI_MODEL = import.meta.env.VITE_API_NEW_AI_MODEL

const getOldData = async () => {
  try {
    await axios.get(API_OLD_AI_MODEL)
    console.log("Viejos datos traídos con éxito")
    router.push({
      path: '/professions/'
    })
  } catch (error) {
    console.error('Error al ejecutar acción:', error)
  }
}

const getNewData = async () => {
  try {
    await axios.get(API_NEW_AI_MODEL)
    console.log("Nuevos datos traídos con éxito")
    router.push({
      path: '/professions/'
    })
  } catch (error) {
    console.error('Error al ejecutar acción:', error)
  }
}
</script>

<template>
  <div class="intro-container">
    <h1 class="title">Bienvenido a Professions Checker</h1>

    <p class="description">
      Esta plataforma utiliza inteligencia artificial para predecir los salarios futuros en profesiones tecnológicas. Ayuda a estudiantes, profesionales y empresas a identificar qué especializaciones ofrecerán mejores remuneraciones y en qué áreas habrá mayores oportunidades en el sector tecnológico.
    </p>

    <h2 class="section-title">Documentación del modelo de IA</h2>
    <p><strong>Objetivo del Proyecto:</strong> Predecir el salario anual estimado (ajustado a inflación) para personas en profesiones de datos entre 2025 y 2030.</p>

    <p><strong>Entrenamiento del Modelo:</strong></p>
    <ul>
      <li>Algoritmo: <code>XGBoostRegressor</code></li>
      <li>Métrica de evaluación: <strong>R² ≈ 0.31</strong> (test 2025)</li>
      <li>Mejora frente a RandomForest, especialmente en capacidad temporal</li>
    </ul>

    <p><strong>Dataset:</strong></p>
    <ul>
      <li>Fuente: 
        <a href="https://www.kaggle.com/datasets/saurabhbadole/latest-data-science-job-salaries-2024/data" target="_blank">
          Kaggle – Data Science Job Salaries 2020–2025
        </a>
      </li>
      <li>Rango de años: 2022–2025</li>
      <li>Variables utilizadas:
        <ul>
          <li><code>work_year</code>: Año de predicción</li>
          <li><code>experience_level</code>: EN, MI, SE, EX</li>
          <li><code>job_group</code>: Scientist, Engineer, Analyst, Manager, Other</li>
          <li><code>remote_ratio</code>: 0 o 100</li>
          <li><code>employee_residence</code> / <code>company_location</code>: País</li>
          <li><code>company_size</code>: S, M, L</li>
          <li><code>exp_year_combo</code>: Interacción experiencia + año</li>
          <li><code>inflation_factor</code>: Inflación acumulada desde 2022</li>
        </ul>
      </li>
      <li>Codificación:
        <ul>
          <li>Variables categóricas: <code>OneHotEncoder</code></li>
          <li>Variables numéricas: <code>StandardScaler</code></li>
        </ul>
      </li>
    </ul>

    <p><strong>Notas adicionales:</strong></p>
    <ul>
      <li>El modelo generaliza bien entre 2026–2030 por uso explícito de inflación y <code>exp_year_combo</code></li>
      <li>Predicción centrada en personas que <strong>viven en EE.UU.</strong> y <strong>trabajan en empresas medianas en EE.UU.</strong></li>
      <li>Entradas del dataset <strong>93.598</strong>.</li>
    </ul>

    <h2 class="section-title">Equipo de Desarrollo</h2>
    <ul class="team-list">
      <li><strong>José Miguel Burgos Cuartas</strong> – Scrum Master</li>
      <li><strong>Miguel Ángel Díaz Valencia</strong> – Arquitecto del sistema</li>
      <li><strong>Marcela Londoño León</strong> – Tester / QA</li>
      <li><strong>Jerónimo Velásquez Escobar</strong> – Desarrollador</li>
      <li><strong>Mateo Ríos</strong> – Cliente / Product Owner</li>
    </ul>

    <h2 class="section-title">Público Objetivo</h2>
    <ul class="audience-list">
      <li><strong>Estudiantes de tecnología:</strong> Buscan orientación sobre carreras con alta demanda y buenos salarios.</li>
      <li><strong>Profesionales y recién graduados:</strong> Quieren comparar oportunidades y explorar nuevas áreas.</li>
      <li><strong>Empresas y reclutadores:</strong> Analizan el mercado para ajustar sus estrategias de contratación.</li>
    </ul>

    <h2 class="section-title">Probar modelos - Exclusivo para la presentación</h2>
    <div class="button-container">
      <button @click="getOldData" class="model-button">Viejo modelo</button>
      <button @click="getNewData" class="model-button alt">Nuevo modelo</button>
    </div>
  </div>
</template>

<style scoped>
.intro-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  color: #1f2937; /* gray-800 */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
}

.title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #111827; /* gray-900 */
}

.description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  text-align: justify;
}

.section-title {
  font-size: 1.4rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #2563eb; /* blue-600 */
}

.team-list, .audience-list {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 2rem;
}

.team-list li, .audience-list li {
  margin-bottom: 0.5rem;
}

ul ul {
  list-style-type: circle;
  padding-left: 1.5rem;
  margin-top: 0.3rem;
}

a {
  color: #2563eb;
  text-decoration: underline;
}

.button-container {
  display: flex;
  gap: 1rem;
  justify-content: left;
  margin-top: 2rem;
}

.model-button {
  padding: 0.6rem 1.2rem;
  background-color: #3b82f6; /* blue-500 */
  color: white;
  font-weight: 600;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.model-button:hover {
  background-color: #2563eb; /* blue-600 */
}

.model-button.alt {
  background-color: #10b981; /* green-500 */
}

.model-button.alt:hover {
  background-color: #059669; /* green-600 */
}
</style>
