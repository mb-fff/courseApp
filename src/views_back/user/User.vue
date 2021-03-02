<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/back_welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 标签页 -->
    <el-card>
      <!-- 添加用户 -->
      <div class="addUser">
        <el-button size="small" type="primary" @click="addUser">添加用户</el-button>
      </div>
      <el-divider></el-divider>
      <!-- 表格区域 -->
      <el-table :data="userData" stripe style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="authority" label="权限"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleUpate(scope.row)">更新</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.user_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 页码 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <!-- 添加用户对话框 -->
      <el-dialog
        title="添加用户"
        :visible.sync="dialogAddVisible"
        width="50%"
        :before-close="handleClose"
      >
        <el-form
          :model="addData"
          :rules="addDataRules"
          ref="addDataRef"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名:" prop="username">
            <el-input type="text" v-model="addData.username"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input type="text" v-model="addData.password"></el-input>
          </el-form-item>
          <el-form-item label="权限:" prop="authority">
            <el-select v-model="addData.authority" placeholder="请选择权限">
              <el-option label="老师" value="teacher"></el-option>
              <el-option label="学生" value="student"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名:" prop="name">
            <el-input type="text" v-model="addData.name"></el-input>
          </el-form-item>
          <el-form-item label="性别:" prop="sex">
            <el-select v-model="addData.sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年级:" prop="grade">
            <el-input type="text" v-model="addData.grade"></el-input>
          </el-form-item>
          <el-form-item label="专业:" prop="major">
            <el-input type="text" v-model="addData.major"></el-input>
          </el-form-item>
          <el-form-item label="学号:" prop="学号">
            <el-input type="text" v-model="addData.stu_number"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmAdd">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 更新对话框 -->
      <el-dialog
        title="更新用户"
        :visible.sync="dialogUpdateVisible"
        width="50%"
        :before-close="handleClose"
      >
        <el-form :model="handleData" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名:" prop="username">
            <el-input disabled type="text" v-model="handleData.username"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input type="text" v-model="handleData.password"></el-input>
          </el-form-item>
          <el-form-item label="权限:">
            <el-select v-model="handleData.authority" placeholder="请选择权限">
              <el-option label="老师" value="teacher"></el-option>
              <el-option label="学生" value="student"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名:" prop="name">
            <el-input type="text" v-model="handleData.name"></el-input>
          </el-form-item>
          <el-form-item label="性别:" prop="sex">
            <el-select v-model="handleData.sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年级:" prop="grade">
            <el-input type="text" v-model="handleData.grade"></el-input>
          </el-form-item>
          <el-form-item label="专业:" prop="major">
            <el-input type="text" v-model="handleData.major"></el-input>
          </el-form-item>
          <el-form-item label="学号:" prop="学号">
            <el-input type="text" v-model="handleData.stu_number"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogUpdateVisible = false">取 消</el-button>
          <el-button type="primary" @click="cnofirmUpdate">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 删除对话框 -->
      <el-dialog
        title="删除用户"
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
      // 添加用户
      addData: {
        username: '',
        password: '',
        authority: '',
        name: '',
        sex: '',
        grade: '',
        major: '',
        stu_number: ''
      },
      // 添加用户规则
      addDataRules: {
        // 验证用户名是否合法--prop="username"
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 16, message: '用户名长度为3-16个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法--prop="password"
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度为6-16个字符', trigger: 'blur' }
        ],
        authority: [
          { required: true, message: '请选择权限', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
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
        user_id: '',
        username: '',
        password: '',
        authority: '',
        name: '',
        sex: '',
        grade: '',
        major: '',
        stu_number: ''
      },
      // 参考教材数据
      userData: [],
      // 查询参数对象
      queryInfo: {
        pagenum: 1,
        pagesize: 5
      },
      total: 0
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 添加用户
    addUser () {
      this.dialogAddVisible = true
    },
    confirmAdd () {
      this.$refs.addDataRef.validate(async (valid) => {
        // 校验失败
        if (!valid) {
          return false
        }
        const res = await this.$http.post('user', this.addData)
        if (res.status === 200) {
          this.$message.success('添加成功')
          this.addData.username = ''
          this.addData.password = ''
          this.addData.authority = ''
          this.getData()
          this.dialogAddVisible = false
        }
      })
    },
    // 根据分页获取对应的数据
    async getData () {
      const res = await this.$http.get('user', {
        params: this.queryInfo
      })
      if (res.status === 200) {
        this.total = res.data.total
        this.userData = res.data.data
      }
    },
    // 切换每页条数
    handleSizeChange (val) {
      this.queryInfo.pagesize = val
      this.getData()
    },
    // 前往某页
    handleCurrentChange (val) {
      this.queryInfo.pagenum = val
      this.getData()
    },
    // 更新
    handleUpate (obj) {
      this.dialogUpdateVisible = true
      this.handleData = obj
    },
    // 确认更新
    async cnofirmUpdate () {
      const res = await this.$http.put('user', this.handleData)
      if (res.status === 200) {
        this.$message.success('更新成功')
        this.dialogUpdateVisible = false
        this.getData()
      }
    },
    // 删除
    handleDelete (userId) {
      this.dialogDeleteVisible = true
      this.handleData.user_id = userId
    },
    // 确认删除
    async confirmDelete () {
      const res = await this.$http.delete('user', {
        params: {
          user_id: this.handleData.user_id
        }
      })
      if (res.status === 200) {
        this.$message.success('删除成功')
        this.dialogDeleteVisible = false
        this.getData()
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
.addUser {
  margin-bottom: 20px;
}
.block {
  margin-top: 20px;
}
.el-select {
  display: block;
}
</style>
