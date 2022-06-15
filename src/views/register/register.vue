<template>
  <div class="registerAccount">
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

      <div class="login-form-wrap">
        <div class="login-head">
          <h2 class="logo">
            <el-image :src="require('@/views/layout/logo.png')"></el-image>
          </h2>
        </div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="headerTitle">{{ headerTitle }}</span>
          </div>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
            label-position="right"
            label-width="80px"
          >
            <el-form-item prop="enterpriseName" label="企业名称">
              <el-input
                v-model="ruleForm.enterpriseName"
                :disabled="this.action === 'childAccount'"
                placeholder="请输入企业名称"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="userName" label="姓名" v-if="this.action !== 'childAccount'">
              <el-input
                v-model="ruleForm.userName"
                placeholder="请输入姓名"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="手机号码" v-if="this.action !== 'childAccount'">
              <el-input
                v-model="ruleForm.phone"
                placeholder="请输入手机号码"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="account" label="账号">
              <el-input
                v-model="ruleForm.account"
                placeholder="请输入账号"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="pass" label="密码">
              <el-input
                type="password"
                placeholder="请输入密码"
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
import { encryption } from '@/utils'
import { getPK, registerAccount, createSubAcount } from '@/api/user'
import { Message, MessageBox } from 'element-ui'
export default {
  name: 'register',
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
    var validateEnterpriseName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('企业名称不能为空'))
      } else {
        callback()
      }
    }
    var validateUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名不能为空'))
      } else {
        callback()
      }
    }
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
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        account: '',
        enterpriseName: '',
        userName: '',
        phone: '',
        pkbase64: '',
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        account: [{ validator: validateAccount, trigger: 'blur' }],
        enterpriseName: [
          { validator: validateEnterpriseName, trigger: 'blur' },
        ],
        userName: [{ validator: validateUserName, trigger: 'blur' }],
        phone: [{ validator: validatePhone, trigger: 'blur' }],
      },
      action: this.$route.query.action,
      headerContent: '用户注册',
      headerTitle: '账号注册',
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getPKFn()
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      console.log('注册:', this.action)
      if (this.action === 'childAccount') {
        this.headerContent = '创建子账号'
        this.headerTitle = '创建子账号'
        this.ruleForm.enterpriseName =
          window.localStorage.getItem('enterpriseName')
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
          console.log('submitForm 检验通过')
          // 加密密码
          let newPassword = encryption(this.pkbase64, this.ruleForm.pass)
          console.log('加密后', newPassword)
          // 注册请求
          // srlIDForEngine:Splenwise云密码服务平台
          // busiNameForEngine:企业客户管理
          // busiFunNameForEngine:企业客户注册
          // miniProcNameForEngine:为企业客户创建注册配置
          // prjDesCmpName:北京江南天安科技有限公司
          // projectName:Splenwise云密码服务平台
          // cmpCate:采购云密码服务的企业
          // status:101002
          // workingStatus:1
          // roleID:企业客户超级用户
          // companyName:测试企业
          // contactor:test
          // employeeName:test
          // phone:13826260000
          // mobile:13826260000
          // tellerNo:test
          // passwordCiper:加密的密码
          let data = {
            srlIDForEngine: 'Splenwise云密码服务平台',
            busiNameForEngine: '企业客户管理',
            busiFunNameForEngine: '企业客户注册',
            miniProcNameForEngine: '为企业客户创建注册配置',
            prjDesCmpName: '北京江南天安科技有限公司',
            projectName: 'Splenwise云密码服务平台',
            cmpCate: '采购云密码服务的企业',
            status: '1',
            workingStatus: '1',
            roleID: '企业客户超级用户',
            companyName: this.ruleForm.enterpriseName,
            contactor: this.ruleForm.userName,
            mobile: this.ruleForm.phone,
            tellerNo: this.ruleForm.account,
            passwordCiper: newPassword,
          }
          console.log('注册请求参数', data)
          if (this.action !== 'childAccount') {
            registerAccount(data).then(res => {
              if (res.data.rs === '1') {
                console.log('注册成功')
                Message({
                  message: '注册成功!',
                  type: 'success',
                })
                this.$router.push('login')
              } else {
                // Message(res.data.rs)
                MessageBox.alert(res.data.rs)
              }
            })
          } else {
            // srlIDForEngine:Splenwise云密码服务平台
            // busiNameForEngine:企业客户管理
            // busiFunNameForEngine:企业客户注册
            // miniProcNameForEngine:为企业客户创建子账号配置
            // workingStatus:1
            // roleID:企业客户超级用户
            // companyName:测试企业T
            // mobile:18446833892
            // authCode:1945
            // tellerNo:testT6
            // contactor:testT6
            // passwordCiper:ngmNY1BYpR0S8XQFgUC9CrCeur8hZ6tYodqRJznRvDz7g32Smh8/e1WN5xl9+ayACPt2ED/6Us966mmIyecQdkSQPEHhWB1JzEfkgmPvSt9DqGgNjBQ+qAA6E5ePUcr4IEgIaiqiLBu8I1jswcej0iMXwKjV1jb1DjcGfUZQw2w=
            // prjDesCmpName:北京江南天安科技有限公司
            // projectName:Splenwise云密码服务平台
            // cmpCate:采购云密码服务的企业
            // status:1
            // employeeName:李四6
            // logonMode:1141
            // data.miniProcNameForEngine = '为企业客户创建子账号配置'
            // data.logonMode = '1141'
            // data.employeeName = this.ruleForm.userName
            // data.passwordCiper = newPassword

            let subData = {
              cipherText: newPassword,
              companyName: window.localStorage.getItem('enterpriseName'),
              tellerNo: this.ruleForm.account,
              tellerName: window.localStorage.getItem('memberID'),
            }
            createSubAcount(subData).then(res => {
              if (res.data.rs === '1') {
                console.log('子账号创建成功')
                Message({
                  message: '子账号创建成功!',
                  type: 'success',
                })
                this.$router.push('account')
              } else {
                // Message(res.data.rs)
                MessageBox.alert(res.data.rs)
              }
            })
          }
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
    min-width: 400px;
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
.registerAccount {
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
