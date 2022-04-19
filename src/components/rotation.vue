<template>
  <div class="rotation">
    <!-- 轮播图 -->
    <el-carousel :interval="5000" height="300px">
      <el-carousel-item v-for="item in url" :key="item">
        <el-image
          style="width: 100%; height: 300px"
          :src="item"
          fit="fill"
        ></el-image>
        <!-- <img :src="item" alt="" /> -->
        <!-- <h1>{{ item }}</h1> -->
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'rotation',
  components: {},
  props: {},
  data() {
    return {
      url: [
        'http://res.tintjs.com/img/v2_ra0e8p.png',
        'http://res.tintjs.com/img/v2_ra0eni.png',
      ],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="less">
.el-carousel__item h3 {
  color: #475669;
  font-size: 34px;
  opacity: 0.75;
  line-height: 350px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
ul {
  height: 260px;
}
</style>
