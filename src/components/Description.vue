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
        <el-tab-pane label="教学大纲">
          <p class="text-content">{{descriptionData.des_outline}}</p>
        </el-tab-pane>
        <el-tab-pane label="课时分配">
          <p class="text-content">{{descriptionData.des_hour}}</p>
        </el-tab-pane>
        <el-tab-pane label="历史沿革">
          <p class="text-content">{{descriptionData.des_history}}</p>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 课程描述数据
      descriptionData: {}
    }
  },
  created () {
    this.getDescriptionData()
  },
  methods: {
    async getDescriptionData () {
      const res = await this.$http.get('description', {
        params: { courseName: this.courseName }
      })
      if (res.status === 200) {
        this.descriptionData = res.data.data[0]
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
