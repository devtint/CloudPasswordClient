<template>
  <div class="loginPhone">
    <el-form
      class="login-form"
      ref="login-form"
      :model="user"
      :rules="formRules"
    >
      <el-form-item prop="mobile">
        <el-input
          v-model="user.mobile"
          placeholder="请输入手机号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <div class="get_code">
          <el-input
            v-model="user.code"
            placeholder="请输入验证码"
            show-password
            clearable
          >
            <!-- 发送验证码 -->
          </el-input>
          <el-button
            class="get-btn"
            type="primary"
            :disabled="codeDisabled"
            @click="getCode"
            >{{ codeText }}</el-button
          >
        </div>
      </el-form-item>
      <el-form-item prop="agree2">
        <div class="agreement">
          <el-checkbox v-model="user.agree"
            >我已阅读并同意
            <a class="userAgreement" :href="userAgreement">《用户协议》</a>
          </el-checkbox>
          <el-link class="forgotPassword" href="javascript:;" @click="onForget"
            >忘记密码</el-link
          >
        </div>
      </el-form-item>
      <el-form-item>
        <div class="loginBox">
          <el-button
            class="login-btn"
            type="primary"
            @click="onLogin"
            :loading="loginLoading"
            >登录</el-button
          >
          <el-button
            class="login-btn"
            type="primary"
            @click="onRegister"
            :loading="loginLoading"
            >注册</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getPK } from '@/api/user'
import { Message } from 'element-ui'
export default {
  name: 'loginPhone',
  components: {},
  props: {},
  data() {
    return {
      userAgreement: '#',
      codeText: '获取验证码',
      codeDisabled: false,
      user: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree2: false, // 是否同意协议
      },
      // checked: false, // 是否同意协议的选中状态
      loginLoading: false, // 登录的 loading 状态
      formRules: {
        // 表单验证规则配置
        // 要验证的数据名称：规则列表【】
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: '请输入正确的号码格式',
            trigger: 'blur',
          },
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          {
            pattern: /^\d{6}$/,
            message: '请输入正确的号码格式',
            trigger: 'blur',
          },
        ],
        agree2: [
          {
            // 自定义校验规则：https://element.eleme.cn/#/zh-CN/component/form#zi-ding-yi-xiao-yan-gui-ze
            // 验证通过：callback()
            // 验证失败：callback(new Error('错误消息'))
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请勾选同意用户协议'))
              }
            },
            trigger: 'change',
          },
        ],
      },
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getPKFn()
  },
  mounted() {},
  methods: {
    getPKFn() {
      getPK()
        .then(res => {
          console.log('PK res', res)
          this.pkbase64 = res.data.pkkey
        })
        .catch(err => {
          console.log(err)
        })
    },
    onForget() {
      // this.$message('忘记密码')
      console.log('忘记密码')
    },
    onRegister() {
      this.$router.push({
        name: 'register',
      })
    },
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
      // 登录按钮的loading...
      this.loginLoading = true
      // 接口封装后
      login(this.user)
        .then(res => {
          // 登录成功
          // console.log(res)
          this.$message({
            message: '恭喜你，登录成功!',
            type: 'success',
          })

          // 关闭 loading...
          this.loginLoading = false

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

          // 关闭 loading...
          this.loginLoading = false
        })
      // 处理后端响应结果
      //   成功:xxx
      //   失败:xxx
    },
    getCode() {
      // 先验证手机号是否合法
      this.$refs['login-form'].validateField('mobile', (valid, error) => {
        console.log('valid', valid)
        console.log('error', error)
        if (valid) {
          Message(`${valid}`)
          console.log(valid)
          return
        } else {
          console.log('通过')
          // 获取验证码
          // 倒计时
          this.codeText = '获取验证码'
          this.codeDisabled = true
          let count = 60
          this.codeTimer = setInterval(() => {
            count--
            if (count <= 0) {
              clearInterval(this.codeTimer)
              this.codeText = '重新获取'
              this.codeDisabled = false
              count = 60
            } else {
              this.codeText = `${count}s后重试`
            }
          }, 1000)
        }
      })
    },
  },
}
</script>

<style scoped lang="less">
.loginBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .login-btn {
    width: 50%;
  }
}
.agreement {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.get_code {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .get-btn {
    margin-left: 10px;
  }
}
.userAgreement {
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: #00a0e9;
  }
}
</style>
