<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/back_welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{courseName}}</el-breadcrumb-item>
      <el-breadcrumb-item>课程描述</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容区 -->
    <el-card>
      <el-form :model="descriptionData" class="demo-ruleForm">
        <el-form-item label="教学大纲" prop="des_outline">
          <el-input type="textarea" rows="8" v-model="descriptionData.des_outline"></el-input>
        </el-form-item>
        <el-form-item label="课时分配" prop="des_hour">
          <el-input type="textarea" rows="8" v-model="descriptionData.des_hour"></el-input>
        </el-form-item>
        <el-form-item label="历史沿革" prop="des_history">
          <el-input type="textarea" rows="8" v-model="descriptionData.des_history"></el-input>
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
      // 课程描述数据
      descriptionData: {
        // 课程名称
        courseName: this.courseName,
        // 教学大纲
        des_outline: '',
        // 课时分配
        des_hour: '',
        // 历史沿革
        des_history: ''
      }
    }
  },
  created () {
    this.getDescriptionData()
  },
  methods: {
    // 获取课程介绍数据
    async getDescriptionData () {
      const res = await this.$http.get('description', {
        params: { courseName: this.courseName }
      })
      if (res.status === 200) {
        this.descriptionData.des_outline = res.data.data[0].des_outline
        this.descriptionData.des_hour = res.data.data[0].des_hour
        this.descriptionData.des_history = res.data.data[0].des_history
      }
    },
    // 更新
    async submitForm () {
      const res = await this.$http.put('description', this.descriptionData)
      if (res.status === 200) {
        this.$message.success('更新成功')
        this.getDescriptionData()
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
