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
      courseName: '大数据与数据采集'
    }
  },
  components: {
    Video
  }
}
</script>

<style scoped lang='less'>
</style>
