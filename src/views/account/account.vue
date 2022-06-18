<template>
  <div class="account">
    <!-- 账号管理页面 -->
    <div slot="header" class="breadcrumbBox">
      <!-- 面包屑路径导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>账号管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 面包屑路径导航  end -->
    </div>
    <div class="title">账号列表</div>
    <div class="accountLists">
      <el-card class="box-card">
        <el-button type="primary" @click="createChildAccount"
          >创建子账号</el-button
        >
        <el-button type="primary" @click="modifyAccountPassword"
          >修改当前账号密码</el-button
        >
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="employeeName" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="tellerNo" label="账号"> </el-table-column>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <!-- <el-button
                type="text"
                size="small"
                @click="modifyChildAccountPassword(scope.row)"
              >
                修改子账号密码
              </el-button> -->
              <el-button
                type="text"
                size="small"
                @click="deleteChildAccount(scope.row)"
              >
                删除子账号
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { encryption } from '@/utils'
import {
  getPK,
  getSubAcount,
  subAcountDelete,
  subAcountUpdate,
} from '@/api/user'
import { Message, MessageBox } from 'element-ui'
export default {
  name: 'accountManagement',
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
    }
  },
  computed: {},
  watch: {},
  created() {
    this.init()
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
    init() {
      this.getPKFn()
      getSubAcount().then(res => {
        if (res.data.rs !== '1') {
          console.log('获取子账号列表失败')
          return
        }
        this.tableData = res.data.subAccountdisplay
        console.log('子账号列表:', this.tableData)
      })
    },
    createChildAccount() {
      this.$router.push({
        path: '/register',
        query: {
          action: 'childAccount',
        },
      })
    },
    modifyAccountPassword() {
      console.log('修改密码')
      this.$router.push({
        path: '/modify',
        query: {
          modifyAction: 'modify',
          inputAccount: window.localStorage.getItem('userName'),
        },
      })
    },
    modifyChildAccountPassword(row) {
      MessageBox.prompt('请输入新密码', `正在修改[${row.tellerNo}]子账号密码`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'password',
        // inputPattern:
        //   /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确',
      })
        .then(({ value }) => {
          let encryptedPassword = encryption(this.pkbase64, value)
          let data = {
            companyName: window.localStorage.getItem('enterpriseName'),
            tellerNo: row.tellerNo,
            newPassword: encryptedPassword,
            newPassword: value,
          }
          subAcountUpdate(data).then(res => {
            console.log('subAcountUpdate', res)
            if (res.data.rs !== '1') {
              Message({
                message: res.data.msg,
                type: 'error',
                duration: 3 * 1000,
              })
              return
            }
            Message({
              message: '修改成功,请牢记您的新密码',
              type: 'success',
              duration: 3 * 1000,
            })
          })
        })
        .catch(() => {
          Message({
            type: 'info',
            message: '取消修改',
          })
        })
    },
    deleteChildAccount(row) {
      MessageBox.confirm('此操作将永久删除该子账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          let deleteData = {
            srlIDForEngine: 'Splenwise云密码服务平台',
            busiNameForEngine: '企业客户管理',
            busiFunNameForEngine: '删除企业客户账号',
            miniProcNameForEngine: '删除企业客户子账号',
            tellerNo: row.tellerNo,
          }
          subAcountDelete(deleteData).then(res => {
            if (res.data.rs !== '1') {
              console.log('删除子账号失败')
              return
            }
            Message({
              type: 'success',
              message: '删除成功!',
            })
            this.init()
          })
        })
        .catch(() => {
          Message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
  },
}
</script>

<style scoped lang="less">
.breadcrumbBox {
  padding: 20px;
}

.title {
  font-size: 16px;
  font-weight: 600;
  margin: 1.5rem;
  // text-align: center;
}
.tableBox {
  display: flex;
  justify-content: center;
  // align-items: center;
}
.accountLists {
  width: 95%;
  margin: 0 auto;
}
.el-table {
  margin-top: 1rem;
}
</style>
