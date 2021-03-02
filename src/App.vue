<template>
  <div id="app">
    <!-- 渲染路由 -->
    <router-view />
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {
    // 监听路由变化
    this.$router.beforeEach((to, from, next) => {
      // 路由跳转之前的path
      window.sessionStorage.setItem('prePath', from.path)
      next()
    })
  }
}
</script>

<style scoped lang='less'>
</style>
