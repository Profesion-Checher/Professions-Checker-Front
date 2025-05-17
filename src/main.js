import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles.css'
import router from './router'
import { syncAuthStatus } from './composables/useAuth'

const app = createApp(App)

syncAuthStatus()
app.use(router)
app.mount('#app')
