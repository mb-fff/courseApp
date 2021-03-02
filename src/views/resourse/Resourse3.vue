<template>
  <div>
    <Resourse :courseName="courseName"></Resourse>
  </div>
</template>

<script>
import Resourse from '../../components/Resourse'
export default {
  data () {
    return {
      // 课程名称
      courseName: '数据可视化'
    }
  },
  components: {
    Resourse
  }
}
</script>

<style scoped lang='less'>
</style>
