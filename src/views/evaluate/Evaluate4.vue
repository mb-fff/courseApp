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
      courseName: '机器学习与模式识别'
    }
  },
  components: {
    Evaluate
  }
}
</script>

<style scoped lang='less'>
</style>
