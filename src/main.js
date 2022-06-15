import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Clipboard from 'vue-clipboard2'
Vue.use(Clipboard)
// 全局引入
import { globalRegister } from './global'
import '@/assets/style/global_icon.css'

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(store)
Vue.use(globalRegister)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
