import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home'),
    meta: { auth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login'),
    meta: { auth: false }
  },
  {
    path: '/recover',
    name: 'recover',
    component: () => import('../views/Recover'),
    meta: { auth: false }
  },
  {
    path: '/repass',
    name: 'repass',
    component: () => import('../views/Repas'),
    meta: { auth: false }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register'),
    meta: { auth: false }
  },
  {
    path: '/user-page',
    name: 'user-page',
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
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
