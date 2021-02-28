<template>
  <div class='resource-category'>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="mini">添加</el-button>
      </div>
      <el-table
        v-loading='isLoading'
        :data="resourceList"
        border
        style="width: 100%">
        <el-table-column
          label="编号"
          prop='id'
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="url"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="description"
          label="排序">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button class="edit-class" @click="editResource(scope.row)" type="text" size="small">编辑</el-button>
            <el-button class="edit-class" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ResourceCategory',
  data () {
    return {
      isLoading: false,
      resourceList: [{}, {}]
    }
  }
})
</script>

<style lang="scss" scope></style>
