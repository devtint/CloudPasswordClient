<template>
  <div class="cloudCipherMachine">
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="订单号">
                <span>{{ scope.row.taskID }}</span>
              </el-form-item>
              <el-form-item label="密码机编号">
                <span>{{ scope.row.compInstName }}</span>
              </el-form-item>
              <el-form-item label="客户">
                <span>{{ scope.row.owner }}</span>
              </el-form-item>
              <el-form-item label="起租日期">
                <span>{{ scope.row.startActiveDate }}</span>
              </el-form-item>
              <el-form-item label="到期日期">
                <span>{{ scope.row.endActiveDate }}</span>
              </el-form-item>
              <el-form-item label="服务地址">
                <span>{{ scope.row.serviceAddr }}</span>
              </el-form-item>
              <el-form-item label="端口">
                <span>{{ scope.row.port }}</span>
              </el-form-item>
              <el-form-item label="宿主机类型">
                <span>{{ scope.row.fatherCompName }}</span>
              </el-form-item>
              <el-form-item label="宿主机型号">
                <span>{{ scope.row.fatherCompAlais }}</span>
              </el-form-item>
              <el-form-item label="宿主机序列号">
                <span>{{ scope.row.fatherCompInst }}</span>
              </el-form-item>
              <el-form-item label="VSMID">
                <span>{{ scope.row.fatherCompInstAlais }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单号">
          <template slot-scope="scope">
            <span style="">{{ scope.row.taskID }}</span>
          </template>
        </el-table-column>
        <el-table-column label="密码机编号">
          <template slot-scope="scope">
            <span style="">{{ scope.row.compInstName }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="客户">
          <template slot-scope="scope">
            <span style="">{{ scope.row.owner }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="起租日期">
          <template slot-scope="scope">
            <span style="margin-right: 10px">{{
              scope.row.startActiveDate
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="到期日期">
          <template slot-scope="scope">
            <span style="">{{ scope.row.endActiveDate }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="服务地址">
        <template slot-scope="scope">
          <span style="">{{ scope.row.serviceAddr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="端口">
        <template slot-scope="scope">
          <span style="">{{ scope.row.port }}</span>
        </template>
      </el-table-column>
      <el-table-column label="宿主机类型">
        <template slot-scope="scope">
          <span style="">{{ scope.row.fatherCompName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="宿主机型号">
        <template slot-scope="scope">
          <span style="">{{ scope.row.fatherCompAlais }}</span>
        </template>
      </el-table-column>
      <el-table-column label="宿主机序列号">
        <template slot-scope="scope">
          <span style="">{{ scope.row.fatherCompInst }}</span>
        </template>
      </el-table-column>
      <el-table-column label="VSMID">
        <template slot-scope="scope">
          <span style="">{{ scope.row.fatherCompInstAlais }}</span>
        </template>
      </el-table-column> -->
        <el-table-column label="操作" class-name="btnBox">
          <template slot-scope="scope">
            <!-- <el-button
            size="mini"
            @click="handleRandomCreateKey(scope.$index, scope.row)"
            >随机生成密钥</el-button
          > -->
            <el-button
              size="mini"
              @click="handleRenewal(scope.$index, scope.row)"
              >续费</el-button
            >
            <!-- <el-button size="mini" @click="handleChecKey(scope.$index, scope.row)"
            >查看Key</el-button
          > -->
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分页 -->
    <div class="paginationBox">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalData"
      >
      </el-pagination>
    </div>

    <order-renewal ref="renewalShow"></order-renewal>
  </div>
</template>

<script>
import orderRenewal from '@/components/orderRenewal.vue'
import { querySVMDetails } from '@/api/cipher'
import { Cipher } from 'crypto'
export default {
  name: 'cloudCipherMachine',
  components: {
    orderRenewal,
  },
  props: {},
  data() {
    return {
      loading: false,
      tableData: [],
      currentPage: 1,
      numOfPerPage: 5,
      totalData: 0,
    }
  },
  computed: {},
  watch: {},
  created() {
    this.init(1, 5)
  },
  mounted() {},
  methods: {
    init(currentPage, pageSize) {
      this.loading = true
      this.tableData = []
      querySVMDetails({
        currentPage: currentPage,
        numOfPerPage: pageSize,
      }).then(res => {
        console.log('查询VSM列表:', res.data)
        // let numPage = res.data.querySVMDetails_totalRecNum

        let data = res.data.querySVMDetails.map(item => {
          return {
            ...item,
            // keyModelID: 'SK', // 密钥模板
            // isShowKey: false,
          }
        })
        data.forEach(item => {
          this.tableData.push(item)
        })
        this.totalData = res.data.querySVMDetails_totalRecNum
        this.loading = false
      })
    },
    handleRenewal(index, row) {
      console.log(index, row)
      this.renewalData = row
      let type = 'cipherMachine'
      // 打开续费弹窗
      this.$refs.renewalShow.showRenewal(this.renewalData, type)
    },
    handleSizeChange(val) {
      this.numOfPerPage = val
      this.currentPage = 1
      this.init(this.currentPage, this.numOfPerPage)
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.init(this.currentPage, this.numOfPerPage)
      console.log(`当前页: ${val}`)
      // Message(`当前页: ${val}`)
    },
  },
}
</script>

<style scoped lang="less">
.cloudCipherMachine {
  margin: 1rem;
}
/deep/ .demo-table-expand {
  font-size: 0;
}
/deep/ .demo-table-expand label {
  width: 110px;
  color: #99a9bf;
}
/deep/ .demo-table-expand .el-form-item {
  margin-left: 1rem;
  margin-right: 0;
  margin-bottom: 0;
  width: 45%;
}
.paginationBox {
  // 固定屏幕右下角
  position: fixed;
  bottom: 40px;
  right: 50px;
  background-color: #fff;
  z-index: 999;
}
</style>
