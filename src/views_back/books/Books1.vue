<template>
  <div>
    <Books :courseName="courseName"></Books>
  </div>
</template>

<script>
import Books from '@/components_back/Books.vue'
export default {
  data () {
    return {
      // 课程名称
      courseName: '数据分析'
    }
  },
  components: {
    Books
  }
}
</script>

<style scoped lang='less'>
</style>
