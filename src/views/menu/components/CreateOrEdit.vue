<template>
  <div class='menu-create'>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{isEdit?'编辑菜单':'添加菜单'}}</span>
      </div>
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="菜单名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="菜单路径">
            <el-input v-model="form.href"></el-input>
          </el-form-item>
          <el-form-item label="上级菜单">
            <el-select v-model="form.parentId" placeholder="请选择上级菜单">
              <el-option :value="-1" label="无上级菜单"></el-option>
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="item in parentMenuList"
                :key="item.id"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item label="前端图标">
            <el-input v-model="form.icon"></el-input>
          </el-form-item>
          <el-form-item label="是否显示">
            <el-radio-group v-model="form.shown">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排序">
            <el-input-number v-model="form.orderNum" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button v-if="!isEdit">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createOrUpdateMenu, getEditMenuInfo } from '@/services/menu'

export default Vue.extend({
  name: 'menuCreate',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        parentId: -1,
        name: '1',
        href: '1',
        icon: '1',
        orderNum: 0,
        description: '123',
        shown: false
      },
      parentMenuList: [] // 父级菜单列表
    }
  },
  created () {
    this.loadMenuInfo()
  },
  methods: {
    async loadMenuInfo () {
      const { data } = await getEditMenuInfo(this.$route.params.id || -1)
      if (data.data.menuInfo) {
        this.form = data.data.menuInfo
      }
      if (data.code === '000000') {
        this.parentMenuList = data.data.parentMenuList
      }
    },
    async onSubmit () {
      const { data } = await createOrUpdateMenu(this.form)
      if (data.code === '000000') {
        this.$router.back()
      }
    },
    handleChange (value: number) {
      this.$message.success('提交成功')
      console.log(value)
    }
  }
})
</script>

<style lang="scss" scope></style>
