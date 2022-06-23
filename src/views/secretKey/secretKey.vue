<template>
  <div class="secretKey">
    <main>
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="托管密钥" name="Key">
          <ManagedKey
            v-if="activeName === 'Key'"
            :current-page="currentPage"
            :num-ofer-page="numOfPerPage"
          ></ManagedKey>
        </el-tab-pane>
        <el-tab-pane label="托管证书" name="Certificate">
          <ManagedCertificate
            v-if="activeName === 'Certificate'"
            :current-page="currentPage"
            :num-ofer-page="numOfPerPage"
          ></ManagedCertificate>
        </el-tab-pane>
        <el-tab-pane label="认证密钥" name="SK">
          <AuthenticationKey
            v-if="activeName === 'SK'"
            :current-page="currentPage"
            :num-ofer-page="numOfPerPage"
          ></AuthenticationKey>
        </el-tab-pane>
      </el-tabs>
    </main>
    <footer>
      <!-- 分页 -->
      <!-- <div class="paginationBox">
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
      </div> -->
    </footer>
  </div>
</template>

<script>
import AuthenticationKey from './components/authenticationKey.vue'
import ManagedCertificate from './components/managedCertificate.vue'
import ManagedKey from './components/managedKey.vue'

export default {
  name: 'secretKey',
  components: {
    AuthenticationKey,
    ManagedCertificate,
    ManagedKey,
  },
  props: {},
  data() {
    return {
      activeName: 'Key',
      currentPage: 1,
      numOfPerPage: 5,
      totalData: 0,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
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
  },
}
</script>

<style scoped lang="less">
main {
  margin: 1rem;
}
</style>
