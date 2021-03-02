<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/back_welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{courseName}}</el-breadcrumb-item>
      <el-breadcrumb-item>课程评价</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容区 -->
    <el-card>
      <el-form :model="evaluateData" class="demo-ruleForm">
        <el-form-item label="学生评价" prop="eva_student">
          <el-input type="textarea" rows="8" v-model="evaluateData.eva_student"></el-input>
        </el-form-item>
        <el-form-item label="同行评价" prop="eva_peer">
          <el-input type="textarea" rows="8" v-model="evaluateData.eva_peer"></el-input>
        </el-form-item>
        <el-form-item label="课程特色" prop="eva_feature">
          <el-input type="textarea" rows="8" v-model="evaluateData.eva_feature"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="submitForm()">更新</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 课程评价数据
      evaluateData: {
        // 课程名称
        courseName: this.courseName,
        // 学生评价
        eva_student: '',
        // 同行评价
        eva_peer: '',
        // 课程特色
        eva_feature: ''
      }
    }
  },
  created () {
    this.getEvaluateData()
  },
  methods: {
    // 获取课程介绍数据
    async getEvaluateData () {
      const res = await this.$http.get('evaluate', {
        params: { courseName: this.courseName }
      })
      if (res.status === 200) {
        this.evaluateData.eva_student = res.data.data[0].eva_student
        this.evaluateData.eva_peer = res.data.data[0].eva_peer
        this.evaluateData.eva_feature = res.data.data[0].eva_feature
      }
    },
    // 更新
    async submitForm () {
      const res = await this.$http.put('evaluate', this.evaluateData)
      if (res.status === 200) {
        this.$message.success('更新成功')
        this.getEvaluateData()
      }
    }
  },
  props: {
    courseName: String
  }
}
</script>

<style scoped lang='less'>
</style>
