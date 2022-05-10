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
    <div class="loginBox" v-if="!isLogin">
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
    <el-link href="javascript:;" :underline="false" v-else>
      <div class="avatar-wrap">
        <el-dropdown>
          <span class="el-dropdown-link">
            <!-- <i class="icon icon-zhanghao"></i> -->
            <!-- <el-avatar size="large" :src="circleUrl"></el-avatar> -->

            <div class="pls-nav-bubble-wrap pls-nav-account">
              <a href="javascript:void 0;" class="pls-nav-bubble-trigger"
                ><i
                  class="pls-nav-bubble-trigger-icon"
                  style="
                    background-image: url('https://cloudcache.tencentcs.com/qcloud/portal/kit/images/default-avatar.de71167d.svg');
                  "
                ></i
              ></a>
            </div>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toLogin">{{
              userName
            }}</el-dropdown-item>
            <el-dropdown-item @click.native="toLogin"
              >ID:{{ memberID }}</el-dropdown-item
            >
            <el-dropdown-item @click.native="toMyOrder"
              >我的订单</el-dropdown-item
            >
            <el-dropdown-item @click.native="logout" v-if="isLogin"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-link>
  </div>
</template>

<script>
import { BASE_HREF } from '@/global/config'
export default {
  name: 'userLink',
  components: {},
  props: {},
  data() {
    return {
      isLogin: false,
      userName: '',
      memberID: '',
      // circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      circleUrl:
        'https://cloudcache.tencentcs.com/qcloud/portal/kit/images/default-avatar.de71167d.svg',
    }
  },
  computed: {},
  watch: {},
  created() {
    this.userName = window.localStorage.getItem('userName')
    this.memberID = window.localStorage.getItem('memberID')
    if (this.memberID) {
      this.isLogin = true
    }
  },
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
    logout() {
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('userName')
      window.localStorage.removeItem('memberID')
      window.location.href = BASE_HREF
      Message({
        message: '已退出登录',
        type: 'success',
      })
    },
  },
}
</script>

<style scoped lang="less">
.userLink .loginBox {
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
.el-link {
  font-size: 25px;
  color: #409eff;
  margin-right: 20px;
}
.pls-nav-bubble-trigger-icon {
  display: block;
  box-sizing: border-box;
  width: 38px;
  height: 38px;
  border: 2px solid #fff;
  background-image: linear-gradient(0deg, #ffffff 0%, #f3f5f8 100%);
  box-shadow: 8px 8px 20px 0 rgb(55 99 170 / 30%);
  border-radius: 50%;
  background: #f3f5f8;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
