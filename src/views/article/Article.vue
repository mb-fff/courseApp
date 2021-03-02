<template>
  <div class="container">
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的文章</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 标签页 -->
    <el-card>
      <el-tabs tab-position="left">
        <!-- 我的文章 -->
        <el-tab-pane label="我的文章">
          <ul>
            <li v-for="item in discussData" :key="item.dis_id">
              <el-card class="tit_item">
                <h2 @click="handleTo(item)" class="tit_title">{{item.dis_name}}</h2>
                <div class="tit_bottom">
                  <p class="tit_user">{{item.dis_user}}</p>
                  <p class="tit_content" @click="handleTo(item)">{{item.dis_content}}</p>
                  <el-button type="danger" class="tit_btn" @click="deleteArticle(item.dis_id)">删除</el-button>
                </div>
              </el-card>
            </li>
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
          </ul>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 主题讨论
      discussData: [],
      // 查询参数对象
      queryInfo: {
        dis_user: window.sessionStorage.getItem('name'),
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
    // 根据分页获取对应的数据
    async getData () {
      const res = await this.$http.get('discuss', {
        params: this.queryInfo
      })
      if (res.status === 200) {
        this.total = res.data.total
        this.discussData = res.data.data
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
    // 跳转至内容区
    handleTo (item) {
      this.$router.push('/articleContent')
      window.sessionStorage.setItem('dis_id', item.dis_id)
    },
    // 删除文章
    async deleteArticle (disId) {
      const res = await this.$http.delete('discuss', {
        params: {
          dis_id: disId
        }
      })
      if (res.status === 200) {
        this.$message.success('删除成功')
        this.getData()
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
  .tit_item {
    margin-bottom: 10px;
    position: relative;
  }
  .tit_title {
    height: 30px;
    font-size: 20px;
    line-height: 30px;
    margin-bottom: 10px;
    &:hover {
      color: red;
      cursor: pointer;
    }
  }
  .tit_bottom {
    margin-bottom: 20px;
    font-size: 14px;
    .tit_user {
      float: left;
      margin-right: 30px;
    }
    .tit_content {
      float: left;
      width: 800px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      &:hover {
        color: red;
        cursor: pointer;
      }
    }
    .tit_btn {
      position: absolute;
      top: 39px;
      right: 20px;
    }
  }
}
</style>
