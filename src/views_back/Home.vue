<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header style="height:'80px'">
      <div>
        <img src="@/assets/image/logo.png" alt />
        <span>数 据 分 析 后 台 管 理 系 统</span>
      </div>
      <el-button @click="logout" type="info">退出</el-button>
    </el-header>
    <!-- 页面主题区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 折叠切换 -->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区 -->
        <el-menu
          background-color="rgba(0, 0, 0, 0.2)"
          text-color="#fff"
          active-text-color="#409EEF"
          :collapse="isCollapse"
          :collapse-transition="false"
          unique-opened
          router
          :default-active="activeIndex"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.index" v-for="item in menulist" :key="item.index">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="item.icon"></i>
              <!-- 文本 -->
              <span>{{item.navName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="item.index+subItem.index"
              v-for="subItem in item.childrens"
              :key="subItem.index"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.navName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 菜单列表
      menulist: [
        {
          navName: '用户管理',
          index: 'b',
          icon: 'el-icon-user',
          childrens: [
            {
              navName: '用户列表',
              index: 'ack_user'
            }
          ]
        },
        {
          navName: '课程介绍',
          index: 'back_introduce',
          icon: 'el-icon-s-promotion',
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
          index: 'back_description',
          icon: 'el-icon-s-flag',
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
          index: 'back_books',
          icon: 'el-icon-notebook-1',
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
          index: 'back_resourse',
          icon: 'el-icon-files',
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
          index: 'back_video',
          icon: 'el-icon-camera',
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
          index: 'back_reform',
          icon: 'el-icon-s-data',
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
          index: 'back_evaluate',
          icon: 'el-icon-s-comment',
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
          navName: '教学团队',
          index: 'ba',
          icon: 'el-icon-s-custom',
          childrens: [
            {
              navName: '教学团队',
              index: 'ck_team'
            }
          ]
        },
        {
          navName: '推荐网站',
          index: 'bac',
          icon: 'el-icon-more',
          childrens: [
            {
              navName: '网站列表',
              index: 'k_website'
            }
          ]
        },
        {
          navName: '主题讨论',
          index: 'back',
          icon: 'el-icon-s-help',
          childrens: [
            {
              navName: '主题讨论',
              index: '_discuss'
            }
          ]
        },
        {
          navName: '联系我们',
          index: 'back_',
          icon: 'el-icon-phone',
          childrens: [
            {
              navName: '联系我们',
              index: 'contact'
            }
          ]
        }
      ],
      // 当前被激活的二级菜单的path
      activeIndex: '',
      // 是否折叠
      isCollapse: false
    }
  },
  created () {
    // 刷新页面时从sessionStorage中获取先前的索引项
    this.activeIndex = window.sessionStorage.getItem('activeIndex')
    // 监听路由变化
    this.$router.beforeEach((to, from, next) => {
      this.activeIndex = to.path.slice(1)
      // 将当前页菜单索引项存入sessionStorage
      window.sessionStorage.setItem('activeIndex', to.path.slice(1))
      next()
    })
  },
  methods: {
    // 退出登录
    logout () {
      window.sessionStorage.clear()
      // 跳转到登录页
      this.$router.push('/login')
    },
    // 折叠切换
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: black;
  font-size: 24px;
  div {
    display: flex;
    align-items: center;
    span {
      margin-left: 500px;
      word-spacing: 2px;
    }
    img {
      margin-left: 60px;
      width: 80px;
      height: 80px;
    }
  }
}
.el-aside {
  background-color: rgba(0, 0, 0, 0.2);
  .toggle-button {
    background-color: rgba(0, 0, 0, 0.2);
    font-size: 10px;
    line-height: 24px;
    color: black;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
</style>
