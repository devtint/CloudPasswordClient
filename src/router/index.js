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
      {
        path: '/products',
        name: 'products',
        component: () =>
          import(
            /* webpackChunkName: "products" */ '@/views/products/serviceProducts.vue'
          ),
      },
      {
        path: '/secretKey',
        name: 'secretKey',
        component: () =>
          import(
            /* webpackChunkName: "secretKey" */ '@/views/secretKey/secretKey.vue'
          ),
      },
      {
        path: '/password',
        name: 'password',
        component: () =>
          import(
            /* webpackChunkName: "password" */ '@/views/password/passwordService.vue'
          ),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
