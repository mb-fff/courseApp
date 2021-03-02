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
        <el-tab-pane label="教学方案与措施">
          <p class="text-content">{{reformData.ref_action}}</p>
        </el-tab-pane>
        <el-tab-pane label="课程重点与难点">
          <p class="text-content">{{reformData.ref_importance}}</p>
        </el-tab-pane>
        <el-tab-pane label="教学方法与手段">
          <p class="text-content">{{reformData.ref_way}}</p>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 教学改革数据
      reformData: {}
    }
  },
  created () {
    this.getReformData()
  },
  methods: {
    async getReformData () {
      const res = await this.$http.get('reform', {
        params: { courseName: this.courseName }
      })
      console.log(res)
      if (res.status === 200) {
        console.log(res)
        this.reformData = res.data.data[0]
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
