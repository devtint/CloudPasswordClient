<template>
  <div class="home">
    <!-- 轮播图 -->
    <rotation-vue />
    <main>
      <!-- <div class="title">服务产品</div> -->
      <!-- <el-row :gutter="0">
        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="1" v-for="(item, index) in cardData" :key="index">
          <el-card>
            <el-image :src="item.imgUrl" style="width: 100px" />
            <div class="cardMain">
              <h3>{{ item.className }}</h3>
              <p>{{ item.remark }}</p>
              <el-button type="primary" size="small" plain @click="checkTheDetails(item)">查看详情</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row> -->

      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
            <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">SERVICE PRODUCTS</h2>
            <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900">热门服务产品</h1>
          </div>
          <div class="flex flex-wrap -m-4">
            <div class="p-4 md:w-1/3" v-for="(item, index) in cardData" :key="index">
              <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <h2 class="text-gray-900 text-lg title-font font-medium">{{ item.className }}</h2>
                </div>
                <div class="flex-grow">
                  <p class="leading-relaxed text-base">
                    {{ item.remark }}
                    <!-- Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine. -->
                  </p>
                  <a class="mt-3 text-indigo-500 inline-flex items-center cursor-pointer" @click="checkTheDetails(item)"
                    >了解详情
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- <section class="text-gray-600 body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap p-8" v-for="(item, index) in cardData" :key="index">
            <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/300x200" />
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">SERVICE NAME</h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{{ item.className }}</h1>
              <div class="flex mb-4">
                <span class="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span class="text-gray-600 ml-3">4 Reviews</span>
                </span>
              </div>
              <p class="leading-relaxed">
                {{ item.remark }}
              </p>
              <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div class="flex">
                  <button class="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button class="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button class="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                </div>
                <div class="flex ml-6 items-center"></div>
              </div>
              <div class="flex">
                <span class="title-font font-medium text-2xl text-gray-900">$58.00</span>
                <button class="flex items-center ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  查看详情
                </button>
              </div>
            </div>
          </div>
        </div>
      </section> -->
    </main>
    <footer>
      <div class="title">购物流程</div>
      <div class="shoppingDiv">
        <el-image class="shoppingImg" :src="require('@/views/home/images/shopping.png')" style="width: 60%" />
      </div>
      <!-- <el-steps :active="5" align-center>
        <el-step title="用户注册" description="用户注册"></el-step>
        <el-step title="用户登录" description="用户登录"></el-step>
        <el-step
          title="提交订单"
          description="挑选需要购买的服务产品，提交订单。"
        ></el-step>
        <el-step title="线下付款" description="线下完成订单的支付。"></el-step>
        <el-step title="上传凭证" description="上传线下支付的凭证。"></el-step>
      </el-steps> -->
    </footer>
  </div>
</template>

<script>
import rotationVue from '@/components/rotation.vue'

import { useHomeStore } from '@/store/home'
import { queryServiceClassify } from '@/api/home'
export default {
  name: 'home',
  components: {
    rotationVue,
  },
  props: {},
  data() {
    return {
      // 云密钥托管服务
      // 完整性校验密钥（1年/2年），隐私数据保护密钥（1年/2年/3年/永久有效）

      // 云证书托管服务
      // 数字签名证书-X509证书（1年/2年/3年/永久有效）

      // 云密码服务
      // 签名服务（RSA，RSA/SM2，SM1）

      // 云密码机租赁服务
      // 云密码机租赁服务（DES/3DES/RSA，DES/3DE S/RSA/SM1/SM2/SM3/SM4，SM1/SM2/SM3/SM4）
      cardData: [
        {
          imgUrl: require('@/views/home/images/v2_密钥托管.png'),
          className: '云密钥托管服务',
          remark: '完整性校验密钥（1年/2年），隐私数据保护密钥（1年/2年/3年/永久有效）',
        },
        {
          imgUrl: require('@/views/home/images/v2_云密码服务.png'),
          className: '云证书托管服务',
          remark: '数字签名证书-X509证书（1年/2年/3年/永久有效）',
        },
        // {
        //   imgUrl: require('@/views/home/images/v2_云证书托管.png'),
        //   title: '云密码服务',
        //   remark: '签名服务（RSA，RSA/SM2，SM1）',
        // },
        {
          imgUrl: require('@/views/home/images/v2_租赁云密码机.png'),
          className: '云密码机租赁服务',
          remark: '云密码机租赁服务（DES/3DES/RSA，DES/3DE S/RSA/SM1/SM2/SM3/SM4，SM1/SM2/SM3/SM4）',
        },
      ],
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getServiceClassify()
    let afreshLogin = window.sessionStorage.getItem('afreshLogin')
    if (afreshLogin) {
      // this.checklogin()
    }
  },
  mounted() {},
  methods: {
    getServiceClassify() {
      queryServiceClassify().then(res => {
        console.log('queryServiceClassify:', res.data.queryServiceClassify)
        this.cardData = res.data.queryServiceClassify
      })
    },
    checkTheDetails(item) {
      useHomeStore().setCurentProduct(item)
      this.$router.push({
        name: 'products',
        params: {
          title: item.className,
          details: item,
        },
      })
    },
  },
}
</script>

<style scoped lang="less">
.title {
  font-size: 24px;
  margin: 1.5rem 0;
  text-align: center;
}
.el-card {
  margin: 1rem;
  text-align: center;
  .cardMain {
    margin: 1rem;
    height: 7em;
    p {
      font-size: small;
      color: #999;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }
}
.shoppingDiv {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
