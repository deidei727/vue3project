import { defineStore } from 'pinia'
import { reqLogin ,reqUserInfo} from '@/api/user'
import type { LoginForm, LoginResponseDate,UserResponseDate } from '@/api/user/type.ts'
import { reactive, ref } from 'vue'
import constantRoute from '@/router/routes'

const useUserPinia = defineStore('User', () => {
  const token = ref<string | null>(localStorage.getItem('TOKEN') ?? null)
  const menuRoutes = constantRoute
  const userInfoDate=reactive({
    username:'',
    avatar: '',
    buttons: [],

  })
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

  async function userInfo(){
    const res:UserResponseDate=await reqUserInfo()
    if(res.code === 200) {
      userInfoDate.username = res.data.checkUser.username
      userInfoDate.avatar= res.data.checkUser.avatar
      userInfoDate.buttons=res.data.checkUser.buttons
      return 'ok'
    }else{
      return Promise.reject('获取用户信息失败')
    }
  }

  function userLoginOut(){
    userInfoDate.username = ''
    userInfoDate.avatar=''
    token.value=''
    localStorage.removeItem('TOKEN')
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
