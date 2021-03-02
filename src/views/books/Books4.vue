<template>
  <div>
    <Books :courseName="courseName"></Books>
  </div>
</template>

<script>
import Books from '../../components/Books'
export default {
  data () {
    return {
      // 课程名称
      courseName: '机器学习与模式识别'
    }
  },
  components: {
    Books
  }
}
</script>

<style scoped lang='less'>
</style>
