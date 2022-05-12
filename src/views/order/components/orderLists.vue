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
      <el-table-column prop="transDate" label="下单时间" width="180">
        <template slot-scope="scope">
          <div>
            {{ scope.row.transDate + ' ' + scope.row.transTime }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="goodsName" label="商品名称"> </el-table-column>
      <el-table-column prop="Validity" label="有效期" width="80">
      </el-table-column>
      <el-table-column prop="price" label="单价" width="120"> </el-table-column>
      <el-table-column prop="num" label="数量" width="80"> </el-table-column>
      <el-table-column prop="discount" label="折扣" width="80">
      </el-table-column>
      <el-table-column prop="subtotal" label="小计" width="120">
        <template slot-scope="scope">
          <div>￥{{ scope.row.totalPrice }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120">
        <template slot-scope="scope">
          <div class="statusStyle">
            <span v-if="scope.row.status == '等待支付'" class="warning"
              ><i class="el-icon-warning"></i> {{ scope.row.status }}</span
            >
            <span v-if="scope.row.status == '待付款确认'" class="info"
              ><i class="el-icon-info"></i> {{ scope.row.status }}</span
            >
            <span v-if="scope.row.status == '等待配货'" class="goods"
              ><i class="el-icon-s-goods"></i> {{ scope.row.status }}</span
            >
            <span v-if="scope.row.status == '配货完成'" class="success"
              ><i class="el-icon-success"></i> {{ scope.row.status }}</span
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
          <!-- <el-button
            type="text"
            size="small"
            @click="updatePayCredentials(scope.row.billNo)"
            v-if="scope.row.status == 1"
          >
            上传支付凭证
          </el-button> -->
          <el-upload
            class="upload-demo"
            action="#"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :list-type="listType"
            @on-success="handleSuccess"
            v-if="scope.row.status == '等待支付'"
          >
            <el-button
              type="text"
              size="small"
              @click="updatePayCredentials(scope.row.billNo)"
              >上传支付凭证</el-button
            >
            <!-- <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div> -->
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
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
  </div>
</template>

<script>
//导入js文件(文件脚本内容在下文)
import { getRowspanMethod } from '@/utils'
import { Message, MessageBox } from 'element-ui'

import { useOrderStore } from '@/store/order'
import {
  queryMyAllOrders,
  queryMyToBePaidOrders,
  queryMyCollectionConfirmOrders,
  queryMyToBeDistributedOrders,
  queryMyDisCompletedOrders,
} from '@/api/order'
export default {
  name: 'orderLists',
  components: {},
  props: {},
  data() {
    return {
      currentPage: 1,
      numOfPerPage: 5,
      totalData: 0,
      tableData: [],
      dialogImageUrl: '',
      dialogVisible: false,
      listType: 'text',
      fileList: [
        // {
        //   name: 'food.jpeg',
        //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        // },
        // {
        //   name: 'food2.jpeg',
        //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        // },
      ],
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
      let params = {
        currentPage: this.currentPage,
        numOfPerPage: this.numOfPerPage,
      }
      if (tabStatus === '全部') {
        this.getMyOrders(
          tabStatus,
          queryMyAllOrders(params),
          'queryMyAllOrders'
        )
      } else if (tabStatus === '等待支付') {
        this.getMyOrders(
          tabStatus,
          queryMyToBePaidOrders(params),
          'queryMyToBePaidOrders'
        )
      } else if (tabStatus === '待收款确认') {
        this.getMyOrders(
          tabStatus,
          queryMyCollectionConfirmOrders(params),
          'queryMyCollectionConfirmOrders'
        )
      } else if (tabStatus === '等待配货') {
        this.getMyOrders(
          tabStatus,
          queryMyToBeDistributedOrders(params),
          'queryMyToBeDistributedOrders'
        )
      } else if (tabStatus === '配货完成') {
        this.getMyOrders(
          tabStatus,
          queryMyDisCompletedOrders(params),
          'queryMyDisCompletedOrders'
        )
      }
      // if (tabStatus === '全部') {
      //   this.tableData = Object.assign(initTableData)
      // } else {
      //   let tableData = initTableData.filter(item => {
      //     if (item.status === tabStatus) {
      //       return true
      //     }
      //     return false
      //   })
      //   this.tableData = tableData
      // }
    },
    getMyOrders(tabStatus, orderFn, dataName) {
      console.log(tabStatus, '订单')
      orderFn.then(res => {
        if (res.data.rs !== '1') {
          console.log('获取订单失败', res.data.rs)
          return
        }
        console.log(`${dataName}订单列表`, res.data[dataName])
        this.tableData = res.data[dataName]
        this.totalData = res.data[`${dataName}_totalRecNum`]
      })
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
      this.numOfPerPage = val
      this.currentPage = 1
      this.init(this.currentTabs)
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.init(this.currentTabs)
      console.log(`当前页: ${val}`)
      Message(`当前页: ${val}`)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
      // this.listType = 'picture'
      this.dialogImageUrl =
        'http://www.paytunnel.cn/CloudPasswordClient/#/' + file.name
      this.dialogVisible = true
    },
    handleExceed(files, fileList) {
      MessageBox.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return MessageBox.confirm(`确定移除 ${file.name}？`)
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
  bottom: 40px;
  right: 50px;
  background-color: #fff;
}
</style>
