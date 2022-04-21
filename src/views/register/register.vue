<template>
  <div class="loginAccount">
    <div class="login-container">
      <!--
      el-form 表单组件
      每个表单项都必须使用 el-form-item 组件包裹
    -->

      <div class="login-form-wrap">
        <div class="login-head">
          <h2 class="logo">
            <el-image :src="require('@/views/layout/logo.png')"></el-image>
          </h2>
        </div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="headerTitle">账号注册</span>
          </div>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
          >
            <el-form-item prop="account">
              <el-input
                v-model="ruleForm.account"
                placeholder="请输入账号"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input
                type="password"
                placeholder="请输入密码"
                v-model="ruleForm.pass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input
                type="password"
                placeholder="请再次输入确认密码"
                v-model="ruleForm.checkPass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <div class="btnBox">
                <el-button
                  type="primary"
                  class="btn"
                  @click="submitForm('ruleForm')"
                  >提交</el-button
                >
                <el-button class="btn" @click="resetForm('ruleForm')"
                  >重置</el-button
                >
              </div>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  components: {},
  props: {},
  data() {
    var validateAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        account: '',
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        account: [{ validator: validateAccount, trigger: 'blur' }],
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onForget() {
      console.log('忘记密码')
    },
    onRegister() {
      this.$router.push({
        name: 'register',
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style scoped lang="less">
.headerTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #4f4f4f;
}
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
.loginAccount {
  width: 100%;
}
.btnBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .btn {
    width: 50%;
  }
}
// .forgotPassword {
//   float: right;
//   // margin-top: 10px;
// }
.agreement {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
