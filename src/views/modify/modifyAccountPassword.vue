<template>
  <div class="modifyAccountPassword">
    <div class="register_header">
      <el-page-header
        @back="goBack"
        title=""
        :content="headerContent"
      ></el-page-header>
    </div>
    <div class="login-container">
      <!--
      el-form 表单组件
      每个表单项都必须使用 el-form-item 组件包裹
    -->
      <div class="forgetPassword" v-if="!isModifyShow">
        <div class="forgetPassword_title">
          <p>修改密码需要进行身份验证</p>
          <p>请先选择验证方式</p>
        </div>
        <!-- 修改密码选择验证方式 -->
        <!-- <div class="phoneAction action">
          <span>通过手机验证</span>
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="oldPassword action">
          <span>通过旧密码验证</span>
          <i class="el-icon-arrow-right"></i>
        </div> -->
        <el-card
          class="validator-card"
          shadow="hover"
          @click.native="modifyOfPhone"
        >
          <div class="action">
            <span>通过手机号验证</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </el-card>
        <el-card
          class="validator-card"
          shadow="hover"
          @click.native="modifyOfOldPsw"
        >
          <div class="action">
            <span>通过旧密码验证</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </el-card>
      </div>
      <div class="login-form-wrap" v-else>
        <div class="login-head">
          <h2 class="logo">
            <el-image :src="require('@/views/layout/logo.png')"></el-image>
          </h2>
        </div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="float: left" @click="isModifyShow = !isModifyShow"
              ><i class="el-icon-arrow-left"></i
            ></span>
            <span class="headerTitle">{{ headerTitle }}</span>
          </div>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="modifyRef"
            class="demo-ruleForm"
            label-position="right"
            label-width="80px"
          >
            <!-- <el-form-item prop="enterpriseName" label="企业名称">
              <el-input
                v-model="ruleForm.enterpriseName"
                placeholder="请输入企业名称"
                clearable
              ></el-input>
            </el-form-item> -->
            <!-- <el-form-item prop="userName" label="姓名">
              <el-input
                v-model="ruleForm.userName"
                placeholder="请输入姓名"
                clearable
              ></el-input>
            </el-form-item> -->
            <el-form-item prop="account" label="账号">
              <el-input
                v-model="ruleForm.account"
                placeholder="请输入账号"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="phone"
              label="手机号码"
              v-if="modifyValidatorAction === 'phone'"
            >
              <el-input
                v-model="ruleForm.phone"
                placeholder="请输入手机号码"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="code"
              label="验证码"
              v-if="modifyValidatorAction === 'phone'"
            >
              <div class="get_code">
                <el-input
                  v-model="ruleForm.code"
                  placeholder="请输入验证码"
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
            <el-form-item
              prop="oldPass"
              label="旧密码"
              v-if="modifyValidatorAction !== 'phone'"
            >
              <el-input
                type="password"
                placeholder="请输入旧密码"
                v-model="ruleForm.oldPass"
                autocomplete="off"
                show-password
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="pass" label="新密码">
              <el-input
                type="password"
                placeholder="请输入新密码"
                v-model="ruleForm.pass"
                autocomplete="off"
                show-password
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="checkPass" label="确认密码">
              <el-input
                type="password"
                placeholder="请再次输入确认密码"
                v-model="ruleForm.checkPass"
                autocomplete="off"
                show-password
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item>
              <div class="btnBox">
                <el-button
                  type="primary"
                  class="btn"
                  @click="submitForm('modifyRef')"
                  >提交</el-button
                >
                <el-button class="btn" @click="resetForm('modifyRef')"
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
import { getPK, getSmsCode } from '@/api/user'
export default {
  name: 'modifyAccountPassword',
  components: {},
  props: {},
  data() {
    var validateAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (value === this.ruleForm.oldPass) {
        callback(new Error('新旧密码不能一致!'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'))
      } else {
        if (this.ruleForm.pass !== '') {
          this.$refs.ruleForm.validateField('pass')
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
    // var validateEnterpriseName = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('企业名称不能为空'))
    //   } else {
    //     callback()
    //   }
    // }
    // var validateUserName = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('姓名不能为空'))
    //   } else {
    //     callback()
    //   }
    // }
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号码不能为空'))
      } else {
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
        if (!myreg.test(value)) {
          callback(new Error('请输入正确的手机号码'))
        } else {
          callback()
        }
      }
    }
    var validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    return {
      modifyAction: this.$route.query.modifyAction,
      inputAccount: this.$route.query.inputAccount,
      headerTitle: '修改密码',
      headerContent: '修改密码',
      forgetPassword: false,
      ruleForm: {
        code: '',
        oldPass: '',
        pass: '',
        checkPass: '',
        account: '',
        // enterpriseName: '',
        // userName: '',
        phone: '',
        pkbase64: '',
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        oldPass: [{ validator: validateOldPass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        account: [{ validator: validateAccount, trigger: 'blur' }],
        // enterpriseName: [
        //   { validator: validateEnterpriseName, trigger: 'blur' },
        // ],
        // userName: [{ validator: validateUserName, trigger: 'blur' }],
        phone: [{ validator: validatePhone, trigger: 'blur' }],
        code: [{ validator: validateCode, trigger: 'blur' }],
      },
      modifyValidatorAction: '',
      isModifyShow: false,
      codeText: '获取验证码',
      codeDisabled: false,
    }
  },
  computed: {},
  watch: {},
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      this.getPKFn()
      console.log('修改密码:', this.modifyAction)
      if (this.modifyAction) {
        this.headerContent = '忘记密码'
        this.headerTitle = '忘记密码'
        this.forgetPassword = true
        if (this.inputAccount) {
          this.ruleForm.account = this.inputAccount
        }
      }
    },
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
    goBack() {
      console.log('goBack')
      this.$router.go(-1)
    },
    modifyOfPhone() {
      console.log('modifyOfPhone')
      this.modifyValidatorAction = 'phone'
      this.isModifyShow = true
    },
    modifyOfOldPsw() {
      console.log('modifyOfOldPsw')
      this.modifyValidatorAction = 'oldPsw'
      this.isModifyShow = true
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    getCode() {
      // 先验证手机号是否合法
      this.$refs['modifyRef'].validateField('phone', (valid, error) => {
        console.log('valid', valid)
        console.log('error', error)
        if (valid) {
          Message(`${valid}`)
          console.log(valid)
          return
        } else {
          console.log('通过')
          // 获取验证码
          getSmsCode({
            mobile: this.ruleForm.phone,
          })
            .then(res => {
              console.log('获取验证码', res)
              Message({
                message: '验证码已发送，请注意查收',
                type: 'success',
              })
            })
            .catch(err => {
              console.log('获取验证码失败', err)
              Message.error('获取验证码失败，请稍后重试')
            })
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
.register_header {
  padding: 20px;
}
.headerTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #4f4f4f;
}
.login-container {
  position: absolute;
  left: 0;
  top: 50px;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background: url('./login_bg.jpg') no-repeat;
  background-size: cover;

  .login-form-wrap {
    min-width: 380px;
    max-width: 380px;
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
.modifyAccountPassword {
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

.agreement {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.forgetPassword {
  width: 20rem;
}
.forgetPassword_title {
  font-size: 16px;
  font-weight: bold;
  color: #4f4f4f;
  text-align: center;
  margin-bottom: 2rem;
}
.action {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.validator-card {
  margin-bottom: 0.5rem;
  // 鼠标移入时，指针变成手指
  &:hover {
    cursor: pointer;
  }
}
.get_code {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .get-btn {
    margin-left: 10px;
  }
}
</style>
