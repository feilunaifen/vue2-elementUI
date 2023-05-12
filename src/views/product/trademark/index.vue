<template>
  <el-card>
    <template #header>
      <el-button type="primary" @click="isShow">添加品牌</el-button>
    </template>
    <el-table border style="width: 100%" :data=records>
      <el-table-column label="序号" align="center" width="80" type="index">
      </el-table-column>
      <el-table-column label="品牌名称" prop="tmName">
      </el-table-column>
      <el-table-column label="品牌LOGO" prop="logoUrl">
        <template slot-scope="{row}">
          <img :src="row.logoUrl" alt="" width="100px">
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row,$index}">
          <el-button type="warning" icon="el-icon-edit-outline" @click="updataTmShow(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <!-- @size-change="handleSizeChange" @current-change="handleCurrentChange" -->
      <el-pagination :current-page="page" :page-sizes="[5, 10, 15]" :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @current-change="handleCurrentChange"
        @size-change="handleSizeChange">
      </el-pagination>
    </div>
    <el-dialog :title="tmForm.id ? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible">
      <el-form v-model="tmForm">
        <el-form-item label="品牌名称" label-width="100px">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌logo" label-width="100px" :show-file-list="false" :auto-upload="false">
          <!-- :on-success="handleAvatarSuccess" -->
          <el-upload class="avatar-uploader" action="/dev-api/admin/product/fileUpload" :show-file-list="false"
            :before-upload="beforeAvatarUpload">
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过2M</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { reqTrademark } from "@/api/product/trademark";
export default {
  name: 'Trademark',

  data() {
    return {
      page: 1, //当前显示页面
      limit: 5,  //每页显示条数
      total: 0,  //总数据
      records: [],  //显示的数据
      tmForm: {
        logoUrl: '',
        tmName: ''
      },
      dialogFormVisible: false
    }
  },

  mounted() {
    this.getTrademark()
  },

  methods: {
    //获取列表数据
    async getTrademark() {
      const { page, limit } = this
      const re = await reqTrademark(page, limit)
      console.log(re);
      if (re.code === 200) {
        this.total = re.data.total
        this.records = re.data.records
      }
    },

    //点击跳转页面
    handleCurrentChange(pages) {
      // console.log(pages);
      this.page = pages
      this.getTrademark()
    },

    //每页显示条数
    handleSizeChange(limit) {
      this.limit = limit
      this.getTrademark()
    },

    //点击显示添加
    isShow() {
      this.dialogFormVisible = true
      //每次点击清空表单
      this.tmForm = {
        tmName: "",
        logoUrl: ""
      }
    },
    //点击显示修改
    updataTmShow(row) {
      this.dialogFormVisible = true
      console.log(row);
      this.tmForm = { ...row }
    },

    //添加或修改品牌


    //限制图片格式和大小
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
