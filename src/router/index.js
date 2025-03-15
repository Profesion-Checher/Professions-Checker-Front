import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home/Home.vue";
import About from "@/pages/Home/About.vue";
import ProfessionList from "@/pages/Professions/ProfessionList.vue";
import ProfesionDetails from "@/pages/Professions/ProfessionDetails.vue"

const routes = [
  { path: '/', component: Home, meta: { title: 'Home' } },
  { path: '/professions', component: ProfessionList, meta: { title: 'Profesiones' } },
  { path: '/professions/:id', component: ProfesionDetails, meta: {title: 'Detalles'} },
  { path: '/about', component: About, meta: { title: 'About' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.afterEach((to) => {
  document.title = to.meta.title ? to.meta.title : 'Professions Checker';
})

export default router
