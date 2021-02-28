<template>
  <div class='resource-list'>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :inline="true" :model="form" class="demo-form-inline" size="small">
          <el-form-item label="资源名称:" prop="name">
            <el-input v-model="form.name" placeholder="资源名称"></el-input>
          </el-form-item>
          <el-form-item label="资源路径:" prop="url">
            <el-input v-model="form.url" placeholder="资源路径"></el-input>
          </el-form-item>
          <el-form-item label="资源分类:" prop="categoryId">
            <el-select clearable v-model="form.categoryId" placeholder="资源分类">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option
                v-for="item in resourceCategories"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm" style="float: right;" :disabled="isLoading">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" style="float: right;" :disabled="isLoading">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="">
          <el-button style="float: right;" size="mini" @click="editResource">添加</el-button>
          <el-button style="float: right; margin-top:10px" size="mini" @click="$router.push('/resource/category')">资源分类</el-button>
        </div>
      </div>
      <el-table
        v-loading='isLoading'
        :data="resourceList"
        border
        style="width: 100%">
        <el-table-column
          label="编号"
          prop='id'
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="url"
          label="资源路径">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="添加时间">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button class="edit-class" @click="editResource(scope.row)" type="text" size="small">编辑</el-button>
            <el-button class="edit-class" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :disabled="isLoading"
        class="page-class"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="form.current"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourcePages } from '@/services/resource'
import { getResourceCategories } from '@/services/resource-category'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'ResourceList',
  data () {
    return {
      form: {
        name: '',
        url: '',
        current: 1,
        size: 5,
        categoryId: null
      },
      totalCount: null,
      resourceList: [],
      resourceCategories: [],
      isLoading: true,
      dialogVisible: false
    }
  },
  created () {
    this.loadResourceData()
    this.loadResourceCategories()
  },
  methods: {
    async loadResourceData () {
      this.isLoading = true
      const { data } = await getResourcePages(this.form)
      this.resourceList = data.data.records
      this.totalCount = data.data.total
      this.isLoading = false
    },
    async loadResourceCategories () {
      const { data } = await getResourceCategories()
      this.resourceCategories = data.data
    },
    onSubmit () {
      this.form.current = 1
      this.loadResourceData()
    },
    resetForm () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1
      this.loadResourceData()
    },
    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1
      this.loadResourceData()
    },
    handleCurrentChange (val: number) {
      this.form.current = val
      this.loadResourceData()
    },
    editResource () {
      this.dialogVisible = true
    },
    handleClose (done: () => void) {
      this.$confirm('确认关闭？')
        .then(() => {
          done()
        })
        // .catch(() => {})
    }
  }
})
</script>

<style lang="scss" scope>
.clearfix{
  display: flex;
  align-items: center;
  .demo-form-inline{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    .el-form-item{
      display: flex;
      align-items: center;
      margin: 0;
      margin-left: 15px;
    }
  }
}
.edit-class{
  color: $primary-color;
}
.page-class{
  margin-top: 15px;
}
</style>
