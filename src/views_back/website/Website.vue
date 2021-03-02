<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/back_welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>网站列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 标签页 -->
    <el-card>
      <!-- 添加网站 -->
      <div class="addWebsite">
        <label class="label" for="web_name">网站名称:</label>
        <input
          class="input"
          placeholder="请输入网站名称"
          v-model="addData.web_name"
          name="web_name"
          type="text"
        />
        <label class="label" for="web_link">网站地址:</label>
        <input
          class="input"
          placeholder="请输入网站地址"
          v-model="addData.web_link"
          name="web_link"
          type="text"
        />
        <el-button type="primary" size="small" @click="addWebsite">添加</el-button>
      </div>
      <el-divider></el-divider>
      <!-- 表格区域 -->
      <el-table :data="websiteData" stripe style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="web_name" label="网站名称"></el-table-column>
        <el-table-column prop="web_link" label="网站地址"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpate(scope.row.web_id,scope.row.web_name,scope.row.web_link)"
            >更新</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.web_id)">删除</el-button>
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
      <!-- 更新对话框 -->
      <el-dialog
        title="更新"
        :visible.sync="dialogUpdateVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form :model="handleData" label-width="100px" class="demo-ruleForm">
          <el-form-item label="网站名称" prop="web_name">
            <el-input type="text" v-model="handleData.web_name"></el-input>
          </el-form-item>
          <el-form-item label="网站地址" prop="web_link">
            <el-input type="text" v-model="handleData.web_link"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogUpdateVisible = false">取 消</el-button>
          <el-button type="primary" @click="cnofirmUpdate">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 删除对话框 -->
      <el-dialog
        title="删除"
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
      // 添加网站
      addData: {
        web_name: '',
        web_link: ''
      },
      // 更新对话框的状态
      dialogUpdateVisible: false,
      // 删除对话框的状态
      dialogDeleteVisible: false,
      // 要进行操作的某行的数据
      handleData: {
        web_id: 0,
        web_name: '',
        web_link: ''
      },
      // 参考网站数据
      websiteData: [],
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
    // 添加网站
    async addWebsite () {
      if (this.addData.web_name && this.addData.web_link) {
        const res = await this.$http.post('website', {
          web_name: this.addData.web_name,
          web_link: this.addData.web_link
        })
        if (res.status === 200) {
          this.$message.success('添加成功')
          this.getData()
          this.addData.web_name = ''
          this.addData.web_link = ''
        }
      } else {
        this.$message.warning('网站名称和网站地址不能为空！')
      }
    },
    // 根据分页获取对应的数据
    async getData () {
      const res = await this.$http.get('website', {
        params: this.queryInfo
      })
      if (res.status === 200) {
        this.total = res.data.total
        this.websiteData = res.data.data
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
    handleUpate (webId, webName, webAuther) {
      this.dialogUpdateVisible = true
      this.handleData.web_id = webId
      this.handleData.web_name = webName
      this.handleData.web_link = webAuther
    },
    // 确认更新
    async cnofirmUpdate () {
      if (this.handleData.web_name && this.handleData.web_link) {
        const res = await this.$http.put('website', {
          web_id: this.handleData.web_id,
          web_name: this.handleData.web_name,
          web_link: this.handleData.web_link
        })
        if (res.status === 200) {
          this.$message.success('更新成功')
          this.dialogUpdateVisible = false
          this.getData()
        }
      } else {
        this.$message.warning('网站名称和网站地址不能为空！')
      }
    },
    // 删除
    handleDelete (webId) {
      this.dialogDeleteVisible = true
      this.handleData.web_id = webId
    },
    // 确认删除
    async confirmDelete () {
      const res = await this.$http.delete('website', {
        params: {
          web_id: this.handleData.web_id
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
.addWebsite {
  margin-bottom: 20px;
  .label {
    margin-right: 5px;
  }
  .input {
    width: 300px;
    margin-right: 20px;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
  }
}
.block {
  margin-top: 20px;
}
</style>
