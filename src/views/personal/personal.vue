<template>
  <div class="personal">
    <!-- 账号管理页面 -->
    <div slot="header" class="breadcrumbBox">
      <!-- 面包屑路径导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>账号信息</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 面包屑路径导航  end -->
    </div>
    <div class="title">基本信息</div>
    <div class="personalMain">
      <el-card class="box-card">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="用户名">{{
            tableData.employeeName
          }}</el-descriptions-item>
          <el-descriptions-item label="账号ID">{{
            tableData.workNo
          }}</el-descriptions-item>
          <el-descriptions-item label="所属企业">{{
            tableData.companyName
          }}</el-descriptions-item>
          <el-descriptions-item label="手机号">
            <div>
              <span class="mobile">{{ tableData.mobile }}</span>
              <el-button type="text" size="small" @click="modifyPhone">
                更换绑定
              </el-button>
            </div>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
  </div>
</template>

<script>
import { queryPersonalInfo, modifyMobileAccount } from '@/api/user'
import { Message, MessageBox, Loading } from 'element-ui'
export default {
  name: 'personal',
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
    init() {
      this.loadingInstance = Loading.service({
        fullscreen: true,
        target: '.personalMain',
      })
      queryPersonalInfo()
        .then(res => {
          console.log('个人信息:', res.data.queryPersonalInfo)
          this.tableData = res.data.queryPersonalInfo[0]

          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            this.loadingInstance.close()
          })
        })
        .catch(err => {
          console.log(err)
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            this.loadingInstance.close()
          })
        })
    },
    modifyPhone() {
      MessageBox.prompt('请输入手机号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[1][3,4,5,7,8][0-9]{9}$/,
        inputErrorMessage: '手机格式不正确',
      })
        .then(({ value }) => {
          let data = {
            srlIDForEngine: 'Splenwise云密码服务平台',
            busiNameForEngine: '企业客户管理',
            busiFunNameForEngine: '修改手机号',
            miniProcNameForEngine: '修改手机号',
            mobile: value,
          }
          modifyMobileAccount(data).then(res => {
            if (res.data.rs === '1') {
              Message({
                message: '手机号修改成功',
                type: 'success',
              })
              this.init()
            } else {
              Message.error(res.data.rs)
            }
          })
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '取消输入'
          // });
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

.personalMain {
  width: 95%;
  margin: 0 auto;
}

.el-table {
  margin-top: 1rem;
}

.mobile {
  margin-right: 1rem;
}
</style>
