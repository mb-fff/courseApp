<template>
  <div class="container">
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>教学团队</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 标签页 -->
    <el-card>
      <el-tabs v-model="teamActiveName" tab-position="left">
        <!-- 整体结构 -->
        <el-tab-pane name="整体结构" label="整体结构">
          <p class="text-content">{{construction}}</p>
        </el-tab-pane>
        <!-- 教学人员 -->
        <el-tab-pane name="教学人员" label="教学人员">
          <el-table :data="teacherData" style="width: 100%">
            <!-- 展开行内容 -->
            <el-table-column type="expand">
              <!-- 作用域插槽 -->
              <template slot-scope="scope">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="教师简介：">
                    <span>{{ scope.row.tea_introduce }}</span>
                  </el-form-item>
                  <el-form-item label="主要课程：">
                    <span>{{ scope.row.tea_course }}</span>
                  </el-form-item>
                  <el-form-item label="研究课题：">
                    <span>{{ scope.row.tea_topic }}</span>
                  </el-form-item>
                  <el-form-item label="主要成果：">
                    <span>{{ scope.row.tea_achivement }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="教师姓名" prop="tea_name"></el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 师资培训 -->
        <el-tab-pane name="师资培训" label="师资培训">
          <p class="text-content">{{train}}</p>
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
      teamActiveName: '',
      // 整体结构
      construction: '',
      // 教学人员数据
      teacherData: [],
      // 师资培训
      train: ''
    }
  },
  created () {
    this.getConstructionData()
    this.getTeacherData()
    this.teamActiveName = this.$store.state.teamActiveName
  },
  methods: {
    // 获取整体结构和师资培训数据
    async getConstructionData () {
      const res = await this.$http.get('team_construction')
      if (res.status === 200) {
        this.construction = res.data.data[0].tea_construction
        this.train = res.data.data[0].tea_train
      }
    },
    // 获取教学人员数据
    async getTeacherData () {
      const res = await this.$http.get('team_teacher')
      if (res.status === 200) {
        this.teacherData = res.data.data
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
// 展开行表格
.demo-table-expand {
  font-size: 0;
  label {
    width: 90px;
    color: #99a9bf;
  }
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
}
</style>
