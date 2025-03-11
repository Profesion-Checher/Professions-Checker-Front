import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Profesions from "@/pages/Professions.vue";
import About from "@/pages/About.vue";

const routes = [
  { path: '/', component: Home, meta: { title: 'Home' } },
  { path: '/professions', component: Profesions, meta: { title: 'Professions' } },
  { path: '/about', component: About, meta: { title: 'About' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.afterEach((to) => {
  document.title = to.meta.title ? to.meta.title : 'Professions Checker';
})

export default router
