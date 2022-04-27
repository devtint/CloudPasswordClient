<template>
  <div class="serviceProducts">
    <!-- 轮播图 -->
    <!-- <rotation-vue /> -->
    <div slot="header" class="breadcrumbBox">
      <!-- 面包屑路径导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ curentProduct.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 面包屑路径导航  end -->
    </div>
    <main>
      <div class="title">{{ title }}</div>
      <el-row :gutter="0">
        <el-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :xl="1"
          v-for="(item, index) in productList"
          :key="index"
        >
          <el-card>
            <div class="cardMain">
              <h3>{{ item.goodsName }}</h3>
              <p>有效期: {{ item.validity }}</p>
              <p class="price">￥{{ item.price }}</p>
              <el-button type="warning" size="small" plain @click="payPro(item)"
                >购买</el-button
              >
            </div>
          </el-card>
        </el-col>
      </el-row>
    </main>
  </div>
</template>

<script>
import rotationVue from '@/components/rotation.vue'

import { useHomeStore } from '@/store/home'
import { useOrderStore } from '@/store/order'
import { getServiceProductList } from '@/api/product'
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
    }
  },
  computed: {
    curentProduct() {
      return useHomeStore().getCurentProduct
    },
  },
  watch: {},
  created() {
    // // 获取路由传过来的参数
    // this.title = this.$route.params.title
    // 获取服务产品列表
    this.init(this.curentProduct.title)
  },
  mounted() {},
  methods: {
    init(name) {
      let params = {
        serviceName: name,
        TELLERCOMPANY: '',
      }
      getServiceProductList(params).then(res => {
        if (res.data.rs === '1') {
          let productList = res.data.queryServiceProductList
          console.log('productList:', productList)
          this.productList = productList.map(item => {
            return {
              ...item,
              goodsName: item.srlID,
              validity: item.priceAttrValueList,
              price: item.priceAfterDiscount,
              num: 1,
            }
          })
        } else {
          console.log(res.data.rs)
        }
      })
    },
    payPro(item) {
      // price和num 转为数字类型
      let currentGoodsNew = {
        ...item,
        price: Number(item.price),
        num: Number(item.num),
      }
      useOrderStore().setCurrentGoods(currentGoodsNew)
      this.$router.push({
        path: '/confirm',
        params: {
          title: this.title,
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
    margin: 1rem;
    p {
      font-size: small;
      color: #999;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
    .price {
      font-size: large;
      color: #ff6600;
    }
  }
}
</style>
