import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ROUTE_NAMES } from '@/helpers/enums'
import { supabase } from '@/supabase/init'

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Create from '@/views/Create.vue'
import ViewWorkout from '@/views/ViewWorkout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: ROUTE_NAMES.HOME,
    component: Home,
    meta: {
      title: 'Home',
      auth: false,
    },
  },
  {
    path: '/login',
    name: ROUTE_NAMES.LOGIN,
    component: Login,
    meta: {
      title: 'Login',
      auth: false,
    },
  },
  {
    path: '/register',
    name: ROUTE_NAMES.REGISTER,
    component: Register,
    meta: {
      title: 'Register',
      auth: false,
    },
  },
  {
    path: '/create',
    name: ROUTE_NAMES.CREATE,
    component: Create,
    meta: {
      title: 'Create',
      auth: true,
    },
  },
  {
    path: '/view-workout/:workoutId',
    name: ROUTE_NAMES.WORKOUT,
    component: ViewWorkout,
    meta: {
      title: 'View Workout',
      auth: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Active Tracker`
  next()
})

router.beforeEach((to, from, next) => {
  const user = supabase.auth.user()
  if (to.matched.some((res) => res.meta.auth)) {
    if (user) {
      next()
      return
    }
    next({ name: ROUTE_NAMES.LOGIN })
    return
  }
  next()
})

export default router
