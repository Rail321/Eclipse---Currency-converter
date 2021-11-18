import Vue from 'vue'
import VueRouter from 'vue-router'
import Currencies from '../views/Currencies.vue'

Vue.use(VueRouter)

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
    component: () => import('../views/Converter.vue'),
    props: true,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
