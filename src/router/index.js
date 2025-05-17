import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home/Home.vue";
import About from "@/pages/Home/About.vue";
import ProfessionList from "@/pages/Professions/ProfessionList.vue";
import ProfesionDetails from "@/pages/Professions/ProfessionDetails.vue"
import UserRegister from "../pages/users/UserRegister.vue";
import UserLogin from "../pages/users/UserLogin.vue";
import UserProfile from "../pages/users/UserProfile.vue";
import { useAuth } from '@/composables/useAuth.js'


const routes = [
  { path: '/', component: Home, meta: { title: 'Home' } },
  { path: '/about', component: About, meta: { title: 'About' } },
  
  
  { path: '/professions', component: ProfessionList, meta: { title: 'Profesiones' } },
  { path: '/professions/:id', component: ProfesionDetails, meta: {} },
  
  { path: '/profile', component: UserProfile, meta: {title: 'Perfil'} },

  { path: '/login', component: UserLogin, meta: { title: 'Iniciar sesión' } },
  { path: '/register', component: UserRegister, meta: {title: 'Register'} },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth()

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ path: '/login' })
  } else if ((to.path === '/login' || to.path === '/register') && isAuthenticated.value) {
    next({ path: '/' })
  } else {
    next()
  }
})

router.afterEach((to) => {
  document.title = to.meta.title ? to.meta.title : 'Professions Checker';
})

export default router
