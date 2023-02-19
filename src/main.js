import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Clipboard from 'vue-clipboard2'
Vue.use(Clipboard)
// 全局引入
import { globalRegister } from './global'
import { checkLogin } from '@/api/user'
import '@/assets/style/global_icon.css'
// import 'tailwindcss/tailwind.css'
import './assets/tailwindcss.css'

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(store)
Vue.use(globalRegister)

// 检测是否登陆。
Vue.prototype.checklogin = function (callback) {
  checkLogin().then(function (response) {
    //请求成功
    console.log('checkLogin response:', response)
    var userName = response.data.memberID
    let storage = window.sessionStorage
    if (userName === 'null') {
      storage.removeItem('user')
      storage.removeItem('memberID')
      storage.removeItem('userName')
      storage.removeItem('enterpriseName')
      console.log('memberID', window.sessionStorage.getItem('memberID'))
    }
  })
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
