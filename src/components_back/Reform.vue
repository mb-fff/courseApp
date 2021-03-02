<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/back_welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{courseName}}</el-breadcrumb-item>
      <el-breadcrumb-item>教学改革</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容区 -->
    <el-card>
      <el-form :model="reformData" class="demo-ruleForm">
        <el-form-item label="教学方案与措施" prop="ref_action">
          <el-input type="textarea" rows="8" v-model="reformData.ref_action"></el-input>
        </el-form-item>
        <el-form-item label="教学重点与难点" prop="ref_importance">
          <el-input type="textarea" rows="8" v-model="reformData.ref_importance"></el-input>
        </el-form-item>
        <el-form-item label="教学方法与手段" prop="ref_way">
          <el-input type="textarea" rows="8" v-model="reformData.ref_way"></el-input>
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
      // 教学改革数据
      reformData: {
        // 课程名称
        courseName: this.courseName,
        // 教学方案与措施
        ref_action: '',
        // 教学重点与难点
        ref_importance: '',
        // 教学方法与手段
        ref_way: ''
      }
    }
  },
  created () {
    this.getReformData()
  },
  methods: {
    // 获取课程介绍数据
    async getReformData () {
      const res = await this.$http.get('reform', {
        params: { courseName: this.courseName }
      })
      if (res.status === 200) {
        this.reformData.ref_action = res.data.data[0].ref_action
        this.reformData.ref_importance = res.data.data[0].ref_importance
        this.reformData.ref_way = res.data.data[0].ref_way
      }
    },
    // 更新
    async submitForm () {
      const res = await this.$http.put('reform', this.reformData)
      if (res.status === 200) {
        this.$message.success('更新成功')
        this.getReformData()
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
