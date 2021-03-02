<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 查询参数对象
      queryInfo: {
        courseName: this.courseName,
        pagenum: 1,
        pagesize: 5
      },
      total: 0
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 根据分页获取对应的数据
    async getData () {
      const res = await this.$http.get('discuss', {
        params: this.queryInfo
      })
      if (res.status === 200) {
        this.total = res.data.total
        // 子传父
        this.$emit('discussData', res.data.data)
      }
    },
    // 切换每页条数
    handleSizeChange (val) {
      this.queryInfo.pagesize = val
      this.getData()
    },
    // 前往某页
    handleCurrentChange (val) {
      this.queryInfo.pagenum = val
      this.getData()
    }
  },
  props: {
    courseName: String
  }
}
</script>

<style scoped lang='less'>
.block {
  margin-top: 20px;
}
</style>
