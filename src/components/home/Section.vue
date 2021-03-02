<template>
  <div class="container">
    <!-- 课程资源 -->
    <el-card class="description">
      <div slot="header" class="clearfix">
        <span>课程描述</span>
      </div>
      <div v-for="item in descriptionData" :key="item.courseName" class="item">
        <a href @click.prevent="handle(item.path)">{{item.courseName}}</a>
      </div>
    </el-card>
    <!-- 教学视频 -->
    <el-card class="video">
      <div slot="header" class="clearfix">
        <span>教学视频</span>
      </div>
      <div v-for="item in videoData" :key="item.courseName" class="item">
        <a href @click.prevent="handle(item.path)">{{item.courseName}}</a>
      </div>
    </el-card>
    <!-- 教学改革 -->
    <el-card class="reform">
      <div slot="header" class="clearfix">
        <span>教学改革</span>
      </div>
      <div v-for="item in reformData" :key="item.courseName" class="item">
        <a href @click.prevent="handle(item.path)">{{item.courseName}}</a>
      </div>
    </el-card>
    <!-- 课程评价 -->
    <el-card class="evaluate">
      <div slot="header" class="clearfix">
        <span>课程评价</span>
      </div>
      <div v-for="item in evaluateData" :key="item.courseName" class="item">
        <a href @click.prevent="handle(item.path)">{{item.courseName}}</a>
      </div>
    </el-card>
    <!-- 教学团队 -->
    <el-card class="teams">
      <div slot="header" class="clearfix">
        <span>教学团队</span>
      </div>
      <div v-for="item in teamsData" :key="item.title" class="item">
        <a href @click.prevent="handleTeam(item.path,item.title)">{{item.title}}</a>
      </div>
    </el-card>
    <!-- 联系我们 -->
    <el-card class="contact">
      <div slot="header" class="clearfix">
        <span>联系我们</span>
      </div>
      <div v-for="item in contactData" :key="item.title" class="item">
        <a href @click.prevent="handleContact(item.path,item.title)">{{item.title}}</a>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 课程资源
      descriptionData: [
        {
          courseName: '数据分析',
          path: '/description1'
        },
        {
          courseName: '大数据与数据采集',
          path: '/description2'
        },
        {
          courseName: '数据可视化',
          path: '/description3'
        },
        {
          courseName: '机器学习与模式识别',
          path: '/description4'
        }
      ],
      // 教学视频
      videoData: [
        {
          courseName: '数据分析',
          path: '/video1'
        },
        {
          courseName: '大数据与数据采集',
          path: '/video2'
        },
        {
          courseName: '数据可视化',
          path: '/video3'
        },
        {
          courseName: '机器学习与模式识别',
          path: '/video4'
        }
      ],
      // 教学改革
      reformData: [
        {
          courseName: '数据分析',
          path: '/reform1'
        },
        {
          courseName: '大数据与数据采集',
          path: '/reform2'
        },
        {
          courseName: '数据可视化',
          path: '/reform3'
        },
        {
          courseName: '机器学习与模式识别',
          path: '/reform4'
        }
      ],
      // 课程评价
      evaluateData: [
        {
          courseName: '数据分析',
          path: '/evaluate1'
        },
        {
          courseName: '大数据与数据采集',
          path: '/evaluate2'
        },
        {
          courseName: '数据可视化',
          path: '/evaluate3'
        },
        {
          courseName: '机器学习与模式识别',
          path: '/evaluate4'
        }
      ],
      // 教学团队
      teamsData: [
        {
          title: '整体结构',
          path: '/team'
        },
        {
          title: '教学人员',
          path: '/team'
        },
        {
          title: '师资培训',
          path: '/team'
        }
      ],
      // 联系我们
      contactData: [
        {
          title: '任课教师',
          path: '/contact'
        },
        {
          title: '课程助教',
          path: '/contact'
        },
        {
          title: '网络互动',
          path: '/contact'
        }
      ]
    }
  },
  methods: {
    // 跳转到指定路由
    // 公共的
    handle (path) {
      this.$router.push(path)
    },
    // 教学团队
    handleTeam (path, title) {
      this.$router.push(path)
      this.$store.state.teamActiveName = title
    },
    // 联系我们
    handleContact (path, title) {
      this.$router.push(path)
      this.$store.state.contactActiveName = title
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .description,
  .video,
  .reform,
  .evaluate,
  .teams,
  .contact {
    width: 300px;
    height: 175px;
    margin: 10px;
    .item {
      font-size: 14px;
      margin-bottom: 8px;
    }
  }
}
</style>
