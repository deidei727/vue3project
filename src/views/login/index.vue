<template>
  <div>
    <div class="login_container">
      <el-row :gutter="20">
        <el-col :span="12" :xs="0"></el-col>
        <el-col :span="12" :xs="24">
          <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginFormRef">
            <h1>Hello</h1>
            <h3>欢迎登陆</h3>
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="请输入用户名"
                :prefix-icon="User"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                :prefix-icon="Lock"
                show-password
              />
            </el-form-item>
            <el-form-item>
              <el-button
                class="login_btn"
                type="primary"
                :loading="loading"
                @click="onSubmit"
                size="large"
              >
                登陆
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <!-- <img src="@/assets/images/background.jpg" alt=""> -->
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormRules } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import useUserPinia from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import getTime from '@/utils/times'

const loginForm = reactive({
  username: '',
  password: '',
})

interface RuleForm{
  username: string,
  password: string
}
const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 18, message: '用户名称长度在3～18位', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度在6～18位', trigger: 'blur' },
  ],
})

let $router = useRouter()
let loading = ref(false)
let loginFormRef=ref()
let useUserStore = useUserPinia()

const onSubmit = async () => {

  // 校验通过才能发送请求
  await loginFormRef.value.validate()

    // 点击登陆，要在做的事情
  // 发送请求（这种请求什么的，都放在仓库中）
  // 请求成功 ->跳转页面并展示数据
  // 请求失败 ->弹出提示框，并重新登陆
  loading.value = true
  useUserStore.userLogin(loginForm).then(result => {
      // 进行路由跳转
      $router.push('/')
      ElNotification({
        title: '登陆成功',
        message: `hi！ ${getTime()}好，欢迎登陆`,
        type: 'success',
      })
    })
    .catch(err => {
      // 弹出信息
      console.log('error!', err)
      ElNotification({
        title: '登陆失败',
        message: err,
        type: 'error',
      })
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
    width: 90%;
    position: relative;
    top: 25vh;
    padding: 40px;
    box-sizing: border-box;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    .login_btn {
      width: 100%;
    }
    h1,
    h3 {
      color: white;
    }
  }
}
</style>
