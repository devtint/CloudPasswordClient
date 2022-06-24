<template>
  <div class="personal">
    <!-- 账号管理页面 -->
    <div slot="header" class="breadcrumbBox">
      <!-- 面包屑路径导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人资料</el-breadcrumb-item>
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
import { queryPersonalInfo } from '@/api/user'
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
      queryPersonalInfo().then(res => {
        console.log('个人信息:', res.data.queryPersonalInfo)
        this.tableData = res.data.queryPersonalInfo[0]

        this.$nextTick(() => {
          // 以服务的方式调用的 Loading 需要异步关闭
          this.loadingInstance.close()
        })
      })
    },
    modifyPhone() {
      // this.$router.push({
      //   path: '/personal/modifyPhone',
      // })
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
