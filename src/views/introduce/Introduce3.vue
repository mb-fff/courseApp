<template>
  <div>
    <!-- 父传子 -->
    <Introduce :courseName="courseName"></Introduce>
  </div>
</template>

<script>
import Introduce from '../../components/Introduce'
export default {
  data () {
    return {
      // 课程名称
      courseName: '数据可视化'
    }
  },
  components: {
    Introduce
  }
}
</script>

<style scoped lang='less'>
</style>
