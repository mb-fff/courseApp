<template>
  <div class="container">
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{courseName}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 标签页 -->
    <el-card>
      <el-tabs v-model="activeName" tab-position="left">
        <el-tab-pane
          v-for="item in resourseData"
          :key="item.id"
          :name="item.projectName"
          :label="item.title"
        >
          <!-- 表格区域 -->
          <el-table :data="item.data" stripe style="width: 100%">
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="res_name" label="标题">
              <template slot-scope="scope">
                <a :href="href" @click="download(scope.row.res_name)">{{scope.row.res_name}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="res_date" label="日期">
              <template slot-scope="scope">{{ scope.row.res_date | dateFormat}}</template>
            </el-table-column>
          </el-table>
          <!-- 页码 -->
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="item.queryInfo.pagenum"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="item.queryInfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="item.total"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <!-- 考核方式 -->
        <el-tab-pane label="考核方式">
          <p class="text-content">{{assessData.res_way}}</p>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      href: 'javascript:0;',
      activeName: 'resourse_handouts',
      // 课程资源数据
      resourseData: [
        {
          id: 0,
          title: '课程讲义',
          projectName: 'resourse_handouts',
          total: 0,
          // 查询参数对象
          queryInfo: {
            courseName: this.courseName,
            pagenum: 1,
            pagesize: 5
          },
          data: []
        },
        {
          id: 1,
          title: '综合项目',
          projectName: 'resourse_project',
          total: 0,
          // 查询参数对象
          queryInfo: {
            courseName: this.courseName,
            pagenum: 1,
            pagesize: 5
          },
          currentPage: 1,
          data: []
        },
        {
          id: 2,
          title: '实验设计',
          projectName: 'resourse_test',
          total: 0,
          // 查询参数对象
          queryInfo: {
            courseName: this.courseName,
            pagenum: 1,
            pagesize: 5
          },
          currentPage: 1,
          data: []
        },
        {
          id: 3,
          title: '考试样卷',
          projectName: 'resourse_exam',
          total: 0,
          // 查询参数对象
          queryInfo: {
            courseName: this.courseName,
            pagenum: 1,
            pagesize: 5
          },
          currentPage: 1,
          data: []
        }
      ],
      // 考核方式数据
      assessData: {}
    }
  },
  created () {
    this.getResourseData()
    this.getAssessData()
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
      this.href = `http://42.192.48.175:3000/file_download?courseName=${this.courseName}&projectName=${this.activeName}&fileName=${fileName}`
    },
    // 根据分页获取对应的数据
    async getResourseData () {
      // 课程讲义
      const data1 = await this.$http.get('resourse_handouts', {
        params: this.resourseData[0].queryInfo
      })
      if (data1.status === 200) {
        this.resourseData[0].total = data1.data.total
        this.resourseData[0].data = data1.data.data
      }
      // 综合项目
      const data2 = await this.$http.get('resourse_project', {
        params: this.resourseData[1].queryInfo
      })
      if (data2.status === 200) {
        this.resourseData[1].total = data2.data.total
        this.resourseData[1].data = data2.data.data
      }
      // 实验设计
      const data3 = await this.$http.get('resourse_test', {
        params: this.resourseData[2].queryInfo
      })
      if (data3.status === 200) {
        this.resourseData[2].total = data3.data.total
        this.resourseData[2].data = data3.data.data
      }
      // 考试样卷
      const data4 = await this.$http.get('resourse_exam', {
        params: this.resourseData[3].queryInfo
      })
      if (data3.status === 200) {
        this.resourseData[3].total = data4.data.total
        this.resourseData[3].data = data4.data.data
      }
    },
    // 切换每页条数
    handleSizeChange (val) {
      this.resourseData.forEach(item => {
        if (item.projectName === this.activeName) {
          item.queryInfo.pagesize = val
        }
      })
      this.getResourseData()
    },
    // 前往某页
    handleCurrentChange (val) {
      this.resourseData.forEach(item => {
        if (item.projectName === this.activeName) {
          item.queryInfo.pagenum = val
        }
      })
      this.getResourseData()
    },
    // 获取考核方式数据
    async getAssessData () {
      const res = await this.$http.get('resourse_way', {
        params: { courseName: this.courseName }
      })
      if (res.status === 200) {
        this.assessData = res.data.data[0]
      }
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
