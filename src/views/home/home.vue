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
              <el-button
                type="primary"
                size="small"
                plain
                @click="checkTheDetails(item)"
                >查看详情</el-button
              >
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
import rotationVue from '@/components/rotation.vue'
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
          title: '云密钥托管服务',
          desc: '完整性校验密钥（1年/2年），隐私数据保护密钥（1年/2年/3年/永久有效）',
        },
        {
          imgUrl: require('@/views/home/images/v2_云密码服务.png'),
          title: '云证书托管服务',
          desc: '数字签名证书-X509证书（1年/2年/3年/永久有效）',
        },
        {
          imgUrl: require('@/views/home/images/v2_云证书托管.png'),
          title: '云密码服务',
          desc: '签名服务（RSA，RSA/SM2，SM1）',
        },
        {
          imgUrl: require('@/views/home/images/v2_租赁云密码机.png'),
          title: '云密码机租赁服务',
          desc: '云密码机租赁服务（DES/3DES/RSA，DES/3DE S/RSA/SM1/SM2/SM3/SM4，SM1/SM2/SM3/SM4）',
        },
      ],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    checkTheDetails(item) {
      this.$router.push({
        name: 'products',
        params: {
          title: item.title,
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
    height: 7rem;
    p {
      font-size: small;
      color: #999;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }
}
</style>
