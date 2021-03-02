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
        <el-tab-pane label="教学视频">
          <!-- 表格区域 -->
          <el-table :data="videoData" stripe style="width: 100%">
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="vid_name" label="名称">
              <template slot-scope="scope">
                <a :href="href" @click="download(scope.row.vid_name)">{{scope.row.vid_name}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="vid_date" label="日期">
              <template slot-scope="scope">{{ scope.row.vid_date | dateFormat}}</template>
            </el-table-column>
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
      videoData: [],
      href: 'javascript:0;',
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
    this.getVideoData()
  },
  methods: {
    // 下载
    download (fileName) {
      const isLogin = window.sessionStorage.getItem('isLogin')
      if (!isLogin) {
        this.$router.push('/login')
        return
      }
      // 登陆之后才能下载
      this.href = `http://42.192.48.175:3000/file_download?courseName=${this.courseName}&projectName=video&fileName=${fileName}`
    },
    // 根据分页获取对应的数据
    async getVideoData () {
      const res = await this.$http.get('video', {
        params: this.queryInfo
      })
      if (res.status === 200) {
        this.total = res.data.total
        this.videoData = res.data.data
      }
    },
    // 切换每页条数
    handleSizeChange (val) {
      this.queryInfo.pagesize = val
      this.getVideoData()
    },
    // 前往某页
    handleCurrentChange (val) {
      this.queryInfo.pagenum = val
      this.getVideoData()
    }
  },
  props: {
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
