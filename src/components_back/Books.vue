<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/back_welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{courseName}}</el-breadcrumb-item>
      <el-breadcrumb-item>参考教材</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 标签页 -->
    <el-card>
      <!-- 添加教材 -->
      <div class="addBooks">
        <label class="label" for="boo_name">教材名称:</label>
        <input
          class="input"
          placeholder="请输入教材名称"
          v-model="addData.boo_name"
          name="boo_name"
          type="text"
        />
        <label class="label" for="boo_auther">著作人:</label>
        <input
          class="input"
          placeholder="请输入著作人"
          v-model="addData.boo_auther"
          name="boo_auther"
          type="text"
        />
        <el-button type="primary" size="small" @click="addBooks">添加</el-button>
      </div>
      <el-divider></el-divider>
      <!-- 表格区域 -->
      <el-table :data="booksData" stripe style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="boo_name" label="教材名称"></el-table-column>
        <el-table-column prop="boo_auther" label="著作人"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.row.boo_id,scope.row.boo_name,scope.row.boo_auther)"
            >更新</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.boo_id)">删除</el-button>
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
          <el-form-item label="教材名称" prop="boo_name">
            <el-input type="text" v-model="handleData.boo_name"></el-input>
          </el-form-item>
          <el-form-item label="著作人" prop="boo_auther">
            <el-input type="text" v-model="handleData.boo_auther"></el-input>
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
      // 添加教材
      addData: {
        boo_name: '',
        boo_auther: ''
      },
      // 更新对话框的状态
      dialogUpdateVisible: false,
      // 删除对话框的状态
      dialogDeleteVisible: false,
      // 要进行操作的某行的数据
      handleData: {
        boo_id: 0,
        boo_name: '',
        boo_auther: ''
      },
      // 参考教材数据
      booksData: [],
      // 查询参数对象
      queryInfo: {
        courseName: this.courseName,
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
    // 添加教材
    async addBooks () {
      if (this.addData.boo_name && this.addData.boo_auther) {
        const res = await this.$http.post('books', {
          courseName: this.courseName,
          boo_name: this.addData.boo_name,
          boo_auther: this.addData.boo_auther
        })
        if (res.status === 200) {
          this.$message.success('添加成功')
          this.getData()
          this.addData.boo_name = ''
          this.addData.boo_auther = ''
        }
      } else {
        this.$message.warning('教材名称和著作人不能为空！')
      }
    },
    // 根据分页获取对应的数据
    async getData () {
      const res = await this.$http.get('books', {
        params: this.queryInfo
      })
      if (res.status === 200) {
        this.total = res.data.total
        this.booksData = res.data.data
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
    handleUpdate (booId, booName, booAuther) {
      this.dialogUpdateVisible = true
      this.handleData.boo_id = booId
      this.handleData.boo_name = booName
      this.handleData.boo_auther = booAuther
    },
    // 确认更新
    async cnofirmUpdate () {
      if (this.handleData.boo_name && this.handleData.boo_auther) {
        const res = await this.$http.put('books', {
          boo_id: this.handleData.boo_id,
          boo_name: this.handleData.boo_name,
          boo_auther: this.handleData.boo_auther
        })
        if (res.status === 200) {
          this.$message.success('更新成功')
          this.dialogUpdateVisible = false
          this.getData()
        }
      } else {
        this.$message.warning('教材名称和著作人不能为空！')
      }
    },
    // 删除
    handleDelete (booId) {
      this.dialogDeleteVisible = true
      this.handleData.boo_id = booId
    },
    // 确认删除
    async confirmDelete () {
      const res = await this.$http.delete('books', {
        params: {
          boo_id: this.handleData.boo_id
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
  },
  props: {
    // 课程名称
    courseName: String
  }
}
</script>

<style scoped lang='less'>
.addBooks {
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
