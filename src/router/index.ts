import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ROUTE_NAMES } from '@/helpers/enums'

import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: ROUTE_NAMES.HOME,
    component: Home,
  },
  {
    path: '/login',
    name: ROUTE_NAMES.LOGIN,
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/create',
    name: ROUTE_NAMES.CREATE,
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Create.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
