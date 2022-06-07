<template>
  <div class="orderRenewal">
    <el-dialog title="产品续费" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="续费时间" :label-width="formLabelWidth">
          <el-select
            v-model="validityValue"
            placeholder="请选择续费时间"
            @change="changePriceForSelect"
          >
            <el-option
              v-for="item in validityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="续费价格" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.price" autocomplete="off"></el-input> -->
          <div class="priceStyle">￥{{ totalPrice }}</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消续费</el-button>
        <el-button type="primary" @click="submitOrder">确定续费</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  countOrderPrice,
  getCryptographicAlgorithmList,
  createOrder,
} from '@/api/order'
import { Message, MessageBox } from 'element-ui'
export default {
  name: 'orderRenewal',
  components: {},
  props: {},
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      formLabelWidth: '120px',
      totalPrice: 0,
      renewalData: [],
      keyModelID: '',
      productName: '',
      srlID: '',
      validityValue: '',
      validityOptions: [],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    showRenewal(data) {
      this.dialogFormVisible = true
      this.renewalData = data
      this.init()
      console.log('showRenewal data:', data)
    },
    init() {
      // 截取参数,计算价格
      this.keyModelID = this.renewalData.keyModelID
      this.productName = this.renewalData.productName
      this.srlID = this.renewalData.srlID
      let _length = this.srlID.length
      this.algorithmsValue = this.keyModelID.slice(_length + 1)
      console.log('algorithmsValue', this.algorithmsValue)
      this.toObtainValidTerm()
    },
    // 获取有效期限
    toObtainValidTerm() {
      let params = {
        productId: this.productName,
        srlId: this.srlID,
        type: '有效期限',
      }
      getCryptographicAlgorithmList(params).then(res => {
        console.log('res', res)
        if (res.data.rs === '1') {
          let lists = res.data.queryCryptographicAlgorithmList
          this.validityValue = lists[0].specAttr
          this.validityOptions = lists.map(item => {
            return {
              label: item.specAttr,
              value: item.specAttr,
            }
          })

          this.calculateThePrice(this.validityValue)
        }
      })
    },
    changePriceForSelect(val) {
      console.log('changePriceForSelect', val)
      this.calculateThePrice(val)
    },
    // 计算价格
    calculateThePrice(val) {
      // let valueList = ''
      // if (this.tpsShow === true) {
      //   valueList = `${this.algorithmsValue}.${this.tpsValue}.${this.validityValue}`
      // } else {
      //   valueList = `${this.validityValue}`
      // }
      let params = {
        actNo: this.renewalData.actNo,
        saleCmpName: this.renewalData.saleCmpName,
        productName: '展期服务',
        // productName: this.renewalData.productName,
        srlID: this.renewalData.srlID,
        prdNum: '1',
        priceAttrValueList: val,
      }
      console.log('countOrderPrice params', params)
      countOrderPrice(params).then(res => {
        console.log('countOrderPrice res', res.data)
        if (res.data.countOrderPrice_totalRecNum === 0) {
          // 没有当前有限期报价,弹出提示/选项置灰（disabled: true)
          MessageBox.alert(
            '暂时还没有该产品的当前有限期报价,请重新选择',
            '提示',
            {
              confirmButtonText: '确定',
              callback: action => {
                // 选项置灰
                let newOptions = this.validityOptions.map(item => {
                  if (item.value === this.validityValue) {
                    item.disabled = true
                  }
                  return item
                })
                this.validityValue = ''
                // this.price = 0.0
                this.totalPrice = 0.0
                this.validityOptions = newOptions
                console.log('this.validityOptions', this.validityOptions)
              },
            }
          )
          return
        }
        if (res.data.rs === '1') {
          // this.price = res.data.countOrderPrice[0].price
          this.totalPrice = res.data.countOrderPrice[0].totalPrice

          this.loading = false
        } else {
          console.log('countOrderPrice 失败', res.data.rs)
        }
      })
    },
    submitOrder() {
      console.log('submitOrder')
      // 验证是否登录
      let user = window.localStorage.getItem('user')
      if (!user) {
        MessageBox.confirm('接下来的操作需要用户登录,是否登录?', '登录提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$router.push('/login')
            Message({
              type: 'success',
              message: '跳转到登录页面',
            })
          })
          .catch(() => {
            Message({
              type: 'info',
              message: '已取消登录',
            })
          })
      } else {
        // 创建订单
        // actNo:1493-20210618083212-00040780-0217
        // transChanelCate:企业客户工作站
        // transChanelID:北京江南天安科技有限公司
        // buyerCmpCate:采购云密码服务的企业
        // purchaseCompanyName:广州睿颢软件技术有限公司
        // companyName:北京江南天安科技有限公司
        // saleCmpName:北京江南天安科技有限公司
        // productName:云密钥托管服务
        // srlID:完整性校验密钥
        // 密码算法:3DES-128Bits
        // 有效期限:1年
        // prdUnitPrc:120.00
        // prdNum:1
        // totalPrice:120.00
        // remark:
        let apiData = {
          actNo: this.renewalData.actNo,
          transChanelCate: '企业客户工作站',
          transChanelID: this.renewalData.saleCmpName,
          buyerCmpCate: '采购云密码服务的企业',
          purchaseCompanyName: window.localStorage.getItem('enterpriseName'),
          companyName: this.renewalData.saleCmpName,
          saleCmpName: this.renewalData.saleCmpName,
          // productName: this.renewalData.productName,
          productName: '展期服务',
          srlID: this.renewalData.srlID,
          密码算法: this.algorithmsValue,
          有效期限: this.validityValue,
          // TPS: this.tpsValue,
          // 密码服务API标准: this.apiValue,
          prdUnitPrc: this.totalPrice,
          prdNum: '1',
          totalPrice: this.totalPrice,
          remark: this.renewalData.ObjectID ? this.renewalData.ObjectID : '',
        }
        console.log('apiData', apiData)
        createOrder(apiData)
          .then(res => {
            if (res.data.rs === '1') {
              console.log('createOrder success', res.data)
              Message({
                type: 'success',
                message: '续费订单创建成功,请及时支付!',
              })
              // 跳转到订单页面
              this.dialogFormVisible = false
              this.$router.push('/order')
            } else {
              console.log('createOrder error', res.data.rs)
              Message({
                type: 'error',
                message: res.data.rs,
              })
            }
          })
          .catch(err => {
            // 如果403,则重新登录
            if (err.response.status === 403) {
              MessageBox.confirm('登录已失效,是否重新登录?', '登录提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
              })
                .then(() => {
                  // 清除登录信息
                  window.localStorage.removeItem('user')
                  window.localStorage.removeItem('enterpriseName')
                  window.localStorage.removeItem('userName')
                  window.localStorage.removeItem('memberID')
                  // 跳转到登录页面
                  this.$router.push('/login')
                  Message({
                    type: 'success',
                    message: '跳转到登录页面',
                  })
                })
                .catch(() => {
                  Message({
                    type: 'info',
                    message: '已取消登录',
                  })
                })
            }
          })
      }
    },
  },
}
</script>

<style scoped lang="less">
.priceStyle {
  color: #ff6600;
}
</style>
