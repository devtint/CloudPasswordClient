<template>
  <div class="managedKey">
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column label="订单明细凭证号">
        <template slot-scope="scope">
          <span style="">{{ scope.row.oriObjectID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密钥">
        <template slot-scope="scope">
          <span style="">{{ scope.row.keyModelID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密钥序号" width="80">
        <template slot-scope="scope">
          <span style="margin-right: 10px">{{ scope.row.KEYINDEX }}</span>
        </template>
      </el-table-column>
      <el-table-column label="截至有效日期" width="180">
        <template slot-scope="scope">
          <span style="">{{ scope.row.endActiveDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密钥校验值">
        <template slot-scope="scope">
          <span style="">{{ scope.row.checkValue }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="环境" width="180">
        <template slot-scope="scope">
          <span style="">{{ scope.row.DEVID }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <span style="">{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" class-name="btnBox">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleRandomCreateKey(scope.$index, scope.row)"
            >随机生成密钥</el-button
          >
          <el-button size="mini" @click="handleRenewal(scope.$index, scope.row)"
            >续费</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <order-renewal ref="renewalShow"></order-renewal>
  </div>
</template>

<script>
import orderRenewal from '@/components/orderRenewal.vue'
import { queryKeyById, randomCreateKey } from '@/api/key'
import { Message, MessageBox } from 'element-ui'
export default {
  name: 'managedKey',
  components: {
    orderRenewal,
  },
  props: {},
  data() {
    return {
      loading: false,
      tableData: [],
      renewalData: {},
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getKeyById()
  },
  mounted() {},
  methods: {
    getKeyById() {
      this.loading = true
      queryKeyById({
        currentPage: 1,
        pageSize: 10,
      }).then(res => {
        console.log('查询Key列表:', res.data)
        let data = res.data.queryKeyById.map(item => {
          return {
            ...item,
          }
        })
        data.forEach(item => {
          this.tableData.push(item)
        })
        this.loading = false
      })
    },
    handleRandomCreateKey(index, row) {
      console.log(index, row)
      let data = {
        companyName: '北京江南天安科技有限公司',
        projectName: 'Splenwise云密码服务平台',
        keyModelID: row.keyModelID,
        compName: '采购云密码服务的企业',
        devID: row.DEVID,
        ITCompInstName: row.ITCompInstName,
        keyIndex: row.KEYINDEX,
        keyOperationID: '1001',
        srlIDForEngine: 'Splenwise统一密码基础设施和服务平台',
        busiNameForEngine: '安全方案实施管理',
        busiFunNameForEngine: '随机生成密钥',
        miniProcNameForEngine: '随机生成密钥-强制',
        KEEPCURRENTKEYENDDATE: '1',
        GENERATEKEYFORCUSTOMERANYWAY: '1',
      }
      console.log('data', data)
      MessageBox.confirm('是否随机生成密钥, 是否确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          randomCreateKey(data).then(res => {
            console.log('随机生成密钥:', res.data)
            if (res.data.rs === '1') {
              Message({
                showClose: true,
                message: '随机生成密钥成功',
                type: 'success',
              })
              // 重新获取列表
              this.tableData = []
              this.getKeyById()
            } else {
              console.log('随机生成密钥-失败:', res.data.rs)
              Message({
                showClose: true,
                message: `随机生成密钥失败${res.data.rs}`,
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
    handleRenewal(index, row) {
      console.log(index, row)
      this.renewalData = row
      // 打开续费弹窗
      this.$refs.renewalShow.showRenewal(this.renewalData)
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
