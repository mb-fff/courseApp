<template>
  <div>
    <Books :courseName="courseName"></Books>
  </div>
</template>

<script>
import Books from '@/components_back/Books'
export default {
  data () {
    return {
      // 课程名称
      courseName: '大数据与数据采集'
    }
  },
  components: {
    Books
  }
}
</script>

<style scoped lang='less'>
</style>
