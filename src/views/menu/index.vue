<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push('/menu/create')">添加菜单</el-button>
      </div>
      <el-table
        :data="menus"
        style="width: 100%">
        <el-table-column
          min-width="150px"
          label="编号"
          type="index">
        </el-table-column>
        <el-table-column
          prop="name"
          min-width="150px"
          label="菜单名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="level"
          min-width="150px"
          label="菜单级数">
        </el-table-column>
        <el-table-column
          prop="icon"
          min-width="150px"
          label="前端图标">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          min-width="150px"
          label="排序">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllMenus, deleteMenu } from '@/services/menu'

export default Vue.extend({
  name: 'MenuIndex',
  data () {
    return {
      menus: []
    }
  },
  created () {
    this.loadAllMenus()
  },
  methods: {
    async loadAllMenus () {
      const { data } = await getAllMenus()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    // eslint-disable-next-line
    handleEdit (item: any) {
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: item.id
        }
      })
    },
    /* eslint-disable-next-line */
    handleDelete (item: any) {
      console.log(item)
      this.$confirm('确认删除吗?', '删除提示', {})
        .then(async () => {
          //  删除操作
          const { data } = await deleteMenu(item.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadAllMenus()
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    }
  }
})
</script>

<style scoped lang='scss'></style>
