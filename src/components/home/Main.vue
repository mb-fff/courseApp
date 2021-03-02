<template>
  <div class="background">
    <el-main>
      <!-- 侧边栏 -->
      <Aside class="aside"></Aside>
      <!-- 轮播图 -->
      <Carousel></Carousel>
      <!-- 内容区 -->
      <Section class="section"></Section>
    </el-main>
  </div>
</template>

<script>
import Aside from './Aside'
import Carousel from './Carousel'
import Section from './Section'
export default {
  data () {
    return {
    }
  },
  components: {
    Aside,
    Carousel,
    Section
  }
}
</script>

<style scoped lang='less'>
.el-main {
  width: 1196px;
  background: rgba(255, 255, 255, 0.6);
  position: relative;
  left: 0;
  right: 0;
  margin: auto;
  .aside {
    width: 200px;
  }
  .section {
    width: 975px;
    height: 360px;
    position: absolute;
    top: 280px;
    right: 0;
  }
}
</style>
