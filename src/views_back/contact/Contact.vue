<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/back_welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>联系我们</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容区 -->
    <el-card>
      <el-form :model="contactData" class="demo-ruleForm">
        <el-form-item label="任课教师" prop="con_teacher">
          <el-input type="textarea" rows="8" v-model="contactData.con_teacher"></el-input>
        </el-form-item>
        <el-form-item label="课程助教" prop="con_assistant">
          <el-input type="textarea" rows="8" v-model="contactData.con_assistant"></el-input>
        </el-form-item>
        <el-form-item label="网络互动" prop="con_chat">
          <el-input type="textarea" rows="8" v-model="contactData.con_chat"></el-input>
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
      // 联系我们数据
      contactData: {
        // 任课教师
        con_teacher: '',
        // 课程助教
        con_assistant: '',
        // 网络互动
        con_chat: ''
      }
    }
  },
  created () {
    this.getContactData()
  },
  methods: {
    // 获取课程介绍数据
    async getContactData () {
      const res = await this.$http.get('contact')
      if (res.status === 200) {
        this.contactData.con_teacher = res.data.data[0].con_teacher
        this.contactData.con_assistant = res.data.data[0].con_assistant
        this.contactData.con_chat = res.data.data[0].con_chat
      }
    },
    // 更新
    async submitForm () {
      const res = await this.$http.put('contact', this.contactData)
      if (res.status === 200) {
        this.$message.success('更新成功')
        this.getContactData()
      }
    }
  }
}
</script>

<style scoped lang='less'>
</style>
