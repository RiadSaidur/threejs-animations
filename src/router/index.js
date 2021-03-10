import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '/cube-animation',
    name: 'Cube',
    component: () => import(/* webpackChunkName: "cube" */ '@/views/Cube.vue')
  },
  {
    path: '/sphere-animation',
    name: 'Sphere',
    component: () => import(/* webpackChunkName: "sphere" */ '@/views/Sphere.vue')
  },
  {
    path: '/cloud-effect',
    name: 'Cloud',
    component: () => import(/* webpackChunkName: "cloud" */ '@/views/Cloud.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
