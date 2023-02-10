//src/store/order.js

import { defineStore } from 'pinia'

export const useOrderStore = defineStore({
  id: 'order', // id必填，且需要唯一
  state: () => {
    return {
      // hello: '',
      // 选中的当前商品信息
      currentGoods: {},
      // 当前tabs选项
      curentTabs: '',
      orderData: [],
      orderDataTotalNum: '',
    }
  },
  getters: {
    // getHello: state => {
    //   return state.hello
    // },
    // 获取选中的商品
    getCurrentGoods: state => {
      return state.currentGoods
    },

    getCurrentTabs: state => {
      return state.curentTabs
    },

    getOrderData: state => {
      return state.orderData
    },

    getOrderDataTotalNum: state => {
      return state.orderDataTotalNum
    },
  },
  actions: {
    // setHello(payload) {
    //   this.hello = payload
    // },
    setCurrentGoods(payload) {
      this.currentGoods = payload
    },
    setCurentTabs(payload) {
      this.curentTabs = payload
    },
    setOrderData(payload) {
      this.orderData = payload
    },

    setOrderDataTotalNum(payload) {
      this.orderDataTotalNum = payload
    },
    // // 异步actions
    // async login(account, pwd) {
    //   const { data } = await api.login(account, pwd)
    //   return data
    // },
  },
  // 开启数据缓存 数据默认存在 sessionStorage 里，并且会以 store 的 id 作为 key
  // 可以在 strategies 里自定义 key 值，并将存放位置由 sessionStorage 改为 sessionStorage
  persist: {
    enabled: true,
    // strategies: [
    //   {
    //     key: 'my_user',
    //     storage: sessionStorage,
    //     paths: ['name', 'age'], // 持久化部分的 state
    //   },
    // ],
  },
})
