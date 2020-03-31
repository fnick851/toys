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
  {
    path: '/updating-bars',
    name: 'UpdatingBars',
    component: () =>
      import(
        /* webpackChunkName: "updating-bars" */ '../views/UpdatingBars.vue'
      ),
  },
  {
    path: '/colored-pixels',
    name: 'ColoredPixels',
    component: () =>
      import(
        /* webpackChunkName: "colored-pixels" */ '../views/ColoredPixels.vue'
      ),
  },
  {
    path: '/colorblock-webgl',
    name: 'ColorBlockWebgl',
    component: () =>
      import(
        /* webpackChunkName: "colorblock-webgl" */ '../views/ColorBlockWebgl.vue'
      ),
  },
  {
    path: '/music-canvas',
    name: 'MusicCanvas',
    component: () =>
      import(/* webpackChunkName: "music-canvas" */ '../views/MusicCanvas.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
