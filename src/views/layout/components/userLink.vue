<template>
  <div class="userLink">
    <!-- <el-link href="javascript:;" :underline="false">
      <i class="icon icon-sousuo"></i>
    </el-link> -->
    <!-- <el-link href="javascript:;" :underline="false">
      <div class="avatar-wrap">
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="icon icon-zhanghao"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toLogin"
              >用户登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-link>
    <el-link href="javascript:;" :underline="false">
      <i class="icon icon-envelope"></i>
    </el-link>
    <el-link href="javascript:;" :underline="false">
      <div class="avatar-wrap">
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="icon icon-shenglvehao"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toMyOrder"
              >我的订单</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-link> -->
    <!-- <el-button type="text">登录</el-button>
    <el-button type="primary">立即注册</el-button> -->
    <a
      href="javascript:void 0;"
      hotrep="hp.pc.topnav.login"
      rel="nofollow"
      class="login_btn"
      @click="toLogin"
      >登录</a
    >
    <a
      href="javascript:void 0;"
      hotrep="hp.pc.topnav.register"
      rel="nofollow"
      class="register_btn"
      @click="toRegister"
      >免费注册</a
    >
  </div>
</template>

<script>
export default {
  name: 'userLink',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    toMyOrder() {
      this.$router.push('/order')
    },
    toLogin() {
      this.$router.push('/login')
    },
    toRegister() {
      this.$router.push('/register')
    },
  },
}
</script>

<style scoped lang="less">
.userLink {
  display: flex;
  align-items: center;
  .el-link {
    margin-left: 1rem;
  }
  .el-dropdown-link {
    cursor: pointer;
    // color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
.login_btn {
  display: block;
  margin-right: 24px;
  font-weight: 500;
  font-size: 14px;
  color: #16181a;
  line-height: 62px;
  &:hover {
    cursor: pointer;
    color: #409eff;
  }
}
a {
  // 去掉下划线
  text-decoration: none;
}

.register_btn {
  display: block;
  box-sizing: border-box;
  height: 62px;
  padding: 0 20px;
  font-size: 14px;
  color: #fff;
  line-height: 62px;
  background-color: #409eff;
  color: #fff;
  &:hover {
    cursor: pointer;
    background-color: #65acf2;
  }
}
</style>
