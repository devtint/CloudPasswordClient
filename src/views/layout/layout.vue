<template>
  <div class="layout">
    <el-container>
      <div class="header">
        <el-header>
          <div class="logo" @click="toHome">
            <img src="./logo.png" alt="" />
          </div>
          <div class="menu">
            <app-aside class="aside-menu" />
          </div>
          <div class="user">
            <user-link />
          </div>
        </el-header>
      </div>
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- <el-footer> -->
      <div class="el-footer">
        <div class="footer">
          <!-- 备案信息 -->
          <div class="footer-record">
            <span>Copright © 2021</span>
            <span>北京江南天安科技有限公司</span>
            <span>京公网安备11010802028740号</span>
            <el-link
              href="https://beian.miit.gov.cn/"
              target="_blank"
              :underline="false"
              >京ICP备08012318号</el-link
            >
          </div>
        </div>
        <!-- </el-footer> -->
      </div>
    </el-container>
  </div>
</template>

<script>
import AppAside from './components/aside'
import userLink from './components/userLink'
export default {
  name: 'layout',
  components: {
    AppAside,
    userLink,
  },
  props: {},
  data() {
    return {
      activeIndex: '1',
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    toHome() {
      this.$router.push('/')
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.header {
  top: 0;
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 60px;
  background-color: white;
}
.el-header {
  // line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    // padding-top: 1rem;
    padding-left: 1rem;
    cursor: pointer;
  }
}
.el-main {
  margin: 0;
  padding: 0;
  margin-top: 60px;
  margin-bottom: 3rem;
}
.el-footer {
  background-color: white;
  position: fixed;
  color: #333;
  text-align: center;
  height: 40px;
  line-height: 40px;
  left: 0;
  bottom: 0;
  right: 0;
  // top: 0;
  margin: auto;
  z-index: 3002;

  .footer {
    // padding: 0 20px;
    display: flex;
    height: 40px;
    justify-content: center;
    align-items: center;
    font-size: small;
    .footer-record {
      display: flex;
      align-items: center;
      span {
        margin-right: 10px;
      }
    }
  }
}

// .el-aside {
//   background-color: #d3dce6;
//   color: #333;
//   text-align: center;
//   line-height: 200px;
// }

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
