import { createRouter, createWebHistory } from 'vue-router'
import Currencies from '../views/Currencies.vue'

const routes = [
  {
    path: '/',
    name: 'Currencies',
    component: Currencies,
    props: true,
  },
  {
    path: '/converter',
    name: 'Converter',
    component: () => import(/* webpackChunkName: "about" */ '../views/Converter.vue'),
    props: true,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
