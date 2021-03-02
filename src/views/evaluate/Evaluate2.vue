<template>
  <div>
    <Evaluate :courseName="courseName"></Evaluate>
  </div>
</template>

<script>
import Evaluate from '../../components/Evaluate'
export default {
  data () {
    return {
      // 课程名称
      courseName: '大数据与数据采集'
    }
  },
  components: {
    Evaluate
  }
}
</script>

<style scoped lang='less'>
</style>
