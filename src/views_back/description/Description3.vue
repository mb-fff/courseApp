<template>
  <div>
    <Description :courseName="courseName"></Description>
  </div>
</template>

<script>
import Description from '@/components_back/Description'
export default {
  data () {
    return {
      // 课程名称
      courseName: '数据可视化'
    }
  },
  components: {
    Description
  }
}
</script>

<style scoped lang='less'>
</style>
