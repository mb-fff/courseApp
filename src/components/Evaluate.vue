<template>
  <div class="container">
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{courseName}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 标签页 -->
    <el-card>
      <el-tabs tab-position="left" style="height: 455px;">
        <el-tab-pane label="学生评价">
          <p class="text-content">{{evaluateData.eva_student}}</p>
        </el-tab-pane>
        <el-tab-pane label="同行评价">
          <p class="text-content">{{evaluateData.eva_peer}}</p>
        </el-tab-pane>
        <el-tab-pane label="课程特色">
          <p class="text-content">{{evaluateData.eva_feature}}</p>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 课程评价数据
      evaluateData: {}
    }
  },
  created () {
    this.getEvaluateData()
  },
  methods: {
    async getEvaluateData () {
      const res = await this.$http.get('evaluate', {
        params: { courseName: this.courseName }
      })
      if (res.status === 200) {
        this.evaluateData = res.data.data[0]
      }
    }
  },
  props: {
    // 课程名称
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
}
</style>
