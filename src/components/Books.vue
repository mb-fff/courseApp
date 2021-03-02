<template>
  <div class="container">
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{courseName}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 标签页 -->
    <el-card>
      <el-tabs tab-position="left">
        <el-tab-pane label="参考教材">
          <!-- 表格区域 -->
          <el-table :data="booksData" stripe style="width: 100%">
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="boo_name" label="教材名称"></el-table-column>
            <el-table-column prop="boo_auther" label="著作人"></el-table-column>
          </el-table>
          <!-- 页码 -->
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
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 参考教材数据
      booksData: [],
      // 查询参数对象
      queryInfo: {
        courseName: this.courseName,
        pagenum: 1,
        pagesize: 5
      },
      currentPage: 1,
      total: 0
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 根据分页获取对应的数据
    async getData () {
      const res = await this.$http.get('books', {
        params: this.queryInfo
      })
      if (res.status === 200) {
        this.total = res.data.total
        this.booksData = res.data.data
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
    // 课程名称
    courseName: String
  }
}
</script>

<style scoped lang='less'>
.container {
  width: 1196px;
  background: white;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  .block {
    margin-top: 20px;
  }
}
</style>
