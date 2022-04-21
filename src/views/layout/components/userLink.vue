<template>
  <div class="userLink">
    <el-link href="javascript:;" :underline="false">
      <i class="icon icon-sousuo"></i>
    </el-link>
    <el-link href="javascript:;" :underline="false">
      <i class="icon icon-zhanghao"></i>
    </el-link>
    <el-link href="javascript:;" :underline="false">
      <i class="icon icon-envelope"></i>
    </el-link>
    <el-link href="javascript:;" :underline="false">
      <div class="avatar-wrap">
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="icon icon-shenglvehao"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toMyOrder"
              >我的订单</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-link>
  </div>
</template>

<script>
export default {
  name: 'userLink',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    toMyOrder() {
      this.$router.push('/order')
    },
  },
}
</script>

<style scoped lang="less">
.userLink {
  display: flex;
  align-items: center;
  .el-link {
    margin-left: 1rem;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>
