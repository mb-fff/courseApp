<template>
  <div class="block">
    <el-carousel trigger="click" height="260px">
      <el-carousel-item>
        <img src="@/assets/image/1.jpeg" width="945" height="260" alt />
      </el-carousel-item>
      <el-carousel-item>
        <img src="@/assets/image/2.jpeg" width="945" height="260" alt />
      </el-carousel-item>
      <el-carousel-item>
        <img src="@/assets/image/3.jpeg" width="945" height="260" alt />
      </el-carousel-item>
      <el-carousel-item>
        <img src="@/assets/image/4.jpeg" width="945" height="260" alt />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped lang='less'>
// 轮播图
.block {
  position: absolute;
  top: 20px;
  right: 15px;
  width: 945px;
}
</style>
