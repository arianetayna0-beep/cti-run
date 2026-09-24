import { createRouter, createWebHistory } from 'vue-router'

// Importação de todas as páginas
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import UploadView from '../views/UploadView.vue'
import RelatoriosView from '../views/RelatoriosView.vue'
import GraficosView from '../views/GraficosView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/dashboard', name: 'Dashboard', component: DashboardView },
  { path: '/upload', name: 'Upload', component: UploadView },
  { path: '/relatorios', name: 'Relatorios', component: RelatoriosView },
  { path: '/graficos', name: 'Graficos', component: GraficosView }
]

const router = createRouter({ 
  history: createWebHistory(), 
  routes 
})

export default router