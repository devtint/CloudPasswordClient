<template>
  <div class="confirmOrder">
    <div class="confirm">
      <div slot="header" class="breadcrumbBox">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/products' }">{{
            currentGoods.productName
          }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ currentGoods.srlID }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑路径导航  end -->
      </div>
      <div class="title">确认订单信息</div>
      <div class="tableBox">
        <div>
          <el-table
            :data="orderData"
            stripe
            style="width: 100%"
            v-loading="loading"
          >
            <el-table-column
              align="center"
              prop="srlID"
              label="商品名称"
              width="250"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="algorithms"
              label="密码算法"
              width="180"
            >
              <template slot-scope="scope">
                <el-select
                  v-model="algorithmsValue"
                  placeholder="请选择"
                  @change="changePriceForSelect"
                >
                  <el-option
                    v-for="item in algorithmsOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="TPS"
              label="TPS"
              width="180"
              v-if="tpsShow === true"
            >
              <template slot-scope="scope">
                <el-select
                  v-model="tpsValue"
                  placeholder="请选择"
                  @change="changePriceForSelect"
                >
                  <el-option
                    v-for="item in tpsOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="密码服务API标准"
              label="密码服务API标准"
              width="180"
              v-if="apiShow === true"
            >
              <template slot-scope="scope">
                <el-select
                  v-model="apiValue"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in apiOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="validity"
              label="有效期限"
              width="180"
            >
              <template slot-scope="scope">
                <el-select
                  v-model="validityValue"
                  placeholder="请选择"
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
              </template>
            </el-table-column>
            <el-table-column prop="price" label="单价" width="100">
              <template slot-scope="scope">
                <div class="priceStyle">￥{{ price }}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="数量" width="180">
              <template slot-scope="scope">
                <el-input-number
                  v-model="prdNum"
                  :min="1"
                  :max="100"
                  size="mini"
                  @change="changeNum"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="total"
              label="小计"
              width="180"
            >
              <template slot-scope="scope">
                <div class="priceStyle">￥{{ totalPrice }}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="submitBox">
        <div class="submitBoxAll">
          <div class="total">
            <span class="totalTitle">实付金额：</span>
            <span class="priceStyle">￥</span
            ><span class="totalPrice">{{ totalPrice }}</span>
          </div>
          <div class="submit">
            <el-button type="primary" size="small" @click="submitOrder"
              >提交订单</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useHomeStore } from '@/store/home'
import { useOrderStore } from '@/store/order'
import {
  createOrder,
  getCryptographicAlgorithmList,
  countOrderPrice,
} from '@/api/order'
import { Message, MessageBox } from 'element-ui'
export default {
  name: 'confirmOrder',
  components: {},
  props: {},
  data() {
    return {
      loading: true,
      title: '',
      productInfo: '',
      orderData: [],
      prdNum: 1,
      price: 0,
      totalPrice: 0,
      tpsValue: '',
      tpsOptions: [],
      validityValue: '',
      validityOptions: [],
      algorithmsValue: '',
      algorithmsOptions: [],
      apiValue: '',
      apiOptions: [],
      tpsShow: false,
      apiShow: false,
    }
  },
  computed: {
    currentGoods() {
      return useOrderStore().getCurrentGoods
    },
    productList() {
      return useHomeStore().getStoreProductList
    },
  },
  watch: {},
  created() {
    // 获取路由传过来的参数
    // this.title = this.$route.params.title
    // this.totalPrice = this.currentGoods.price
    // 存入数组
    // let arrData = []
    // arrData.push(this.currentGoods)
    // this.orderData = arrData
    // console.log('confirmOrder created', this.orderData)
    // this.orderData = this.currentGoods

    // // 获取密码算法或TPS或有效期限列表
    // this.getAlgorithmAndOtherList('密码算法')
    // this.getAlgorithmAndOtherList('有效期限')
    // this.getAlgorithmAndOtherList('TPS')
    // this.getAlgorithmAndOtherList('密码服务API标准')

    this.getProductInfo(this.currentGoods.srlID)
  },
  mounted() {},
  methods: {
    changePriceForSelect(val) {
      console.log('changePriceForSelect', val)
      this.calculateThePrice(this.orderData[0])
    },
    // 计算价格
    calculateThePrice(item) {
      // actNo:1493-20210618083212-00040780-0217
      // saleCmpName:北京江南天安科技有限公司
      // productName:云密码机租赁服务
      // srlID:云密码机租赁服务
      // prdNum:2
      // priceAttrValueList:DES/3DES/RSA.>=20000tps.1个月
      let valueList = ''
      if (this.tpsShow === true) {
        valueList = `${this.algorithmsValue}.${this.tpsValue}.${this.validityValue}`
      } else {
        valueList = `${this.validityValue}`
      }
      let params = {
        actNo: item.actNo,
        saleCmpName: item.saleCmpName,
        productName: item.productName,
        srlID: item.srlID,
        prdNum: this.prdNum,
        priceAttrValueList: valueList,
      }
      console.log('countOrderPrice params', params)
      countOrderPrice(params).then(res => {
        console.log('countOrderPrice res', res.data.countOrderPrice[0])
        if (res.data.rs === '1') {
          this.price = res.data.countOrderPrice[0].price
          this.totalPrice = res.data.countOrderPrice[0].totalPrice

          this.loading = false
        } else {
          console.log('countOrderPrice 失败', res.data.rs)
        }
      })
    },
    async getProductInfo(id) {
      let descList = []
      this.productList.forEach(e => {
        if (e.srlID === id) {
          descList.push(e)
        }
      })
      this.productInfo = descList
      // 转为数组array
      // this.orderData = this.orderData.concat(descList[0])
      // 如果priceAttrValueList值中有.  进行分割为algorithmList/tps/validity
      // let validityList = []
      // let algorithmList = []
      // let tpsList = []
      // this.productInfo.forEach(e => {
      //   if (e.priceAttrValueList.includes('.')) {
      //     let arr = e.priceAttrValueList.split('.')
      //     algorithmList.push(arr[0])
      //     tpsList.push(arr[1])
      //     validityList.push(arr[2])

      //     // 有限期替换为arr[2]
      //     // e.priceAttrValueList = arr[2]
      //   } else {
      //     validityList.push(e.priceAttrValueList)
      //     algorithmList.push('')
      //     tpsList.push('')
      //   }
      // })

      this.orderData = this.orderData.concat(this.productInfo[0])
      console.log('getProductInfo', this.orderData[0])
      // 获取密码算法或TPS或有效期限列表
      await this.getAlgorithmAndOtherList('密码算法')
      await this.getAlgorithmAndOtherList('TPS')
      await this.getAlgorithmAndOtherList('密码服务API标准')
      await this.getAlgorithmAndOtherList('有效期限')
      // setTimeout(() => {
      // 计算价格
      await this.calculateThePrice(this.orderData[0])
      // }, 1000)
      // this.validityValue = this.orderData[0].priceAttrValueList
      // this.validityOptions = this.productInfo.map(item => {
      //   return {
      //     value: item.priceAttrValueList,
      //     label: item.priceAttrValueList,
      //   }
      // })
      console.log('descList:', descList)
      console.log('this.orderData:', this.orderData, typeof this.orderData)
    },
    async getAlgorithmAndOtherList(type) {
      let params = {
        productId: this.currentGoods.productName,
        srlId: this.currentGoods.srlID,
        type: type,
      }
      console.log('getAlgorithmAndOtherList params:', params)
      let res = await getCryptographicAlgorithmList(params)
      console.log('getAlgorithmAndOtherList res:', res)
      if (res.data.rs === '1') {
        if (res.data.queryCryptographicAlgorithmList_totalRecNum === 0) {
          return
        }
        if (type === 'TPS') {
          this.tpsShow = true
        } else if (type === '密码服务API标准') {
          this.apiShow = true
        }
        let lists = res.data.queryCryptographicAlgorithmList
        this.optionsFormatting(type, lists)
      } else {
        console.log(type, res.data.rs)
      }
    },
    optionsFormatting(type, lists) {
      let types = [
        {
          name: '密码算法',
          value: 'algorithmsValue',
          option: 'algorithmsOptions',
        },
        {
          name: 'TPS',
          value: 'tpsValue',
          option: 'tpsOptions',
        },
        {
          name: '有效期限',
          value: 'validityValue',
          option: 'validityOptions',
        },
        {
          name: '密码服务API标准',
          value: 'apiValue',
          option: 'apiOptions',
        },
      ]
      let index = types.findIndex(item => {
        return item.name === type
      })
      let obj = types[index]
      this[obj.value] = lists[0].specAttr
      this[obj.option] = lists.map(item => {
        return {
          value: item.specAttr,
          label: item.specAttr,
        }
      })
    },
    changeNum(value) {
      console.log(value)
      this.prdNum = value
      this.calculateThePrice(this.orderData[0])
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
          actNo: this.orderData[0].actNo,
          transChanelCate: this.orderData[0].transChanelCate,
          transChanelID: this.orderData[0].transChanelID,
          buyerCmpCate: this.orderData[0].buyerCmpCate,
          purchaseCompanyName: window.localStorage.getItem('enterpriseName'),
          companyName: this.orderData[0].companyName,
          saleCmpName: this.orderData[0].saleCmpName,
          productName: this.orderData[0].productName,
          srlID: this.orderData[0].srlID,
          密码算法: this.algorithmsValue,
          有效期限: this.validityValue,
          TPS: this.tpsValue,
          密码服务API标准: this.apiValue,
          prdUnitPrc: this.orderData[0].priceAfterDiscount,
          prdNum: this.prdNum,
          totalPrice: this.totalPrice,
          remark: '',
        }
        console.log('apiData', apiData)
        createOrder(apiData)
          .then(res => {
            if (res.data.rs === '1') {
              console.log('createOrder success', res.data)
              Message({
                type: 'success',
                message: '下单成功!',
              })
              // 跳转到订单页面
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
.breadcrumbBox {
  padding: 20px;
}

.confirm {
  min-height: 80vh;
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

.priceStyle {
  color: #ff6600;
}
.submitBox {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 3rem;
  margin-right: 2rem;
  bottom: 0;
  .submitBoxAll div {
    margin-bottom: 1rem;
  }
  .totalTitle {
    font-size: small;
  }
  .totalPrice {
    font-size: xx-large;
    color: #ff6600;
  }
  .el-button--primary {
    color: #fff;
    background-color: #ff6600;
    border-color: #ff6600;
  }
}
</style>
