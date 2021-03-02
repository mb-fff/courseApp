<template>
  <div>
    <Resourse :courseName="courseName"></Resourse>
  </div>
</template>

<script>
import Resourse from '@/components_back/Resourse'
export default {
  data () {
    return {
      // 课程名称
      courseName: '大数据与数据采集'
    }
  },
  components: {
    Resourse
  }
}
</script>

<style scoped lang='less'>
</style>
