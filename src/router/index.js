import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home'),
    meta: { auth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login'),
    meta: { auth: false }
  },
  {
    path: '/recover',
    name: 'Recover',
    component: () => import('../views/Recover'),
    meta: { auth: false }
  },
  {
    path: '/repass',
    name: 'Repass',
    component: () => import('../views/Repas'),
    meta: { auth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register'),
    meta: { auth: false }
  },
  {
    path: '/user-page',
    name: 'UserPage',
    component: () => import('../views/UserPage'),
    meta: { auth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router