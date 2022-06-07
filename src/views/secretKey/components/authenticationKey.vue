<template>
  <div class="authenticationKey">
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column label="密钥模板" width="80">
        <template slot-scope="scope">
          <span style="">{{ scope.row.keyModelID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户编号">
        <template slot-scope="scope">
          <span style="">{{ scope.row.ITCompInstName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密钥校验值">
        <template slot-scope="scope">
          {{ scope.row.checkValue }}
          <!-- <span style="margin-right: 10px" v-if="scope.row.isShowKey">{{
            scope.row.checkValue
          }}</span> -->
          <!-- <span style="margin-right: 10px" v-else>
            ***************************</span
          >
          <span
            ><el-button size="mini" @click="showKey(scope.$index, scope.row)">{{
              scope.row.isShowKey ? '隐藏' : '显示'
            }}</el-button></span
          > -->
        </template>
      </el-table-column>
      <el-table-column label="密钥的更新日期">
        <template slot-scope="scope">
          <span style="">{{ scope.row.keyGenerateDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密钥的更新时间">
        <template slot-scope="scope">
          <span style="">{{ scope.row.keyGenerateTime }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="环境">
        <template slot-scope="scope">
          <span style="">{{ scope.row.DEVID }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span style="">{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" class-name="btnBox">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleRandomCreateSK(scope.$index, scope.row)"
            >随机生成SK</el-button
          >
          <!-- <el-button size="mini" @click="handleRenewal(scope.$index, scope.row)"
            >续费</el-button
          > -->
        </template>
      </el-table-column>
    </el-table>


  </div>
</template>

<script>

import { querySKById, randomCreateSK } from '@/api/key'
import { Message, MessageBox } from 'element-ui'
export default {
  name: 'authenticationKey',
  components: {
  },
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    numOfPerPage: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      renewalShow: false,
      loading: false,
      tableData: [],
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getSKById()
  },
  mounted() {},
  methods: {
    getSKById() {
      this.loading = true
      querySKById({
        currentPage: this.currentPage,
        pageSize: this.numOfPerPage,
      }).then(res => {
        console.log('查询SK列表:', res.data)
        // let numPage = res.data.querySKById_totalRecNum

        let data = res.data.querySKById.map(item => {
          return {
            ...item,
            keyModelID: 'SK', // 密钥模板
            isShowKey: false,
          }
        })
        data.forEach(item => {
          this.tableData.push(item)
        })
        this.loading = false
      })
    },
    handleRandomCreateSK(index, row) {
      console.log(index, row)
      // companyName:北京江南天安科技有限公司
      // projectName:Splenwise云密码服务平台
      // keyModelID:SK
      // compName:采购云密码服务的企业
      // devID:开发测试环境
      // ITCompInstName:210804103316152366
      // keyIndex:1
      // keyOperationID:1001
      // srlIDForEngine:Splenwise统一密码基础设施和服务平台
      // busiNameForEngine:安全方案实施管理
      // busiFunNameForEngine:随机生成密钥
      // miniProcNameForEngine:随机生成密钥-强制
      let data = {
        companyName: '北京江南天安科技有限公司',
        projectName: 'Splenwise云密码服务平台',
        keyModelID: 'SK',
        compName: '采购云密码服务的企业',
        devID: row.DEVID,
        ITCompInstName: row.ITCompInstName,
        keyIndex: row.KEYINDEX,
        keyOperationID: 1001,
        srlIDForEngine: 'Splenwise统一密码基础设施和服务平台',
        busiNameForEngine: '安全方案实施管理',
        busiFunNameForEngine: '随机生成密钥',
        miniProcNameForEngine: '随机生成密钥-强制',
      }
      console.log('data', data)
      MessageBox.confirm('是否随机生成SK, 是否确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          randomCreateSK(data).then(res => {
            console.log('随机生成SK:', res.data)
            if (res.data.rs === '1') {
              Message({
                showClose: true,
                message: '随机生成SK成功',
                type: 'success',
              })
              // 重新获取列表
              this.tableData = []
              this.getSKById()
            } else {
              console.log('随机生成SK-失败:', res.data.rs)
              Message({
                showClose: true,
                message: `随机生成SK失败${res.data.rs}`,
                type: 'error',
              })
            }
          })
        })
        .catch(() => {
          Message({
            type: 'info',
            message: '已取消',
          })
        })
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    showKey(index, row) {
      console.log(index, row)
      // 点击按钮显示当前密钥值明文
      this.tableData[index].isShowKey = !this.tableData[index].isShowKey
    },

  },
}
</script>

<style scoped lang="less">
.btnBox {
  .el-button {
    margin: 5px;
  }
}
</style>
