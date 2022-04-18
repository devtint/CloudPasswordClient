import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局引入
import { globalRegister } from './global'

Vue.config.productionTip = false
Vue.use(store)
Vue.use(globalRegister)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
