import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/game-of-life',
    name: 'GameOfLife',

    component: () =>
      import(/* webpackChunkName: "game-of-life" */ '../views/GameOfLife.vue'),
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: () =>
      import(/* webpackChunkName: "calculator" */ '../views/Calculator.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
