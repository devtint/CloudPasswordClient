<template>
  <div class="orderLists">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :span-method="objectSpanMethod"
    >
      <el-table-column prop="billNo" label="订单编号" width="200">
      </el-table-column>
      <el-table-column prop="time" label="下单时间" width="180">
      </el-table-column>
      <el-table-column prop="goodsName" label="商品名称"> </el-table-column>
      <el-table-column prop="Validity" label="有效期" width="80">
      </el-table-column>
      <el-table-column prop="price" label="单价" width="120"> </el-table-column>
      <el-table-column prop="num" label="数量" width="80"> </el-table-column>
      <el-table-column prop="discount" label="折扣" width="80">
      </el-table-column>
      <el-table-column prop="subtotal" label="小计" width="120">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120">
        <template slot-scope="scope">
          <div class="statusStyle">
            <span v-if="scope.row.status == '1'" class="warning"
              ><i class="el-icon-warning"></i> 等待支付</span
            >
            <span v-if="scope.row.status == '2'" class="info"
              ><i class="el-icon-info"></i> 待付款确认</span
            >
            <span v-if="scope.row.status == '3'" class="goods"
              ><i class="el-icon-s-goods"></i> 等待配货</span
            >
            <span v-if="scope.row.status == '4'" class="success"
              ><i class="el-icon-success"></i> 配货完成</span
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="toOrderDetail(scope.row.billNo)"
          >
            订单详情
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="updatePayCredentials(scope.row.billNo)"
            v-if="scope.row.status == 1"
          >
            上传支付凭证
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="paginationBox">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 50, 100]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
//导入js文件(文件脚本内容在下文)
import { getRowspanMethod } from '@/utils'
import { Message } from 'element-ui'

import { useOrderStore } from '@/store/order'
export default {
  name: 'orderLists',
  components: {},
  props: {},
  data() {
    return {
      currentPage: 1,
      tableData: [],
    }
  },
  computed: {
    currentTabs() {
      return useOrderStore().getCurrentTabs
    },
  },
  watch: {
    currentTabs: {
      handler(newValue, oldValue) {
        this.init(newValue)
      },
      immediate: true,
    },
  },
  created() {
    console.log('currentTabs', this.currentTabs)
  },
  mounted() {},
  methods: {
    init(tabStatus) {
      console.log('init', tabStatus)
      let initTableData = [
        {
          time: '2019-01-01 14:00:31',
          billNo: '1342345635744781',
          goodsName: '完整性校验密钥',
          Validity: '1年',
          price: '120.00',
          num: '1',
          discount: '1.0',
          subtotal: '120.00',
          status: '1',
        },
        {
          time: '2019-01-01 14:00:32',
          billNo: '1342345635744782',
          goodsName: '完整性校验密钥',
          Validity: '1年',
          price: '120.00',
          num: '1',
          discount: '1.0',
          subtotal: '120.00',
          status: '2',
        },
        {
          time: '2019-01-01 14:00:33',
          billNo: '1342345635744783',
          goodsName: '完整性校验密钥',
          Validity: '1年',
          price: '120.00',
          num: '1',
          discount: '1.0',
          subtotal: '120.00',
          status: '3',
        },
        {
          time: '2019-01-01 14:00:33',
          billNo: '1342345635744783',
          goodsName: '完整性校验密钥',
          Validity: '3年',
          price: '360.00',
          num: '1',
          discount: '1.0',
          subtotal: '360.00',
          status: '3',
        },
        {
          time: '2019-01-01 14:00:34',
          billNo: '1342345635744784',
          goodsName: '完整性校验密钥',
          Validity: '1年',
          price: '120.00',
          num: '1',
          discount: '1.0',
          subtotal: '120.00',
          status: '4',
        },
      ]
      if (tabStatus === '0') {
        this.tableData = Object.assign(initTableData)
      } else {
        let tableData = initTableData.filter(item => {
          if (item.status === tabStatus) {
            return true
          }
          return false
        })
        this.tableData = tableData
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //调用函数并导出需要的合并列函数 注意需要根据
      //data为查询到的数据
      //['prop1', 'prop2', 'prop3'] 需要合并的列
      const spanMethod = getRowspanMethod(this.tableData, ['billNo', 'time'])
      //调用函数并返回需要合并的列
      return spanMethod({ row, column, rowIndex, columnIndex })
    },
    toOrderDetail(billNo) {
      console.log('订单详情', billNo)
      // this.$router.push({
      //   path: '/orderDetail',
      //   query: {
      //     billNo,
      //   },
      // })
    },
    updatePayCredentials(billNo) {
      console.log('上传支付凭证', billNo)
      // this.$router.push({
      //   path: '/updatePayCredentials',
      //   query: {
      //     billNo,
      //   },
      // })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      console.log(this.tabStatus)
      Message(`当前页: ${val}`)
    },
  },
}
</script>

<style scoped lang="less">
.statusStyle {
  .warning {
    color: #f50;
  }
  .info {
    color: #2d8cf0;
  }
  .goods {
    color: #45c7e8;
  }
  .success {
    color: #87d068;
  }
}
.paginationBox {
  // 固定屏幕右下角
  position: fixed;
  bottom: 50px;
  right: 50px;
  background-color: #fff;
}
</style>
