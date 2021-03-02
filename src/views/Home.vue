<template>
  <div>
    <Header></Header>
    <!-- 渲染路由 -->
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '../components/home/Header'
export default {
  data() {
    return {}
  },
  components: {
    Header
  }
}
</script>

<style scoped lang='less'>
</style>
