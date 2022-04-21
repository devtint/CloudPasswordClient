<template>
  <div class="login-container">
    <!--
      el-form 表单组件
      每个表单项都必须使用 el-form-item 组件包裹
    -->

    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo">
          <el-image :src="require('@/views/layout/logo.png')"></el-image>
        </div>
      </div>
      <!--
        配置Form表单验证:
        1、必须给el-form组件绑定 model 表单数据对象 如  :model="user"
        2、给需要验证的表单项 el-form-item 设置 prop 属性 如  prop="mobile"
            注意：prop 属性需要指定表单对象中的数据名称
        3、通过 el-from 组件的 rules 属性配置验证规则

        手动表单表单验证
        1、给 el-form 设置 ref 再起个名字（随便，不重复即可）
        2、通过 ref 获取 el-form 组件，调用组件的 validate 进行验证
        -->

      <el-tabs
        type="border-card"
        stretch
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane label="账号登录" name="1">
          <login-account></login-account>
        </el-tab-pane>
        <el-tab-pane label="手机验证码登录" name="2">
          <login-phone></login-phone>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
// 加载user接口模块
// import { login } from '@/api/user'
import loginPhone from './components/loginPhone.vue'
import loginAccount from './components/loginAccount.vue'
export default {
  name: 'LoginIndex',
  components: {
    loginPhone,
    loginAccount,
  },
  props: {},
  data() {
    return {
      activeName: '1',
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleClick(tab, event) {},
    onLogin() {
      // 获取表单数据(根据接口要求绑定数据)
      // const user = this.user

      // 表单验证
      // this.$refs['login-form'].validate((valid, error) => {
      //   console.log(valid)
      //   console.log(error)
      // })
      // validate 方法是异步的
      this.$refs['login-form'].validate(valid => {
        // 如果表单验证失败，停止请求提交
        if (!valid) {
          return
        }
        // 验证通过,提交登录
        this.login()
      })
    },

    login() {
      // 登录按钮的loding...
      this.loginLoding = true
      // 接口封装后
      login(this.user)
        .then(res => {
          // 登录成功
          // console.log(res)
          this.$message({
            message: '恭喜你，登录成功!',
            type: 'success',
          })

          // 关闭 loding...
          this.loginLoding = false

          // 将接口返回的用户相关数据放到本地存储，方便应用数据共享
          // window.localStorage.setItem('user', res.data.data)
          // 但是本地存储只能存储字符串
          // 想要存储对象、数组类型的数据，则把他们转为 JSON 格式字符串进行存储
          window.localStorage.setItem('user', JSON.stringify(res.data.data))

          // 跳转到首页
          // this.$router.push('./')  //方法一，直接输入路径

          this.$router.push({
            name: 'home',
          })
        })
        .catch(err => {
          // 登录失败
          console.log('登录失败', err)
          this.$message.error('登录失败，手机号或者验证码错误!')

          // 关闭 loding...
          this.loginLoding = false
        })
      // 处理后端响应结果
      //   成功:xxx
      //   失败:xxx
    },
  },
}
</script>

<style scoped lang="less">
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background: url('./login_bg.jpg') no-repeat;
  background-size: cover;
  .login-form-wrap {
    min-width: 300px;
    padding: 20px 50px 100px;
    // margin: 50px;
    background-color: #fff;
    .login-head {
      display: flex;
      justify-content: center;
      .logo {
        width: 200px;
        height: 30px;

        // background: url('./logo_index.png') no-repeat;
        color: #409eff;
        font-size: 26px;
        text-align: center;
        margin-bottom: 3rem;
      }
    }
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
