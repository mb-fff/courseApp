<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/back_welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{courseName}}</el-breadcrumb-item>
      <el-breadcrumb-item>课程介绍</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容区 -->
    <el-card>
      <el-form :model="introduceData" class="demo-ruleForm">
        <el-form-item label="课程简介" prop="int_intro">
          <el-input type="textarea" rows="8" v-model="introduceData.int_intro"></el-input>
        </el-form-item>
        <el-form-item label="课程目标" prop="int_target">
          <el-input type="textarea" rows="8" v-model="introduceData.int_target"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="submitForm()">更新</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 课程介绍数据
      introduceData: {
        // 课程名称
        courseName: this.courseName,
        // 课程简介
        int_intro: '',
        // 课程目标
        int_target: ''
      }
    }
  },
  created () {
    this.getIntroduceData()
  },
  methods: {
    // 获取课程介绍数据
    async getIntroduceData () {
      const res = await this.$http.get('introduce', {
        params: { courseName: this.courseName }
      })
      if (res.status === 200) {
        this.introduceData.int_intro = res.data.data[0].int_intro
        this.introduceData.int_target = res.data.data[0].int_target
      }
    },
    // 更新
    async submitForm () {
      const res = await this.$http.put('introduce', this.introduceData)
      if (res.status === 200) {
        this.$message.success('更新成功')
        this.getIntroduceData()
        console.log(res)
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
