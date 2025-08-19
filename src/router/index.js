
import HomeView from '../views/HomeView.vue'
import ClienteView from '/src/views/ClienteView.vue'
import TransaccionesView from '/src/views/TransaccionesView.vue'
import AnalisisFinancieroView from '/src/views/AnalisisFinancieroView.vue'







import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  {path: '/clientes', name: 'cliente', component: ClienteView },
  {path: '/transacciones', name: 'transacciones', component: TransaccionesView },
  {path: '/analisis', name: 'analisis', component: AnalisisFinancieroView },


]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
