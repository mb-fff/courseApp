<template>
  <div class="container">
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>推荐网站</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 标签页 -->
    <el-card>
      <el-tabs tab-position="left" style="height:455px;">
        <el-tab-pane label="参考网站">
          <!-- 表格区域 -->
          <el-table :data="websiteData" stripe style="width: 100%">
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="web_name" label="网站名称"></el-table-column>
            <el-table-column prop="web_link" label="网站地址"></el-table-column>
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
      // 推荐网站数据
      websiteData: [],
      // 查询参数对象
      queryInfo: {
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
      const res = await this.$http.get('website', {
        params: this.queryInfo
      })
      if (res.status === 200) {
        this.total = res.data.total
        this.websiteData = res.data.data
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
}
</style>
