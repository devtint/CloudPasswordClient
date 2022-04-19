<template>
  <div class="userLink">
    <el-link href="#" target="_blank" :underline="false">
      <i class="icon icon-sousuo"></i>
    </el-link>
    <el-link href="#" target="_blank" :underline="false">
      <i class="icon icon-zhanghao"></i>
    </el-link>
    <el-link href="#" target="_blank" :underline="false">
      <i class="icon icon-envelope"></i>
    </el-link>
    <el-link href="#" target="_blank" :underline="false">
      <i class="icon icon-shenglvehao"></i>
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
  methods: {},
}
</script>

<style scoped lang="less">
.userLink {
  display: flex;
  align-items: center;
  .el-link {
    margin-left: 1rem;
  }
}
</style>
