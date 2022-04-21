import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import(
        /* webpackChunkName: "register" */ '@/views/register/register.vue'
      ),
  },
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
        path: '/confirm',
        name: 'confirm',
        component: () =>
          import(
            /* webpackChunkName: "confirm" */ '@/views/confirm/confirmOrder.vue'
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
      {
        path: '/order',
        name: 'order',
        component: () =>
          import(/* webpackChunkName: "order" */ '@/views/order/order.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
