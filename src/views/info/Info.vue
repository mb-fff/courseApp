<template>
  <div class="container">
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 标签页 -->
    <el-card>
      <div class="wrap">
        <el-form
          :model="userData"
          :rules="userDataRules"
          ref="userDataRef"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名:" prop="username">
            <el-input disabled type="text" v-model="userData.username"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input type="text" v-model="userData.password"></el-input>
          </el-form-item>
          <el-form-item label="权限:" prop="authority">
            <el-input disabled type="text" v-model="userData.authority"></el-input>
          </el-form-item>
          <el-form-item label="姓名:" prop="name">
            <el-input type="text" v-model="userData.name"></el-input>
          </el-form-item>
          <el-form-item label="性别:" prop="sex">
            <el-select v-model="userData.sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年级:" prop="grade">
            <el-input type="text" v-model="userData.grade"></el-input>
          </el-form-item>
          <el-form-item label="专业:" prop="major">
            <el-input type="text" v-model="userData.major"></el-input>
          </el-form-item>
          <el-form-item label="学号:" prop="学号">
            <el-input type="text" v-model="userData.stu_number"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="updateInfo" type="primary" class="btn" size="small">更 新</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 用户信息
      userData: {
        username: '',
        password: '',
        authority: '',
        name: '',
        sex: '',
        grade: '',
        major: '',
        stu_number: ''
      },
      // 更新用户规则
      userDataRules: {
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
      }
    }
  },
  created () {
    this.getUserData()
  },
  methods: {
    //  获取用户信息
    async getUserData () {
      const username = window.sessionStorage.getItem('username')
      const res = await this.$http.get(`user?username=${username}`)
      if (res.status === 200) {
        this.userData = res.data.data[0]
      }
    },
    // 更新用户信息
    async updateInfo () {
      const res = await this.$http.put('user', this.userData)
      if (res.status === 200) {
        this.$message.success('更新成功')
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
  .wrap {
    padding: 50px 300px;
  }
  .btn {
    margin-left: 500px;
  }
}
</style>
