<template>
  <div class="serviceProducts">
    <!-- 轮播图 -->
    <!-- <rotation-vue /> -->
    <div slot="header" class="breadcrumbBox">
      <!-- 面包屑路径导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ curentProduct.className }}</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 面包屑路径导航  end -->
    </div>
    <main>
      <!-- <div class="title">{{ curentProduct.className }}</div> -->
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-12 mx-auto flex items-center md:flex-row flex-col">
          <div class="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
            <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">SERVICE COLUMN</h2>
            <h1 class="md:text-3xl text-2xl font-medium title-font text-gray-900">{{ curentProduct.className }}</h1>
          </div>
          <div class="flex md:ml-auto md:mr-0 mx-auto items-center flex-shrink-0 space-x-4">
            <button class="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none" @click="goHome">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6" viewBox="0 0 512 512">
                <path
                  d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"
                ></path>
              </svg>
              <span class="ml-4 flex items-start flex-col leading-none">
                <span class="text-xs text-gray-600 mb-1">NOW GO BACK</span>
                <span class="title-font font-medium">服务产品</span>
              </span>
            </button>
            <!-- <button class="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6" viewBox="0 0 305 305">
                <path
                  d="M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.23 22.45-5.99 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94a168.18 168.18 0 0021-43l.09-.28a2.5 2.5 0 00-1.33-3.06l-.18-.08c-3.92-1.6-38.26-16.84-38.62-58.36-.34-33.74 25.76-51.6 31-54.84l.24-.15a2.5 2.5 0 00.7-3.51c-18-26.37-45.62-30.34-56.73-30.82a50.04 50.04 0 00-4.95-.24c-13.06 0-25.56 4.93-35.61 8.9-6.94 2.73-12.93 5.09-17.06 5.09-4.64 0-10.67-2.4-17.65-5.16-9.33-3.7-19.9-7.9-31.1-7.9l-.79.01c-26.03.38-50.62 15.27-64.18 38.86z"
                ></path>
                <path
                  d="M212.1 0c-15.76.64-34.67 10.35-45.97 23.58-9.6 11.13-19 29.68-16.52 48.38a2.5 2.5 0 002.29 2.17c1.06.08 2.15.12 3.23.12 15.41 0 32.04-8.52 43.4-22.25 11.94-14.5 17.99-33.1 16.16-49.77A2.52 2.52 0 00212.1 0z"
                ></path>
              </svg>
              <span class="ml-4 flex items-start flex-col leading-none">
                <span class="text-xs text-gray-600 mb-1">Download on the</span>
                <span class="title-font font-medium">App Store</span>
              </span>
            </button> -->
          </div>
        </div>
      </section>
      <!-- <el-row :gutter="0">
        <el-col :xs="24" :sm="24" :md="12" :lg="7" :xl="1" v-for="(item, index) in productList" :key="index">
          <el-card>
            <div class="cardMain">
              <h3>{{ item.srlID }}</h3>
              <p class="">{{ item.remark }}</p>
              <div>
                <el-button type="warning" size="small" plain @click="payPro(item)">立即选购</el-button>
                <el-button size="small" @click="goDocs(item.docUrl)">查看文档</el-button>
              </div>
              <div v-for="(keys, i) in interfaces" :key="i" class="cardMain-left">
                <p v-if="keys.name === item"><i class="el-icon el-icon-success"></i> {{ keys.interface }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row> -->
      <section class="text-gray-600 body-font">
        <div class="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center" v-for="(item, index) in productList" :key="index">
          <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img class="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/600x360" />
          </div>
          <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{{ item.srlID }}<br class="hidden lg:inline-block" /></h1>
            <p class="mb-8 leading-relaxed">
              {{ item.remark }}
            </p>
            <!-- <div v-for="(keys, i) in interfaces" :key="i" class="flex flex-wrap flex-row">
              <div class="" v-if="keys.name === item"><i class="el-icon el-icon-success"></i> {{ keys.interface }}</div>
            </div> -->
            <nav class="md:mr-auto md:ml-0 md:py-4 md:pl-0 flex flex-wrap items-center text-base justify-center">
              <div v-for="(keys, i) in interfaces" :key="i">
                <!-- <a v-if="keys.name === item" class="mr-5 hover:text-gray-900"><i class="el-icon el-icon-success"></i> {{ keys.interface }}</a> -->
                <div class="p-2 w-full" v-if="keys.name === item">
                  <div class="rounded flex items-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="3"
                      class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                      <path d="M22 4L12 14.01l-3-3"></path>
                    </svg>
                    <span class="title-font font-medium">{{ keys.interface }}</span>
                  </div>
                </div>
              </div>
            </nav>
            <div class="flex justify-center">
              <button
                @click="payPro(item)"
                class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                立即选购
              </button>
              <button
                @click="goDocs(item.docUrl)"
                class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
              >
                查看文档
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import rotationVue from '@/components/rotation.vue'

import { useHomeStore } from '@/store/home'
import { useOrderStore } from '@/store/order'
import { getServiceProductList, queryKeyImpl, queryServiceList } from '@/api/product'
export default {
  name: 'serviceProducts',
  components: {
    rotationVue,
  },
  props: {},
  data() {
    return {
      title: '服务产品',
      productList: [],
      interfaces: [],
    }
  },
  computed: {
    curentProduct() {
      return useHomeStore().getCurentProduct
    },
  },
  watch: {
    curentProduct() {
      this.init(this.curentProduct.title)
    },
  },
  created() {
    // // 获取路由传过来的参数
    // this.title = this.$route.params.title
    // 获取服务产品列表
    this.init(this.curentProduct.className)
  },
  mounted() {},
  methods: {
    init(name) {
      let params = {
        serviceName: name,
        TELLERCOMPANY: '',
      }
      queryServiceList(params).then(res => {
        if (res.data.rs === '1') {
          let productList = res.data.queryServiceList
          console.log('productList:', productList)
          useHomeStore().setStoreProductList(productList)
          // this.productList = productList.map(item => {
          //   return {
          //     ...item,
          //     goodsName: item.srlID,
          //     // validity: item.priceAttrValueList.split('tps.')[1],
          //     validity: item.priceAttrValueList,
          //     price: item.priceAfterDiscount,
          //     num: 1,
          //   }
          // })
          // 产品列表
          // let lists = []
          // productList.forEach(e => {
          //   // srlID去重
          //   if (!lists.includes(e.srlID)) {
          //     lists.push(e.srlID)
          //   }
          // })
          this.productList = productList
          // console.log('this.productList:', lists)

          this.getKeyImpl(productList)
          // 过滤对应产品的有效期列表
          // let newLists = []
          // // 产品对应的有效期和价格列表
          // productList.forEach(e => {
          //   lists.forEach(item => {
          //     if (e.srlID === item) {
          //       newLists.push({
          //         goodsName: e.srlID,
          //         validity: e.priceAttrValueList,
          //         price: e.priceAfterDiscount,
          //       })
          //     }
          //   })
          // })
          // console.log('newLists:', newLists)
        } else {
          console.log(res.data.rs)
        }
      })
    },
    goDocs(url) {
      window.open(url)
    },
    goHome() {
      this.$router.push('/')
    },
    getKeyImpl(lists) {
      console.log('lists', lists)
      let newLists = []
      // lists.forEach(e => {
      //   newLists.push({
      //     name: e,
      //   })
      // })
      // console.log('new lists:', newLists)
      queryKeyImpl().then(res => {
        if (res.data.rs === '1') {
          console.log('queryKeyImpl:', res.data.queryKeyImpl)
          let keys = res.data.queryKeyImpl
          keys.forEach(e => {
            lists.forEach(list => {
              let list1
              if (list.srlID.indexOf('-')) {
                list1 = list.srlID.split('-')[0]
              } else {
                list1 = list.srlID
              }
              if (e.keyName === list1) {
                newLists.push({
                  name: list,
                  interface: e.implName,
                })
              }
            })
          })

          console.log('new lists:', newLists)
          this.interfaces = newLists
        } else {
          console.log('queryKeyImpl:', res.data.rs)
        }
      })
    },
    payPro(item) {
      // price和num 转为数字类型
      let currentGoodsNew = {
        srlID: item,
        productName: this.curentProduct.title,
      }

      useOrderStore().setCurrentGoods(currentGoodsNew)
      this.$router.push({
        path: '/confirm',
        params: {
          title: this.title,
          srlID: item,
        },
      })
    },
  },
}
</script>

<style scoped lang="less">
.breadcrumbBox {
  padding: 20px;
}
.title {
  font-size: 24px;
  margin: 1.5rem 0;
  text-align: center;
}
.el-card {
  margin: 1rem;
  text-align: center;
  .cardMain {
    padding: 1rem;
    p {
      width: 70%;
      margin: auto;
      font-size: small;
      color: #999;
      margin-top: 1rem;
      margin-bottom: 1rem;
      .el-icon-success:before {
        color: #34d058;
        // color: seagreen;
      }
    }
    .cardMain-left {
      text-align: left;
    }
    .price {
      font-size: large;
      color: #ff6600;
    }
    .el-button {
      width: 40%;
      margin-top: 1rem;
      margin-bottom: 0.5rem;
    }
  }
}
</style>
