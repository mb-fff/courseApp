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
        <el-tab-pane label="课程简介">
          <p class="text-content">{{introduceData.int_intro}}</p>
        </el-tab-pane>
        <el-tab-pane label="课程目标">
          <p class="text-content">{{introduceData.int_target}}</p>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 课程简介数据
      introduceData: {}
    }
  },
  created () {
    this.getIntroduceData()
  },
  methods: {
    async getIntroduceData () {
      const res = await this.$http.get('introduce', {
        params: { courseName: this.courseName }
      })
      if (res.status === 200) {
        this.introduceData = res.data.data[0]
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
