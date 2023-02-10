<template>
  <el-menu default-active="/" text-color="#111" active-text-color="#2b4587" router mode="horizontal">
    <el-menu-item index="/">
      <!-- <i class="el-icon-s-home"></i> -->
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="">
      <span slot="title">产品</span>
    </el-menu-item>
    <el-menu-item index="">
      <span slot="title">文档</span>
    </el-menu-item>
    <!-- <el-menu-item index="/secretKey"> -->
    <!-- <i class="el-icon-s-home"></i> -->
    <!-- <span slot="title">密钥管理</span> -->
    <!-- </el-menu-item> -->
    <!-- <el-menu-item index="/cipherMachine"> -->
    <!-- <span slot="title">云密码机管理</span> -->
    <!-- </el-menu-item> -->
  </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  components: {},
  props: [],
  data() {
    return {
      // isCollapsed: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>

<style scoped lang="less"></style>
