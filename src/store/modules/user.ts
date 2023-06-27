import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import type { LoginForm, LoginResponseDate } from '@/api/user/type.ts'
import { ref } from 'vue'
import constantRoute from '@/router/routes'

const useUserPinia = defineStore('User', () => {
  const token = ref<string | null>(localStorage.getItem('TOKEN') ?? null)
  const menuRoutes = constantRoute
  
  async function userLogin(info: LoginForm) {
    const res: LoginResponseDate = await reqLogin(info)
    // 如果登陆成功了，让仓库记住token，并且要持久化存储
    // pinia/vuex都是将数据存储在对象当中，不够持久，所以，要将数据进行本地化存储
    if (res.code === 200) {
      localStorage.setItem('TOKEN', res.data.token ?? '')
      token.value = res.data.token ?? null
      return 'finish'
    } else {
      return Promise.reject(res.data.message)
    }
  }
  return {
    menuRoutes,
    userLogin,
  }
})
export default useUserPinia
