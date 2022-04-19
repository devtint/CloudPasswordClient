<template>
  <div class="home">
    <!-- 轮播图 -->
    <rotation-vue />
    <main>
      <div class="title">服务产品</div>
      <el-row :gutter="0">
        <el-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="8"
          :xl="1"
          v-for="(item, index) in cardData"
          :key="index"
        >
          <el-card>
            <el-image :src="item.imgUrl" style="width: 100px" />
            <div class="cardMain">
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
              <el-button type="primary" size="small" plain>查看详情</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </main>
    <footer>
      <div class="title">购物流程</div>
      <el-steps :active="5" align-center>
        <el-step title="用户注册" description="用户注册"></el-step>
        <el-step title="用户登录" description="用户登录"></el-step>
        <el-step
          title="提交订单"
          description="挑选需要购买的服务产品，提交订单。"
        ></el-step>
        <el-step title="线下付款" description="线下完成订单的支付。"></el-step>
        <el-step title="上传凭证" description="上传线下支付的凭证。"></el-step>
      </el-steps>
    </footer>
  </div>
</template>

<script>
import rotationVue from './components/rotation.vue'
export default {
  name: 'home',
  components: {
    rotationVue,
  },
  props: {},
  data() {
    return {
      cardData: [
        {
          imgUrl: 'http://res.tintjs.com/img/v2_云服务.png',
          title: '云服务',
          desc: '云服务器ECS、GPU云服务器、块存储、FPGA云服务器···',
        },
        {
          imgUrl: 'http://res.tintjs.com/img/v2_密钥托管.png',
          title: '密钥托管',
          desc: '密钥托管、密钥管理、密钥绑定、密钥解绑···',
        },
        {
          imgUrl: 'http://res.tintjs.com/img/v2_云证书托管.png',
          title: '云证书托管',
          desc: '云证书托管、云证书管理、云证书绑定、云证书解绑···',
        },
        {
          imgUrl: 'http://res.tintjs.com/img/v2_云密码服务.png',
          title: '云密码服务',
          desc: '云密码服务、云密码管理、云密码绑定、云密码解绑···',
        },
        {
          imgUrl: 'http://res.tintjs.com/img/v2_租赁云密码机.png',
          title: '租赁云密码机',
          desc: '租赁云密码机、租赁云密码机管理、租赁云密码机绑定、租赁云密码机解绑···',
        },
      ],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
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
    p {
      font-size: small;
      color: #999;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }
}
</style>
