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
            <span v-if="scope.row.status == 1" class="warning"
              ><i class="el-icon-warning"></i> 等待支付</span
            >
            <span v-if="scope.row.status == 2" class="info"
              ><i class="el-icon-info"></i> 待付款确认</span
            >
            <span v-if="scope.row.status == 3" class="goods"
              ><i class="el-icon-s-goods"></i> 等待配货</span
            >
            <span v-if="scope.row.status == 4" class="success"
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
  </div>
</template>

<script>
//导入js文件(文件脚本内容在下文)
import { getRowspanMethod } from '@/utils'

export default {
  name: 'orderLists',
  components: {},
  props: {},
  data() {
    return {
      tableData: [
        {
          time: '2019-01-01 14:00:31',
          billNo: '1342345635744781',
          goodsName: '完整性校验密钥',
          Validity: '1年',
          price: '120.00',
          num: '1',
          discount: '1.0',
          subtotal: '120.00',
          status: 1,
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
          status: 2,
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
          status: 3,
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
          status: 3,
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
          status: 4,
        },
      ],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
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
</style>
