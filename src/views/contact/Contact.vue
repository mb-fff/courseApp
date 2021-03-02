<template>
  <div class="container">
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>联系我们</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 标签页 -->
    <el-card>
      <el-tabs v-model="contactActiveName" tab-position="left" style="height: 455px;">
        <el-tab-pane name="任课教师" label="任课教师">
          <p class="text-content">{{contactData.con_teacher}}</p>
        </el-tab-pane>
        <el-tab-pane name="课程助教" label="课程助教">
          <p class="text-content">{{contactData.con_assistant}}</p>
        </el-tab-pane>
        <el-tab-pane name="网络互动" label="网络互动">
          <p class="text-content">{{contactData.con_chat}}</p>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 选中项
      contactActiveName: '',
      // 联系方式数据
      contactData: {}
    }
  },
  created () {
    this.getData()
    this.contactActiveName = this.$store.state.contactActiveName
  },
  // 获取联系方式数据
  methods: {
    async getData () {
      const res = await this.$http.get('contact')
      if (res.status === 200) {
        this.contactData = res.data.data[0]
      }
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
}
</style>
