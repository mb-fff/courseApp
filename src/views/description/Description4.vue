<template>
  <div>
    <Description :courseName="courseName"></Description>
  </div>
</template>

<script>
import Description from '../../components/Description'
export default {
  data () {
    return {
      // 课程名称
      courseName: '机器学习与模式识别'
    }
  },
  components: {
    Description
  }
}
</script>

<style scoped lang='less'>
</style>
