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
      courseName: '大数据与数据采集'
    }
  },
  components: {
    Description
  }
}
</script>

<style scoped lang='less'>
</style>
