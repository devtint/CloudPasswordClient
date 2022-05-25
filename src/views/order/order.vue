<template>
  <div class="order">
    <!-- 搜索框 -->
    <div class="searchBox">
      <el-input
        placeholder="请输入内容"
        v-model="searchValue"
        class="input-with-select"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="商品名称" value="1"></el-option>
          <el-option label="订单编号" value="2"></el-option>
          <!-- <el-option label="下单时间" value="3"></el-option> -->
        </el-select>
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchByKeyWord"
        ></el-button>
      </el-input>
    </div>
    <!-- 订单列表 -->
    <!-- tabs -->
    <div class="tabs">
      <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
        <el-tab-pane label="全部" name="全部">
          <!-- <order-lists></order-lists> -->
        </el-tab-pane>
        <el-tab-pane label="等待支付" name="等待支付">
          <!-- <order-lists></order-lists> -->
        </el-tab-pane>
        <el-tab-pane label="待收款确认" name="待收款确认">
          <!-- <order-lists></order-lists> -->
        </el-tab-pane>
        <el-tab-pane label="等待配货" name="等待配货">
          <!-- <order-lists></order-lists> -->
        </el-tab-pane>
        <el-tab-pane label="配货完成" name="配货完成">
          <!-- <order-lists></order-lists> -->
        </el-tab-pane>
      </el-tabs>
      <order-lists></order-lists>
    </div>
  </div>
</template>

<script>
import orderLists from './components/orderLists.vue'
import {
  queryOrdersById,
  queryOrdersByName,
  queryOrdersByDate,
} from '@/api/order'
import { useOrderStore } from '@/store/order'
export default {
  name: 'order',
  components: {
    orderLists,
  },
  props: {},
  data() {
    return {
      searchValue: '',
      select: '1',
      activeName: '全部',
    }
  },
  computed: {},
  watch: {},
  created() {
    useOrderStore().setCurentTabs('全部')
  },
  mounted() {},
  methods: {
    handleTabClick(tab, event) {
      console.log(tab.name)
      useOrderStore().setCurentTabs(tab.name)
    },
    searchByKeyWord() {
      console.log('searchValue:', this.searchValue)
      console.log('select:', this.select)
      if (this.searchValue === '') {
        useOrderStore().setOrderData('')
        return
      }
      let params = {
        keyWordsFld: this.searchValue,
      }
      // 根据关键词搜索
      if (this.select === '1') {
        // 搜索商品名称
        this.searchFn(queryOrdersByName(params), 'queryOrdersByName')
      } else if (this.select === '2') {
        // 搜索订单编号
        this.searchFn(queryOrdersById(params), 'queryOrdersById')
      } else if (this.select === '3') {
        // 搜索下单时间
        this.searchFn(queryOrdersByDate(params), 'queryOrdersByDate')
      }
    },
    searchFn(key, val) {
      key.then(res => {
        console.log(`根据${val}查询:`, res.data[val])
        useOrderStore().setOrderData(res.data[val])
        useOrderStore().setOrderDataTotalNum(res.data[`${val}_totalRecNum`])
      })
    },
  },
}
</script>

<style scoped lang="less">
.searchBox {
  padding: 20px;
  width: 50%;
  // background: #f5f5f5;
  // flex右对齐
  display: flex;
  justify-content: flex-end;
}
.el-select {
  width: 150px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.tabs {
  padding: 20px;
}
</style>
