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
      courseName: '数据可视化'
    }
  },
  components: {
    Video
  }
}
</script>

<style scoped lang='less'>
</style>
