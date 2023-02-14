<template>
  <el-menu default-active="/" text-color="#111" active-text-color="#2b4587" router mode="horizontal">
    <!-- <el-menu-item index="/"> -->
    <!-- <i class="el-icon-s-home"></i> -->
    <!-- <span slot="title">首页</span> -->
    <!-- </el-menu-item> -->
    <el-menu-item index="">
      <span slot="title">
        <el-dropdown placement="bottom">
          <span class="el-dropdown-link">服务产品<i class="el-icon-arrow-down el-icon--right top-arrow-down"></i></span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item>
              <p class="userName">{{ userName }}</p>
              <span class="userID">账号ID：{{ memberID }}</span>
            </el-dropdown-item> -->
            <!-- <el-dropdown-item><span class="userID">账号ID:{{ memberID }}</span></el-dropdown-item> -->
            <!-- <el-dropdown-item divided @click.native="toPersonalData">账号信息</el-dropdown-item> -->
            <el-dropdown-item @click.native="toProduct('云密钥托管服务')">云密钥托管服务</el-dropdown-item>
            <el-dropdown-item @click.native="toProduct('云证书托管服务')">云证书托管服务</el-dropdown-item>
            <el-dropdown-item @click.native="toProduct('云密码机租赁服务')">云密码机租赁服务</el-dropdown-item>
            <!-- <el-dropdown-item divided @click.native="logout" v-if="isLogin">退出登录</el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </el-menu-item>
    <el-menu-item index="#">
      <span>
        <a class="docsBtn" href="http://www.paytunnel.cn/CloudPasswordClient/docs/api/" target="_blank" slot="title">开发文档</a>
      </span>
    </el-menu-item>
    <!-- <el-menu-item index="/secretKey"> -->
    <!-- <i class="el-icon-s-home"></i> -->
    <!-- <span slot="title">密钥管理</span> -->
    <!-- </el-menu-item> -->
    <!-- <el-menu-item index="/cipherMachine"> -->
    <!-- <span slot="title">云密码机管理</span> -->
    <!-- </el-menu-item> -->
  </el-menu>
</template>

<script>
import { useHomeStore } from '@/store/home'
export default {
  name: 'AppAside',
  components: {},
  props: [],
  data() {
    return {
      // isCollapsed: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    toProduct(title) {
      let item = {
        title: title,
      }
      useHomeStore().setCurentProduct(item)
      this.$router.push({
        name: 'products',
        params: {
          title: item.title,
          // details: item,
        },
      })
    },
  },
}
</script>

<style scoped lang="less">
.top-arrow-down {
  font-size: small;
  margin-left: -2px;
}
.docsBtn {
  text-decoration: none;
  line-height: 60px;
  color: #606266;
}
</style>
