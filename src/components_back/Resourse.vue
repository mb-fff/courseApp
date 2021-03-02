<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/back_welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{courseName}}</el-breadcrumb-item>
      <el-breadcrumb-item>课程资源</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容区 -->
    <el-card>
      <!-- 上传课程资源 -->
      <div class="addResourse">
        <el-button type="primary" size="small" @click="addResourse">上传资源</el-button>
      </div>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 标签页 -->
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
            <el-table-column prop="res_name" label="标题"></el-table-column>
            <el-table-column prop="res_date" label="日期">
              <template slot-scope="scope">{{ scope.row.res_date | dateFormat}}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row.res_id,item.projectName)"
                >删除</el-button>
              </template>
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
          <el-input type="textarea" rows="7" v-model="assessData.res_way"></el-input>
          <el-button
            class="btn"
            @click="updateAssess(assessData.res_id)"
            size="small"
            type="primary"
          >更新</el-button>
        </el-tab-pane>
      </el-tabs>
      <!-- 上传课程资源对话框 -->
      <el-dialog
        title="上传资源"
        :visible.sync="dialogAddVisible"
        width="30%"
        :before-close="handleClose"
      >
        课程名称：
        <el-input disabled class="course" type="text" :value="courseName"></el-input>上传类型：
        <select class="type" v-model="projectName">
          <option value="resourse_handouts">课程讲义</option>
          <option value="resourse_project">综合项目</option>
          <option value="resourse_test">实验设计</option>
          <option value="resourse_exam">考试样卷</option>
        </select>
        <el-upload
          ref="upload"
          class="upload"
          action="#"
          :auto-upload="false"
          :http-request="upload"
        >
          <el-button slot="trigger" size="small" type="primary" class="upload_btn">选取文件</el-button>
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            class="upload_btn"
            @click="submitUpload"
          >点击上传</el-button>
        </el-upload>
      </el-dialog>
      <!-- 删除课程资源对话框 -->
      <el-dialog
        title="删除资源"
        :visible.sync="dialogDeleteVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogDeleteVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmDelete">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 添加对话框的状态
      dialogAddVisible: false,
      // 删除对话框的状态
      dialogDeleteVisible: false,
      // 要进行操作的某行的数据的id
      res_id: '',
      // 上传文件选择框所选项的值
      projectName: 'resourse_handouts',
      // 标签页索引
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
    // 上传资源，打开对话框
    addResourse () {
      this.dialogAddVisible = true
    },
    // 提交
    submitUpload () {
      this.$refs.upload.submit()
    },
    // 发送http异步请求，上传文件
    async upload (file) {
      const forms = new FormData()
      forms.append('file', file.file)
      forms.append('courseName', this.courseName)
      forms.append('projectName', this.projectName)
      const res = await this.$http.post('file_upload', forms)
      if (res.status === 200) {
        this.$message.success('上传成功')
        // 刷新文件
        this.getResourseData()
        // 隐藏对话框
        this.dialogAddVisible = false
      }
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
    // 打开删除对话框
    handleDelete (resId, projectName) {
      this.dialogDeleteVisible = true
      this.res_id = resId
      this.projectName = projectName
    },
    // 确认删除
    async confirmDelete () {
      const res = await this.$http.delete('resourse', {
        params: {
          res_id: this.res_id,
          projectName: this.projectName
        }
      })
      if (res.status === 200) {
        this.$message.success('删除成功')
        this.dialogDeleteVisible = false
        this.getResourseData()
      }
    },
    // 关闭对话框之前
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    // 获取考核方式数据
    async getAssessData () {
      const res = await this.$http.get('resourse_way', {
        params: { courseName: this.courseName }
      })
      if (res.status === 200) {
        this.assessData = res.data.data[0]
      }
    },
    // 更新考核方式
    async updateAssess (resId) {
      const res = await this.$http.put('/resourse_way', {
        res_id: resId,
        res_way: this.assessData.res_way,
        courseName: this.courseName
      })
      if (res.status === 200) {
        this.$message.success('更新成功')
        this.getAssessData()
      }
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
.btn {
  margin-top: 20px;
}
.course,
.type {
  margin: 10px;
  display: block;
  width: 100%;
}
.type {
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  width: 100%;
}
.upload_btn {
  margin: 10px 80px;
}
</style>
