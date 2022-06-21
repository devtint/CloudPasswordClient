<template>
  <div id="orderDetail">
    <el-drawer
      title="订单详情"
      custom-class="detailDrawer"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      size="50%"
    >
      <div class="detail" v-if="show">
        <el-descriptions
          :title="lists.transDate + ' ' + lists.transTime"
          direction="vertical"
          :column="4"
          border
        >
          <el-descriptions-item label="订单编号">{{
            lists.billNo
          }}</el-descriptions-item>
          <el-descriptions-item label="商品名称">{{
            lists.purchaseContractTarget[0].srlID
          }}</el-descriptions-item>
          <el-descriptions-item label="下单企业">{{
            lists.purchaseCompanyName
          }}</el-descriptions-item>
          <el-descriptions-item label="支付状态">{{
            lists.purchaseContract1[0].payStatus
          }}</el-descriptions-item>
          <el-descriptions-item label="商品单价"
            >￥{{
              lists.purchaseContractTarget[0].priceAfterDiscount
            }}</el-descriptions-item
          >
          <el-descriptions-item label="购买数量">{{
            lists.purchaseContractTarget[0].prdNum
          }}</el-descriptions-item>
          <el-descriptions-item label="商品总额"
            >￥{{ lists.totalAmt }}</el-descriptions-item
          >
          <!-- <el-descriptions-item label="订单折后总额"
            >￥{{ lists.totalAmtAfterDiscount }}</el-descriptions-item
          > -->
          <el-descriptions-item label="订单实付总额"
            >￥{{ lists.totalPrice }}</el-descriptions-item
          >
          <el-descriptions-item label="支付凭证">
            <img width="100%" :src="imgSrc" alt="" />
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { queryDetailOrder } from '@/api/order'
import { Loading } from 'element-ui'
export default {
  name: 'orderDetail',
  components: {},
  props: {},
  data() {
    return {
      drawer: false,
      lists: [],
      show: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    showDrawer(billNo) {
      this.loadingInstance = Loading.service({
        fullscreen: true,
        target: '.detailDrawer',
      })
      this.imgSrc = ''
      this.searchDetail(billNo)
      this.drawer = true
    },
    searchDetail(billNo) {
      queryDetailOrder({
        billNo: billNo,
        bllID: 'zcyPurchaseOrder',
      }).then(res => {
        this.lists = res.data.zcyPurchaseOrder[1].purchaseContract[0]
        console.log('订单详情-:', this.lists)
        if (this.lists.contractPayPlan.length > 0) {
          this.imgSrc = `data:image/png;base64,${this.lists.contractPayPlan[0].payPlanImg.imgBase64Str}`
        }
        this.$nextTick(() => {
          // 以服务的方式调用的 Loading 需要异步关闭
          this.show = true
          this.loadingInstance.close()
        })
      })
    },
    // handleClose(done) {
    //   this.$confirm('确认关闭？')
    //     .then(_ => {
    //       done()
    //     })
    //     .catch(_ => {})
    // },
  },
}
</script>

<style scoped lang="less">
.detail {
  margin: 2rem;
}
</style>
