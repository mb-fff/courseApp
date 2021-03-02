<template>
  <div class="login_container">
    <div class="login_box">
      <el-card>
        <h2 class="title">用户登陆</h2>
        <el-button class="close" @click="close()" size="mini" icon="el-icon-close" circle></el-button>
        <!-- 登陆表单区域 -->
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              type="password"
            ></el-input>
          </el-form-item>
          <!-- 权限 -->
          <el-form-item class="radio">
            <el-radio v-model="loginForm.radio" label="teacher" name="teacher">教师</el-radio>
            <el-radio v-model="loginForm.radio" label="student" name="student">学生</el-radio>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="login()">登陆</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 是否登陆
      isLogin: false,
      // 这是登陆表单的数据绑定对象
      loginForm: {
        username: '',
        password: '',
        radio: 'teacher'
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法--prop="username"
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 16, message: '用户名长度为3-16个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法--prop="password"
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度为6-16个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.$router.beforeEach((to, from, next) => {
      if (from.path === '/login' && to.path === '/discussContent') {
        window.sessionStorage.setItem('activeIndex', 'discuss')
        next()
      }
      next()
    })
  },
  methods: {
    // 点击关闭按钮，返回上一页
    close () {
      // 登陆之前的路径
      const prePath = window.sessionStorage.getItem('prePath')
      this.$router.push(prePath)
    },
    // 点击重置按钮，重置登陆表单
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    // 登陆验证
    async login () {
      this.$refs.loginFormRef.validate(async (valid) => {
        // 校验失败
        if (!valid) {
          return false
        }
        // 发送请求
        const res = await this.$http.post('login', {
          username: this.loginForm.username,
          password: this.loginForm.password,
          authority: this.loginForm.radio
        })
        const len = res.data.data.length
        if (len !== 1) {
          this.$message.error('用户名、密码或权限错误')
          this.loginForm.username = ''
          this.loginForm.password = ''
          this.loginForm.radio = 'teacher'
          return
        }
        this.$message.success('登陆成功')
        if (res.data.data[0].authority === 'teacher') {
          window.sessionStorage.clear()
          // 跳转至后台管理界面
          this.$router.push('/back_home')
        } else {
          // 将用户信息保存起来
          window.sessionStorage.setItem('name', res.data.data[0].name)
          window.sessionStorage.setItem('username', res.data.data[0].username)
          // 跳转至前台用户界面
          this.isLogin = true
          // 登陆之前的路径
          const prePath = window.sessionStorage.getItem('prePath')
          if (prePath.indexOf('/back') !== -1) {
            this.$router.push('/welcome')
          } else {
            this.$router.push(prePath)
          }
          window.sessionStorage.setItem('isLogin', this.isLogin)
        }
        window.sessionStorage.setItem('token', res.data.token)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 754px;
}
.login_box {
  width: 450px;
  height: 350px;
  background-color: #fff;
  border-radius: 3px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .title {
    text-align: center;
    letter-spacing: 10px;
  }
  .close {
    position: absolute;
    top: 14px;
    right: 20px;
  }
}
.login_form {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.radio {
  display: flex;
  justify-content: center;
}
.btns {
  display: flex;
  justify-content: center;
}
.el-card {
  width: 450px;
  height: 350px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
</style>
