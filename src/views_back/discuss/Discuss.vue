<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/back_welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>主题讨论</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 标签页 -->
    <el-card>
      <el-tabs tab-position="left">
        <!-- 发布讨论 -->
        <el-tab-pane label="发布讨论">
          <el-card>
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="课程名称" prop="courseName">
                <el-select v-model="ruleForm.courseName" placeholder="请选择课程名称">
                  <el-option label="数据分析" value="数据分析"></el-option>
                  <el-option label="大数据与数据采集" value="大数据与数据采集"></el-option>
                  <el-option label="数据可视化" value="数据可视化"></el-option>
                  <el-option label="机器学习与模式识别" value="机器学习与模式识别"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="讨论标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
              <el-form-item label="讨论内容" prop="content">
                <el-input type="textarea" v-model="ruleForm.content"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="primary" @click="submitForm()">发布</el-button>
                <el-button size="small" @click="resetForm()">重置</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-tab-pane>
        <!-- 主题讨论 -->
        <el-tab-pane v-for="item in discussData" :key="item.discussName" :label="item.discussName">
          <!-- 表格区域 -->
          <el-table :data="item.data" stripe style="width: 100%">
            <!-- 展开行内容 -->
            <el-table-column type="expand">
              <!-- 作用域插槽 -->
              <template slot-scope="scope">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="内容：">
                    <span>{{ scope.row.dis_content }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column width="500" prop="dis_name" label="标题"></el-table-column>
            <el-table-column width="100" prop="dis_user" label="作者"></el-table-column>
            <el-table-column prop="dis_date" label="日期">
              <template slot-scope="scope">{{scope.row.dis_date | dateFormat}}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="handleDelete(scope.row.dis_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 页码 -->
          <Page @discussData="getData" :courseName="item.discussName"></Page>
        </el-tab-pane>
      </el-tabs>
      <!-- 删除对话框 -->
      <el-dialog
        title="删除讨论"
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
import Page from '@/components/Page.vue'
import { getDate } from '@/plugins/date'
export default {
  data () {
    return {
      // 主题讨论
      discussData: [
        {
          discussName: '数据分析',
          total: 0,
          data: []
        },
        {
          discussName: '大数据与数据采集',
          total: 0,
          data: []
        },
        {
          discussName: '数据可视化',
          total: 0,
          data: []
        },
        {
          discussName: '机器学习与模式识别',
          total: 0,
          data: []
        }
      ],
      ruleForm: {
        // 课程名称
        courseName: '',
        // 讨论标题
        title: '',
        // 讨论内容
        content: ''
      },
      // 验证规则
      rules: {
        courseName: [
          { required: true, message: '请选择课程名称', trigger: 'change' }
        ],
        title: [
          { required: true, message: '请输入讨论主题', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入讨论内容', trigger: 'blur' }
        ]
      },
      // 删除对话框的状态
      dialogDeleteVisible: false,
      // 要删除的讨论id
      dis_id: 0
    }
  },
  components: {
    Page
  },
  methods: {
    // 发布讨论
    submitForm () {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) {
          this.$message.error('内容有误！')
          return
        }
        // 检验无误
        const res = await this.$http.post('discuss', {
          courseName: this.ruleForm.courseName,
          dis_name: this.ruleForm.title,
          dis_content: this.ruleForm.content,
          dis_user: '老师',
          dis_date: getDate()
        })
        if (res.status === 200) {
          this.$message.success('发布成功')
          this.resetForm()
        }
      })
    },
    // 重置
    resetForm () {
      this.$refs.ruleForm.resetFields()
    },
    // 获取主题讨论数据
    getData (data) {
      this.discussData.forEach(item => {
        if (item.discussName === data[0].courseName) {
          item.data = data
        }
      })
    },
    // 删除讨论
    handleDelete (disId) {
      this.dialogDeleteVisible = true
      this.dis_id = disId
    },
    // 确认删除
    async confirmDelete () {
      const res = await this.$http.delete('discuss', {
        params: {
          dis_id: this.dis_id
        }
      })
      if (res.status === 200) {
        this.$message.success('删除成功')
        this.dialogDeleteVisible = false
      }
    },
    // 关闭对话框之前
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    }
  }
}
</script>

<style scoped lang='less'>
</style>
