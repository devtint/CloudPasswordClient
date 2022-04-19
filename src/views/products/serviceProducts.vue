<template>
  <div class="serviceProducts">
    <!-- 轮播图 -->
    <rotation-vue />
    <main>
      <div class="title">密钥托管服务</div>
      <el-row :gutter="0">
        <el-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :xl="1"
          v-for="(item, index) in cardData"
          :key="index"
        >
          <el-card>
            <div class="cardMain">
              <h3>{{ item.title }}</h3>
              <p>有效期: {{ item.validity }}</p>
              <p class="price">￥{{ item.price }}</p>
              <el-button type="warning" size="small" plain>购买</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </main>
  </div>
</template>

<script>
import rotationVue from '@/components/rotation.vue'
export default {
  name: 'serviceProducts',
  components: {
    rotationVue,
  },
  props: {},
  data() {
    return {
      cardData: [
        {
          title: '完整性校验密钥',
          validity: '1年',
          price: '120.00',
        },
        {
          title: '隐私数据保护密钥',
          validity: '1年',
          price: '220.00',
        },
        {
          title: '完整性校验密钥',
          validity: '1年',
          price: '170.00',
        },
        {
          title: '完整性校验密钥',
          validity: '2年',
          price: '190.00',
        },
        {
          title: '完整性校验密钥',
          validity: '3年',
          price: '420.00',
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
    .price {
      font-size: large;
      color: #ff6600;
    }
  }
}
</style>
