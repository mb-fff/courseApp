<template>
  <div class="container">
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
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
                <el-button type="primary" @click="submitForm()">发布</el-button>
                <el-button @click="resetForm()">重置</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-tab-pane>
        <!-- 主题讨论 -->
        <el-tab-pane v-for="item in discussData" :key="item.discussName" :label="item.discussName">
          <ul>
            <li v-for="item1 in item.data" :key="item1.dis_id">
              <el-card class="tit_item">
                <h2 @click="handleTo(item1)" class="tit_title">{{item1.dis_name}}</h2>
                <div class="tit_bottom">
                  <p class="tit_user">{{item1.dis_user}}</p>
                  <p class="tit_content" @click="handleTo(item1)">{{item1.dis_content}}</p>
                </div>
              </el-card>
            </li>
            <!-- 页码 -->
            <Page @discussData="getData" :courseName="item.discussName"></Page>
          </ul>
        </el-tab-pane>
      </el-tabs>
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
      }
    }
  },
  components: {
    Page
  },
  methods: {
    // 发布讨论
    submitForm () {
      const isLogin = window.sessionStorage.getItem('isLogin')
      if (!isLogin) {
        this.$router.push('/login')
        return
      }
      // 登陆之后才可以发布讨论
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
          dis_user: window.sessionStorage.getItem('name'),
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
    // 跳转至内容区
    handleTo (item) {
      this.$router.push('/discussContent')
      window.sessionStorage.setItem('dis_id', item.dis_id)
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
  .tit_item {
    margin-bottom: 10px;
  }
  .tit_title {
    height: 30px;
    font-size: 20px;
    line-height: 30px;
    margin-bottom: 10px;
    &:hover {
      color: red;
      cursor: pointer;
    }
  }
  .tit_bottom {
    margin-bottom: 20px;
    font-size: 14px;
    .tit_user {
      float: left;
      margin-right: 30px;
    }
    .tit_content {
      float: left;
      width: 800px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      &:hover {
        color: red;
        cursor: pointer;
      }
    }
  }
}
</style>
