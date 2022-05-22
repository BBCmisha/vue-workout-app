import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ROUTE_NAMES } from '@/helpers/enums'

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Create from '@/views/Create.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: ROUTE_NAMES.HOME,
    component: Home,
  },
  {
    path: '/login',
    name: ROUTE_NAMES.LOGIN,
    component: Login,
  },
  {
    path: '/register',
    name: ROUTE_NAMES.REGISTER,
    component: Register,
  },
  {
    path: '/create',
    name: ROUTE_NAMES.CREATE,
    component: Create,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
