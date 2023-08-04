import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type { LoginFormData, LoginResponseDate, UserResponseDate,LogoOutResponseDate} from '@/api/user/type.ts'
import { reactive, ref } from 'vue'
import constantRoute from '@/router/routes'

const useUserPinia = defineStore('User', () => {
  const token = ref<string | null>(localStorage.getItem('TOKEN') ?? null)
  const menuRoutes = constantRoute
  const userInfoDate = reactive({
    username: '',
    avatar: '',
    buttons: [],

  })
  async function userLogin(info: LoginFormData) {
    const res: LoginResponseDate = await reqLogin(info)
    // 如果登陆成功了，让仓库记住token，并且要持久化存储
    // pinia/vuex都是将数据存储在对象当中，不够持久，所以，要将数据进行本地化存储
    console.log(res)
    if (res.code === 200) {
      localStorage.setItem('TOKEN', res.data ?? '')
      token.value = res.data ?? null
      return 'finish'
    } else {
      return Promise.reject(res.message)
    }
  }

  async function userInfo() {
    const res: UserResponseDate = await reqUserInfo()
    if (res.code === 200) {
      userInfoDate.username = res.data.name
      userInfoDate.avatar = res.data.avatar
      return 'ok'
    } else {
      return Promise.reject(res.message)
    }
  }

  async function userLoginOut() {
    const res:LogoOutResponseDate = await reqLogout()

    if (res.code === 200) {
      userInfoDate.username =''
      userInfoDate.avatar = ''
       token.value=res.data
      localStorage.removeItem('TOKEN')
      return 'ok'
    }else {
      return Promise.reject(new Error(res.message))
    }

  }
  return {
    menuRoutes,
    userLogin,
    token,
    userInfo,
    userInfoDate,
    userLoginOut,

  }
})
export default useUserPinia
