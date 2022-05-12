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
          <el-table :data="orderData" stripe style="width: 100%">
            <el-table-column
              align="center"
              prop="srlID"
              label="商品名称"
              width="250"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="priceAttrValueList"
              label="有效期"
              width="180"
            >
              <template slot-scope="scope">
                <el-select
                  v-model="validityValue"
                  placeholder="请选择"
                  @change="changeValidity"
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
            <el-table-column
              align="center"
              prop="algorithms"
              label="密码算法"
              width="180"
            >
              <template slot-scope="scope">
                <el-select v-model="algorithmsValue" placeholder="请选择">
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
            <el-table-column prop="priceAfterDiscount" label="单价" width="100">
              <template slot-scope="scope">
                <div class="priceStyle">
                  ￥{{ scope.row.priceAfterDiscount }}
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="数量" width="180">
              <template slot-scope="scope">
                <el-input-number
                  v-model="prdNum"
                  :min="1"
                  size="mini"
                  @change="handleChange"
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
                <div class="priceStyle">
                  ￥{{ Number(scope.row.priceAfterDiscount) * prdNum }}
                </div>
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
import { createOrder, getCryptographicAlgorithmList } from '@/api/order'
import { Message, MessageBox } from 'element-ui'
export default {
  name: 'confirmOrder',
  components: {},
  props: {},
  data() {
    return {
      title: '',
      productInfo: '',
      orderData: [],
      prdNum: 1,
      totalPrice: 0,
      validityValue: '',
      validityOptions: [],
      algorithmsValue: '',
      algorithmsOptions: [],
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
  watch: {
    orderData() {
      this.totalPrice =
        Number(this.orderData[0].priceAfterDiscount) * this.prdNum
    },
  },
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
    this.getProductInfo(this.currentGoods.srlID)
    // 获取加密算法列表
    this.getAlgorithmList()
  },
  mounted() {},
  methods: {
    changeValidity(value) {
      // 根据有效期替换数据
      let orderDataNew = []
      orderDataNew = this.productInfo.filter(item => {
        if (item.priceAttrValueList === value) {
          return {
            ...item,
          }
        }
      })
      this.orderData = orderDataNew
      console.log('changeValidity', this.orderData)
    },
    getProductInfo(id) {
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
      let validityList = []
      let algorithmList = []
      let tpsList = []
      this.productInfo.forEach(e => {
        if (e.priceAttrValueList.includes('.')) {
          let arr = e.priceAttrValueList.split('.')
          algorithmList.push(arr[0])
          tpsList.push(arr[1])
          validityList.push(arr[2])

          // 有限期替换为arr[2]
          // e.priceAttrValueList = arr[2]

        } else {
          validityList.push(e.priceAttrValueList)
          algorithmList.push('')
          tpsList.push('')
        }
      })
      this.orderData = this.orderData.concat(this.productInfo[0])

      this.totalPrice = this.orderData[0].priceAfterDiscount

      this.validityValue = this.orderData[0].priceAttrValueList
      this.validityOptions = this.productInfo.map(item => {
        return {
          value: item.priceAttrValueList,
          label: item.priceAttrValueList,
        }
      })
      console.log('descList:', descList)
      console.log('this.orderData:', this.orderData, typeof this.orderData)
    },
    getAlgorithmList() {
      let params = {
        productId: this.currentGoods.productName,
        srlId: this.currentGoods.srlID,
        type: '密码算法',
      }
      console.log('getAlgorithmList params:', params)
      getCryptographicAlgorithmList(params).then(res => {
        if (res.data.rs === '1') {
          let lists = res.data.queryCryptographicAlgorithmList
          this.algorithmsValue = lists[0].specAttr
          this.algorithmsOptions = lists.map(item => {
            return {
              value: item.specAttr,
              label: item.specAttr,
            }
          })
        } else {
          console.log(res.data.rs)
        }
      })
    },
    handleChange(value) {
      console.log(value)
      this.prdNum = value
      this.totalPrice = value * this.currentGoods.price
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
          有效期限: this.orderData[0].priceAttrValueList,
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
