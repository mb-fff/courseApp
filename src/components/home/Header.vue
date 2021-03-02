<template>
  <div>
    <header>
      <!-- logo -->
      <div>
        <a href="/" class="logo">
          <img width="80" height="80" src="../../assets/image/logo.png" alt />
        </a>
      </div>
      <!-- 标题 -->
      <h2 class="title">数据分析精品课程</h2>
      <!-- 登陆 -->
      <el-button
        v-show="!isLogin"
        class="login"
        type="primary"
        icon="el-icon-user"
        @click="login()"
      ></el-button>
      <el-button v-show="isLogin" type="primary" class="self" @click="isShow=!isShow">个人中心</el-button>
      <div class="person" v-show="isShow">
        <el-button class="info" size="mini" @click="toInfo">我的信息</el-button>
        <el-button class="article" size="mini" @click="toArticle">我的文章</el-button>
        <el-button class="logout" size="mini" type="primary" @click="logout()">退出登录</el-button>
      </div>
      <!-- 导航栏 -->
      <div class="nav">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-submenu v-for="data in navData" :key="data.navName" :index="data.index">
            <template slot="title">{{data.navName}}</template>
            <el-menu-item
              v-for="item in data.childrens"
              :key="item.navName"
              :index="data.index+item.index"
            >{{item.navName}}</el-menu-item>
          </el-submenu>
          <el-menu-item index="team">教学团队</el-menu-item>
          <el-menu-item index="website">推荐网站</el-menu-item>
          <el-menu-item index="discuss">主题讨论</el-menu-item>
          <el-menu-item index="contact">联系我们</el-menu-item>
        </el-menu>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 用户是否登陆
      isLogin: false,
      // 是否打开个人中心
      isShow: false,
      // 导航栏数据
      navData: [
        {
          navName: '课程介绍',
          index: 'introduce',
          childrens: [
            {
              navName: '数据分析',
              index: '1'
            },
            {
              navName: '大数据与数据采集',
              index: '2'
            },
            {
              navName: '数据可视化',
              index: '3'
            },
            {
              navName: '机器学习与模式识别',
              index: '4'
            }
          ]
        },
        {
          navName: '课程描述',
          index: 'description',
          childrens: [
            {
              navName: '数据分析',
              index: '1'
            },
            {
              navName: '大数据与数据采集',
              index: '2'
            },
            {
              navName: '数据可视化',
              index: '3'
            },
            {
              navName: '机器学习与模式识别',
              index: '4'
            }
          ]
        },
        {
          navName: '参考教材',
          index: 'books',
          childrens: [
            {
              navName: '数据分析',
              index: '1'
            },
            {
              navName: '大数据与数据采集',
              index: '2'
            },
            {
              navName: '数据可视化',
              index: '3'
            },
            {
              navName: '机器学习与模式识别',
              index: '4'
            }
          ]
        },
        {
          navName: '课程资源',
          index: 'resourse',
          childrens: [
            {
              navName: '数据分析',
              index: '1'
            },
            {
              navName: '大数据与数据采集',
              index: '2'
            },
            {
              navName: '数据可视化',
              index: '3'
            },
            {
              navName: '机器学习与模式识别',
              index: '4'
            }
          ]
        },
        {
          navName: '教学视频',
          index: 'video',
          childrens: [
            {
              navName: '数据分析',
              index: '1'
            },
            {
              navName: '大数据与数据采集',
              index: '2'
            },
            {
              navName: '数据可视化',
              index: '3'
            },
            {
              navName: '机器学习与模式识别',
              index: '4'
            }
          ]
        },
        {
          navName: '教学改革',
          index: 'reform',
          childrens: [
            {
              navName: '数据分析',
              index: '1'
            },
            {
              navName: '大数据与数据采集',
              index: '2'
            },
            {
              navName: '数据可视化',
              index: '3'
            },
            {
              navName: '机器学习与模式识别',
              index: '4'
            }
          ]
        },
        {
          navName: '课程评价',
          index: 'evaluate',
          childrens: [
            {
              navName: '数据分析',
              index: '1'
            },
            {
              navName: '大数据与数据采集',
              index: '2'
            },
            {
              navName: '数据可视化',
              index: '3'
            },
            {
              navName: '机器学习与模式识别',
              index: '4'
            }
          ]
        }
      ],
      // 被选中导航索引
      activeIndex: ''
    }
  },
  created () {
    // 刷新页面时从sessionStorage中获取先前的索引项
    this.activeIndex = window.sessionStorage.getItem('activeIndex')
    this.isLogin = window.sessionStorage.getItem('isLogin')
    // 监听路由变化
    this.$router.beforeEach((to, from, next) => {
      if (to.path === '/discussContent') {
        this.activeIndex = 'discuss'
      } else {
        // 将/index  --> index
        this.activeIndex = to.path.slice(1)
      }
      // 将当前页菜单索引项存入sessionStorage
      window.sessionStorage.setItem('activeIndex', to.path.slice(1))
      next()
    })
  },
  methods: {
    // 登陆
    login () {
      // 编程式路由导航跳转
      this.$router.push('/login')
    },
    // 退出登录
    logout () {
      this.isLogin = false
      this.isShow = false
      window.sessionStorage.removeItem('isLogin')
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('name')
      this.$router.push('/welcome')
    },
    // 跳转至我的信息
    toInfo () {
      this.$router.push('/myinfo')
      this.isShow = false
    },
    // 跳转至我的文章
    toArticle () {
      this.$router.push('/article')
      this.isShow = false
    }
  }
}
</script>

<style scoped lang='less'>
header {
  width: 1196px;
  height: 200px;
  position: relative;
  left: 0;
  right: 0;
  margin: 0 auto;
  .logo {
    position: absolute;
    top: 42px;
    left: 30px;
  }
  .title {
    position: absolute;
    top: 66px;
    left: 477px;
    height: 30px;
    line-height: 30px;
    font-size: 30px;
    color: #2c2c2c;
    letter-spacing: 10px;
  }
  .login,
  .self {
    position: absolute;
    top: 60px;
    right: 0;
  }
  .person {
    width: 100px;
    height: 130px;
    z-index: 999;
    position: absolute;
    right: 0;
    top: 100px;
    .info {
      margin: 10px;
    }
    .article {
      margin-bottom: 10px;
    }
  }
  .nav {
    width: 1196px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
}
</style>
