<template>
  <div>
    <Reform :courseName="courseName"></Reform>
  </div>
</template>

<script>
import Reform from '@/components_back/Reform'
export default {
  data () {
    return {
      // 课程名称
      courseName: '数据可视化'
    }
  },
  components: {
    Reform
  }
}
</script>

<style scoped lang='less'>
</style>
