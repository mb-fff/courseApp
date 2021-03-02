<template>
  <footer>
    <div class="top">Copyright © 2021-2025 吉林农业大学 版权所有 xxx</div>
    <div class="bottom">长春市南关区新城大街2888号 电话: 15236174287 邮编:130118</div>
  </footer>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped lang='less'>
footer {
  width: 1196px;
  height: 100px;
  text-align: center;
  background: rgba(84, 92, 100, 0.9);
  position: relative;
  left: 0;
  right: 0;
  margin: auto;
  .top,
  .bottom {
    font-size: 14px;
    width: 100%;
    height: 24px;
    line-height: 24px;
    position: absolute;
  }
  .top {
    top: 30px;
  }
  .bottom {
    top: 54px;
  }
}
</style>
