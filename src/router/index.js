import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: '',
    component: () =>
      import(/* webpackChunkName: "home" */ '@/views/layout/layout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home/home.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
