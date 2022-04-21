<template>
  <div class="confirmOrder">
    <div class="confirm">
      <div class="title">确认订单信息</div>
      <div class="tableBox">
        <div>
          <el-table :data="orderData" stripe style="width: 100%">
            <el-table-column
              align="center"
              prop="goodsName"
              label="商品名称"
              width="250"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="validity"
              label="有效期"
              width="180"
            >
            </el-table-column>
            <el-table-column prop="price" label="单价" width="100">
              <template slot-scope="scope">
                <div class="priceStyle">￥{{ scope.row.price }}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="数量" width="180">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.num"
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
                  ￥{{ scope.row.price * scope.row.num }}
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
import { useOrderStore } from '@/store/order'
export default {
  name: 'confirmOrder',
  components: {},
  props: {},
  data() {
    return {
      orderData: [],
      totalPrice: 0,
    }
  },
  computed: {
    currentGoods() {
      return useOrderStore().getCurrentGoods
    },
  },
  watch: {},
  created() {
    this.totalPrice = this.currentGoods.price
    // 存入数组
    let arrData = []
    arrData.push(this.currentGoods)
    this.orderData = arrData
    console.log('confirmOrder created', this.orderData)
    // this.orderData = this.currentGoods
  },
  mounted() {},
  methods: {
    handleChange(value) {
      console.log(value)
      this.totalPrice = value * this.currentGoods.price
    },
    submitOrder() {
      console.log('submitOrder')
    },
  },
}
</script>

<style scoped lang="less">
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
