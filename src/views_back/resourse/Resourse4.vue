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
      courseName: '机器学习与模式识别'
    }
  },
  components: {
    Resourse
  }
}
</script>

<style scoped lang='less'>
</style>
