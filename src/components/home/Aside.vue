<template>
  <div>
    <!-- 课程资源 -->
    <el-card class="resourse">
      <div slot="header" class="clearfix">
        <span>课程资源</span>
      </div>
      <div v-for="item in courseData" :key="item.courseName" class="item">
        <a href @click.prevent="handle(item.path)">{{item.courseName}}</a>
      </div>
    </el-card>
    <!-- 推荐网站 -->
    <el-card class="website">
      <div slot="header" class="clearfix">
        <span>推荐网站</span>
      </div>
      <div v-for="item in websiteData" :key="item.web_id" class="item">
        <a target="_blank" :href="item.web_link">{{item.web_name}}</a>
      </div>
    </el-card>
    <!-- 参考教材 -->
    <el-card class="books">
      <div slot="header" class="clearfix">
        <span>参考教材</span>
      </div>
      <div v-for="item in booksData" :key="item.courseName" class="item">
        <a href @click.prevent="handle(item.path)">{{item.courseName}}</a>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 课程资源
      courseData: [
        {
          courseName: '数据分析',
          path: '/resourse1'
        },
        {
          courseName: '大数据与数据采集',
          path: '/resourse2'
        },
        {
          courseName: '数据可视化',
          path: '/resourse3'
        },
        {
          courseName: '机器学习与模式识别',
          path: '/resourse4'
        }
      ],
      // 推荐网站
      websiteData: [],
      // 参考教材
      booksData: [
        {
          courseName: '数据分析',
          path: '/books1'
        },
        {
          courseName: '大数据与数据采集',
          path: '/books2'
        },
        {
          courseName: '数据可视化',
          path: '/books3'
        },
        {
          courseName: '机器学习与模式识别',
          path: '/books4'
        }
      ]
    }
  },
  created() {
    this.getWebsiteData()
  },
  methods: {
    // 跳转到指定路由
    handle(path) {
      this.$router.push(path)
    },
    // 获取推荐网站数据
    async getWebsiteData() {
      const res = await this.$http.get('website')
      if (res.status === 200) {
        this.websiteData = res.data.data
      }
    }
  }
}
</script>

<style scoped lang='less'>
// 课程资源,推荐网站，参考教材
.resourse,
.website,
.books {
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
  .item {
    font-size: 14px;
    margin-bottom: 10px;
  }
}
.website {
  overflow-y: scroll;
}
</style>
