<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/back_welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>教学团队</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 标签页 -->
    <el-card>
      <el-tabs v-model="teamActiveName" tab-position="left" style="height: 570px;">
        <!-- 整体结构 -->
        <el-tab-pane name="整体结构" label="整体结构">
          <el-input type="textarea" rows="8" v-model="construction"></el-input>
          <el-button size="small" class="btn" type="primary" @click="updateTeam">更新</el-button>
        </el-tab-pane>
        <!-- 教学人员 -->
        <el-tab-pane name="教学人员" label="教学人员">
          <!-- 添加教学人员 -->
          <el-button size="small" type="primary" @click="handleAdd">添加</el-button>
          <el-divider></el-divider>
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
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleUpdate(scope.row)">更新</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row.tea_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 师资培训 -->
        <el-tab-pane name="师资培训" label="师资培训">
          <el-input type="textarea" rows="8" v-model="train"></el-input>
          <el-button size="small" class="btn" type="primary" @click="updateTeam">更新</el-button>
        </el-tab-pane>
      </el-tabs>
      <!-- 添加教学人员对话框 -->
      <el-dialog
        title="添加教学人员"
        :visible.sync="dialogAddVisible"
        width="50%"
        :before-close="handleClose"
      >
        <el-form
          :model="addData"
          :rules="rules"
          ref="addRuleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="教师姓名:" prop="tea_name">
            <el-input type="text" v-model="addData.tea_name"></el-input>
          </el-form-item>
          <el-form-item label="教师简介:" prop="tea_introduce">
            <el-input type="text" v-model="addData.tea_introduce"></el-input>
          </el-form-item>
          <el-form-item label="主要课程:" prop="tea_course">
            <el-input type="text" v-model="addData.tea_course"></el-input>
          </el-form-item>
          <el-form-item label="研究课题:" prop="tea_topic">
            <el-input type="text" v-model="addData.tea_topic"></el-input>
          </el-form-item>
          <el-form-item label="主要成果:" prop="tea_achivement">
            <el-input type="text" v-model="addData.tea_achivement"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmAdd">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 更新对话框 -->
      <el-dialog
        title="更新教学人员"
        :visible.sync="dialogUpdateVisible"
        width="50%"
        :before-close="handleClose"
      >
        <el-form
          :model="handleData"
          :rules="rules"
          ref="updateRuleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名:" prop="tea_name">
            <el-input type="text" v-model="handleData.tea_name"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="tea_introduce">
            <el-input type="text" v-model="handleData.tea_introduce"></el-input>
          </el-form-item>
          <el-form-item label="姓名:" prop="tea_course">
            <el-input type="text" v-model="handleData.tea_course"></el-input>
          </el-form-item>
          <el-form-item label="年级:" prop="tea_topic">
            <el-input type="text" v-model="handleData.tea_topic"></el-input>
          </el-form-item>
          <el-form-item label="专业:" prop="tea_achivement">
            <el-input type="text" v-model="handleData.tea_achivement"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogUpdateVisible = false">取 消</el-button>
          <el-button type="primary" @click="cnofirmUpdate">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 删除对话框 -->
      <el-dialog
        title="删除教学人员"
        :visible.sync="dialogDeleteVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogDeleteVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmDelete">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 选中项
      teamActiveName: '整体结构',
      // 整体结构
      construction: '',
      // 教学人员数据
      teacherData: [],
      // 师资培训
      train: '',
      // 添加教学人员
      addData: {
        tea_name: '',
        tea_introduce: '',
        tea_course: '',
        tea_topic: '',
        tea_achivement: ''
      },
      // 验证规则
      rules: {
        tea_name: [
          { required: true, message: '请输入教师姓名', trigger: 'blur' }
        ],
        tea_introduce: [
          { required: true, message: '请输入教师简介', trigger: 'blur' }
        ],
        tea_course: [
          { required: true, message: '请输入主要课程', trigger: 'blur' }
        ]
      },
      // 添加对话框的状态
      dialogAddVisible: false,
      // 更新对话框的状态
      dialogUpdateVisible: false,
      // 删除对话框的状态
      dialogDeleteVisible: false,
      // 要进行操作的某行的数据
      handleData: {
        tea_id: '',
        tea_tea_topic: '',
        tea_introduce: '',
        tea_course: '',
        tea_topic: '',
        tea_achivement: ''
      }
    }
  },
  created () {
    this.getConstructionData()
    this.getTeacherData()
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
    },
    // 更新教学结构和师资培训
    async updateTeam () {
      const res = await this.$http.put('team_construction', {
        tea_construction: this.construction,
        tea_train: this.train
      })
      if (res.status === 200) {
        this.getConstructionData()
        this.$message.success('更新成功')
      }
    },
    // 添加教学人员
    handleAdd () {
      this.dialogAddVisible = true
    },
    // 确认添加
    confirmAdd () {
      this.$refs.addRuleForm.validate(async (valid) => {
        if (!valid) { return }
        const res = await this.$http.post('team_teacher', this.addData)
        if (res.status === 200) {
          this.$message.success('添加成功')
          this.addData.tea_name = ''
          this.addData.tea_introduce = ''
          this.addData.tea_course = ''
          this.addData.tea_topic = ''
          this.addData.tea_achivement = ''
          this.getTeacherData()
          this.dialogAddVisible = false
        }
      })
    },
    // 更新教学人员
    handleUpdate (obj) {
      this.dialogUpdateVisible = true
      this.handleData = obj
    },
    // 确认更新
    cnofirmUpdate () {
      this.$refs.updateRuleForm.validate(async (valid) => {
        if (!valid) { return }
        const res = await this.$http.put('team_teacher', this.handleData)
        if (res.status === 200) {
          this.$message.success('更新成功')
          this.dialogUpdateVisible = false
          this.getTeacherData()
        }
      })
    },
    // 删除教学人员
    handleDelete (teaId) {
      this.dialogDeleteVisible = true
      this.handleData.tea_id = teaId
    },
    // 确认删除
    async confirmDelete () {
      const res = await this.$http.delete('team_teacher', {
        params: {
          tea_id: this.handleData.tea_id
        }
      })
      if (res.status === 200) {
        this.$message.success('删除成功')
        this.dialogDeleteVisible = false
        this.getTeacherData()
      }
    },
    // 关闭对话框之前
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    }
  }
}
</script>

<style scoped lang='less'>
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
.btn {
  margin-top: 20px;
}
</style>
