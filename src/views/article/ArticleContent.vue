<template>
  <div class="container">
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/article' }">我的文章</el-breadcrumb-item>
      <el-breadcrumb-item>内容区</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容区 -->
    <el-card>
      <!-- 标题 -->
      <h2 class="con_title">{{contentData.dis_name}}</h2>
      <!-- 作者与发布时间 -->
      <div class="con_wrap">
        <!-- 作者 -->
        <div class="con_user">{{contentData.dis_user}}</div>
        <!-- 发布时间 -->
        <div class="con_date">{{contentData.dis_date | dateFormat}}</div>
      </div>
      <!-- 内容 -->
      <p class="con_content">{{contentData.dis_content}}</p>
    </el-card>
    <!-- 评论区 -->
    <el-card>
      <!-- 发布评论 -->
      <div class="comment-box">
        <!-- 作者 -->
        <div class="user">{{localUser}}</div>
        <!-- 输入框 -->
        <el-input placeholder="请输入评论内容" v-model="comContent" class="publish" type="text" />
        <!-- 发布 -->
        <el-button type="primary" class="btn" @click="publishComment()">发表评论</el-button>
      </div>
      <!-- 评论列表 -->
      <div class="comment-list">
        <!-- 一级评论 -->
        <ul>
          <li class="item" v-for="item in commentData" :key="item.com_id">
            <div class="first-comment">
              <!-- 评论人 -->
              <div class="username">{{item.com_user}}</div>
              <!-- 评论内容 -->
              <p :title="item.com_content" class="content">{{item.com_content}}</p>
              <p class="date">{{item.com_date | dateFormat}}</p>
              <!-- 回复 -->
              <a @click="item.com_show=!item.com_show">回复</a>
              <a @click="deleteComment1(item.com_id)">删除</a>
            </div>
            <!-- 回复框 -->
            <div class="reply-box" v-show="item.com_show">
              <!-- 用户 -->
              <span>{{localUser}}</span>
              <!-- 输入框 -->
              <el-input class="reply" v-model="replyContent" placeholder="请输入回复内容" type="text" />
              <!-- 发布 -->
              <el-button size="small" type="info" class="reply-btn" @click="reply(item.com_id)">回复</el-button>
            </div>
            <!-- 二级评论 -->
            <ul>
              <li class="item1" v-for="item1 in item.children" :key="item1.com2_id">
                <div class="second-comment">
                  <!-- 评论人 -->
                  <div class="username">{{item1.com2_user}}</div>
                  <!-- 评论内容 -->
                  <p :title="item1.com2_content" class="content">{{item1.com2_content}}</p>
                  <p class="date">{{item1.com2_date | dateFormat}}</p>
                  <a @click="deleteComment2(item1.com2_id)">删除</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getDate } from '@/plugins/date.js'
export default {
  data () {
    return {
      // 文章内容
      contentData: {},
      // 评论内容
      commentData: [],
      // 当前用户
      localUser: 'user',
      // 评论框内容
      comContent: '',
      // 当前主题id dis_id
      dis_id: '',
      // 回复框内容
      replyContent: ''
    }
  },
  created () {
    this.dis_id = window.sessionStorage.getItem('dis_id')
    this.localUser = window.sessionStorage.getItem('name')
    this.getContentData()
    this.getCommentData()
  },
  methods: {
    // 获取主题内容
    async getContentData () {
      const res = await this.$http.get(`discuss?dis_id=${this.dis_id}`)
      if (res.status === 200) {
        this.contentData = res.data.data[0]
      }
    },
    // 获取评论内容
    async getCommentData () {
      const res = await this.$http.get(`comment?dis_id=${this.dis_id}`)
      if (res.status === 200) {
        this.commentData = res.data.data
        this.commentData.forEach(item => {
          if (item.com_show === 'false') {
            item.com_show = false
          }
        })
      }
    },
    // 发布评论
    async publishComment () {
      const isLogin = window.sessionStorage.getItem('isLogin')
      if (!isLogin) {
        this.$router.push('/login')
        return
      }
      // 登陆之后才能评论
      const date = getDate() // 发布时间
      const res = await this.$http.post('comment', {
        dis_id: this.dis_id,
        com_user: this.localUser,
        com_content: this.comContent,
        com_date: date
      })
      if (res.status === 200) {
        this.$message.success('发布成功')
        this.comContent = ''
        this.getCommentData()
      }
    },
    // 回复评论
    async reply (comId) {
      const isLogin = window.sessionStorage.getItem('isLogin')
      if (!isLogin) {
        this.$router.push('/login')
        return
      }
      // 登陆之后才能回复
      const date = getDate() // 回复时间
      const res = await this.$http.post('reply', {
        com_id: comId,
        com2_user: this.localUser,
        com2_content: this.replyContent,
        com2_date: date
      })
      if (res.status === 200) {
        this.$message.success('回复成功')
        this.replyContent = ''
        this.getCommentData()
      }
    },
    // 删除一级评论
    async deleteComment1 (comId) {
      const res = await this.$http.delete('comment', {
        params: {
          com_id: comId
        }
      })
      if (res.status === 200) {
        this.$message.success('删除成功')
        this.getCommentData()
      }
    },
    // 删除二级评论
    async deleteComment2 (com2Id) {
      const res = await this.$http.delete('comment2', {
        params: {
          com2_id: com2Id
        }
      })
      if (res.status === 200) {
        this.$message.success('删除成功')
        this.getCommentData()
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
  // 内容区部分
  // 标题
  .con_title {
    height: 50px;
    line-height: 50px;
    font-size: 24px;
  }
  // 作者与发布时间
  .con_wrap {
    height: 50px;
    background-color: #eee;
    line-height: 50px;
    font-size: 14px;
    margin-bottom: 20px;
    border-radius: 5px;
    .con_user {
      float: left;
      margin: 0 20px;
    }
    .con_date {
      float: left;
    }
  }
  // 内容
  .con_content {
    text-indent: 2em;
    line-height: 150%;
  }
  // 评论区
  .comment-box {
    height: 50px;
    margin-bottom: 5px;
    position: relative;
    // 作者
    .user {
      width: 100px;
      height: 35px;
      line-height: 35px;
      position: absolute;
    }
    // 评论框
    .publish {
      margin-left: 100px;
      width: 81%;
    }
    // 发表评论
    .btn {
      position: absolute;
      right: 0;
      height: 35px;
      border-radius: 3px;
    }
  }
  // 评论列表
  .comment-list {
    // 一级评论项
    .item {
      border-bottom: 1px solid #eee;
      background-color: rgba(0, 0, 0, 0.1);
      margin: 10px 0;
      .first-comment {
        display: flex;
        .username {
          width: 100px;
          height: 35px;
          line-height: 35px;
        }
        .content {
          width: 700px;
          height: 35px;
          line-height: 35px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .date {
          width: 245px;
          height: 35px;
          line-height: 35px;
          text-align: center;
        }
        a {
          width: 68px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          &:hover {
            cursor: pointer;
          }
        }
      }
      // 二级评论项
      .second-comment {
        display: flex;
        margin-left: 100px;
        border-top: 1px solid #eee;
        .username {
          width: 100px;
          height: 35px;
          line-height: 35px;
        }
        .content {
          width: 600px;
          height: 35px;
          line-height: 35px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .date {
          width: 245px;
          height: 35px;
          line-height: 35px;
          text-align: center;
        }
        a {
          width: 68px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
  // 回复框
  .reply-box {
    span {
      display: inline-block;
      width: 100px;
      margin-left: 100px;
    }
    .reply {
      display: inline-block;
      width: 53%;
    }
    .reply-btn {
      margin-left: 50px;
    }
  }
}
.el-card {
  padding: 0 20px;
  margin-bottom: 5px;
}
</style>
