<template>
  <div>
    <Video :courseName="courseName"></Video>
  </div>
</template>

<script>
import Video from '../../components/Video'
export default {
  data () {
    return {
      // 课程名称
      courseName: '机器学习与模式识别'
    }
  },
  components: {
    Video
  }
}
</script>

<style scoped lang='less'>
</style>
