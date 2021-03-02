<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/back_welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{courseName}}</el-breadcrumb-item>
      <el-breadcrumb-item>教学视频</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 标签页 -->
    <el-card>
      <!-- 上传视频按钮 -->
      <div class="addVideo">
        <el-button size="small" type="primary" @click="addVideo">上传视频</el-button>
      </div>
      <el-divider></el-divider>
      <!-- 表格区域，视频列表 -->
      <el-table :data="videoData" stripe style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="vid_name" label="名称"></el-table-column>
        <el-table-column prop="vid_date" label="日期">
          <template slot-scope="scope">{{ scope.row.vid_date | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.vid_id)">删除</el-button>
          </template>
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
      <!-- 上传视频对话框 -->
      <el-dialog
        title="上传视频"
        :visible.sync="dialogAddVisible"
        width="30%"
        :before-close="handleClose"
      >
        课程名称：
        <el-input disabled type="text" :value="courseName" class="course"></el-input>教学视频：
        <el-input disabled type="text" value="video" class="video"></el-input>
        <el-upload
          ref="upload"
          class="upload"
          action="#"
          :auto-upload="false"
          :http-request="upload"
          accept=".mp4, .mp3"
        >
          <el-button slot="trigger" size="small" type="primary" class="upload_btn">选取视频</el-button>
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            class="upload_btn"
            @click="submitUpload"
          >点击上传</el-button>
        </el-upload>
      </el-dialog>
      <!-- 删除视频对话框 -->
      <el-dialog
        title="删除视频"
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
      vid_id: '',
      // 教学视频数据
      videoData: [],
      // 查询参数对象
      queryInfo: {
        courseName: this.courseName,
        pagenum: 1,
        pagesize: 5
      },
      // 视频总数
      total: 0
    }
  },
  // 父组件传来的数据
  props: {
    courseName: String
  },
  created () {
    this.getData()
  },
  methods: {
    // 打开上传视频对话框
    addVideo () {
      this.dialogAddVisible = true
    },
    // 提交
    submitUpload () {
      this.$refs.upload.submit()
    },
    // 发送http异步请求，上传视频
    async upload (file) {
      const forms = new FormData()
      forms.append('file', file.file)
      forms.append('courseName', this.courseName)
      forms.append('projectName', 'video')
      const res = await this.$http.post('file_upload', forms)
      if (res.status === 200) {
        this.$message.success('上传成功')
        // 刷新视频列表
        this.getData()
        // 隐藏对话框
        this.dialogAddVisible = false
      }
    },
    // 根据分页获取对应的数据
    async getData () {
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
      this.getData()
    },
    // 前往某页
    handleCurrentChange (val) {
      this.queryInfo.pagenum = val
      this.getData()
    },
    // 打开删除对话框
    handleDelete (vidId) {
      this.dialogDeleteVisible = true
      this.vid_id = vidId
    },
    // 确认删除
    async confirmDelete () {
      const res = await this.$http.delete('video', {
        params: {
          vid_id: this.vid_id
        }
      })
      if (res.status === 200) {
        this.$message.success('删除成功')
        this.dialogDeleteVisible = false
        this.getData()
      }
    },
    // 关闭对话框之前
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.getData()
        })
        .catch(_ => { })
    }
  }
}
</script>

<style scoped lang='less'>
.addVideo {
  margin-bottom: 20px;
}
.block {
  margin-top: 20px;
}
.el-select {
  display: block;
}
.course,
.video {
  margin: 10px;
}
.upload_btn {
  margin: 10px 80px;
}
</style>
