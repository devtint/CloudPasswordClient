<template>
  <div class="orderLists">
    <el-table
      :data="tableData"
      v-loading="loading"
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
      <el-table-column prop="srlID" label="商品名称"> </el-table-column>
      <!-- <el-table-column prop="Validity" label="有效期" width="80">
      </el-table-column> -->
      <el-table-column prop="prdUnitPrc" label="单价" width="120">
        <template slot-scope="scope">
          <div>￥{{ scope.row.prdUnitPrc }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="prdNum" label="数量" width="80"> </el-table-column>
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
            <span v-if="scope.row.status === '等待支付'" class="warning"
              ><i class="el-icon-warning"></i> {{ scope.row.status }}</span
            >
            <span v-if="scope.row.status === '待收款确认'" class="info"
              ><i class="el-icon-info"></i> {{ scope.row.status }}</span
            >
            <span v-if="scope.row.status === '等待配货'" class="goods"
              ><i class="el-icon-s-goods"></i> {{ scope.row.status }}</span
            >
            <span v-if="scope.row.status === '配货完成'" class="success"
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
          <el-upload
            class="avatar-uploader"
            :action="uploadURL"
            :before-upload="beforeAvatarUpload"
            name="file"
            :show-file-list="true"
            :on-success="handleAvatarSuccess"
            v-if="scope.row.status === '等待支付' || scope.row.status === '待收款确认'"
          >
            <!-- <img
              v-if="bannerRuleForm.imageUrl"
              :src="bannerRuleForm.imageUrl"
              class="avatar"
            /> -->
            <el-button type="text" size="small" @click="uploadimage(scope.row)"
              >{{ scope.row.status === '等待支付' ? '上传支付凭证' : '更新支付凭证'}}</el-button
            >
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
import { BASE_URL } from '@/global/config'
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
  uploadCredentials,
} from '@/api/order'
export default {
  name: 'orderLists',
  components: {},
  props: {},
  data() {
    return {
      uploadURL: BASE_URL + '/uploadFile',
      loading: false,
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
      bannerRuleForm: {
        imageUrl: '',
      },
      billNo: '',
    }
  },
  computed: {
    currentTabs() {
      return useOrderStore().getCurrentTabs
    },
    orderData() {
      return useOrderStore().getOrderData
    },
    orderDataNum() {
      return useOrderStore().getOrderDataTotalNum
    },
  },
  watch: {
    currentTabs: {
      handler(newValue, oldValue) {
        this.currentPage = 1
        this.init(newValue)
      },
      immediate: true,
    },
    orderData: {
      handler(newValue, oldValue) {
        this.initBySearch(newValue)
      },
      immediate: true,
    },
  },
  created() {
    console.log('currentTabs', this.currentTabs)
  },
  mounted() {},
  methods: {
    initBySearch(data) {
      if (data) {
        this.tableData = data
        this.totalData = this.orderDataNum
      } else {
        this.init(this.currentTabs)
      }
    },
    init(tabStatus) {
      console.log('init', tabStatus)
      this.loading = true
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
        this.loading = false
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
      // Message(`当前页: ${val}`)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      // console.log(file)
      // // this.listType = 'picture'
      // this.dialogImageUrl =
      //   'http://www.paytunnel.cn/CloudPasswordClient/#/' + file.name
      // this.dialogVisible = true
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
    uploadimage(item) {
      console.log('上传图片', item)
      this.billNo = item.billNo
      // var fs = require('fs')
      // let file = item.raw
      // // // 创建表单对象 用于数据的格式  + 用于添加流文件！
      // let formData = new FormData()
      // formData.append('file', file)
      // console.log('file', file)
      // console.log('formData', formData)
      // uploadFile(formData).then(res => {
      //   // this.bannerRuleForm.imageUrl = res.data.url
      //   console.log('uploadFile', res.data)
      // })
      // var myHeaders = new Headers()
      // myHeaders.append('Cookie', 'JSESSIONID=601BFDF3548EA679481551DD42EE5882')
      // myHeaders.append('res_token', 'adeebd32-5f54-4a88-9821-f38c44538dca')
      // myHeaders.append('X-CSRF-TOKEN', '9681b818-bc33-4551-bded-35564058e4f9')
      // var formdata = new FormData()
      // formdata.append('file', file)
      // var requestOptions = {
      //   method: 'POST',
      //   headers: myHeaders,
      //   body: formdata,
      //   redirect: 'follow',
      // }
      // fetch(
      //   'http://www.paytunnel.cn/CloudPasswordServer/uploadFile',
      //   requestOptions
      // )
      //   .then(response => response.text())
      //   .then(result => console.log(result))
      //   .catch(error => console.log('error', error))
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isJPG) {
        Message({
          message: '上传图片只能是 JPG或PNG 格式!',
          type: 'warning',
        })
      }
      if (!isLt10M) {
        Message({
          message: '上传图片大小不能超过 10MB!',
          type: 'warning',
        })
      }
      return isJPG && isLt10M
    },
    handleAvatarSuccess(res, file) {
      console.log('handleAvatarSuccess', res)
      console.log('fileName:', res.fileName)
      // billNo:14752205181524457686
      // srlIDForEngine:Splenwise云密码服务平台
      // busiNameForEngine:客户订单管理
      // busiFunNameForEngine:上传订单支付凭证
      // miniProcNameForEngine:上传订单支付凭证
      // desResID:1501
      // docIndex:1
      // fileName:1652858705494.txt
      let params = {
        billNo: this.billNo,
        srlIDForEngine: 'Splenwise云密码服务平台',
        busiNameForEngine: '客户订单管理',
        busiFunNameForEngine: '上传订单支付凭证',
        miniProcNameForEngine: '上传订单支付凭证',
        desResID: '1501',
        docIndex: '1',
        fileName: res.fileName,
      }
      console.log('params', params)
      uploadCredentials(params).then(res => {
        console.log('uploadCredentials', res)
        if (res.data.ID_Positive === 'success') {
          console.log('上传支付凭证成功')
          Message({
            showClose: true,
            message: '上传支付凭证成功',
            type: 'success',
          })
          this.init(this.currentTabs)
        } else {
          console.log('上传支付凭证失败', res.data.ID_Positive)
          Message({
            showClose: true,
            message: '上传支付凭证失败',
            type: 'error',
          })
        }
      })
      // this.bannerRuleForm.imageUrl = URL.createObjectURL(file.raw)
    },
    toOrderDetail() {
      console.log('订单详情')
    }
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
  z-index: 999;
}
</style>
