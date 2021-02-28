<template>
  <div class="login">
    <el-form
      class="login-form"
      label-position="top"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" :loading='isLoginLoading' type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { login } from '@/services/user'
import { Form } from 'element-ui'
import { mapMutations } from 'vuex'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      },
      isLoginLoading: false
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async onSubmit () {
      try {
        // 1.表单验证
        await (this.$refs.form as Form).validate() // TS需要指定form的类型为Form

        this.isLoginLoading = true // 禁用btn

        // 2.验证通过 -> 提交表单
        const { data } = await login(this.form)
        // 3.请求结果处理
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          // 存储状态
          this.setUser(data.content)
          this.$router.push(this.$route.query.redirect as string || '/') // 确定类型
          this.$message.success('登录成功')
        }
      } catch (err) {
        console.log('登录失败', err)
      }
      this.isLoginLoading = false
    }
  }
})
</script>

<style scoped lang='scss'>
.login{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 300px;
    background: #fff;
    padding: 20px 30px;
    border-radius: 5px;
    .login-btn{
      width: 100%;
    }
  }
}
</style>
