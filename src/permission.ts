import router from '@/router'
import nprogress from 'nprogress'
import pinia from './store'
import { ElMessage } from 'element-plus'
import useUserPinia from '@/store/modules/user'

const userStore = useUserPinia(pinia)
// 引入进度条的样式
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
router.beforeEach(async (to, from, next) => {
  nprogress.start()
  const token = userStore.token
  // 用户登陆了
  if (token) {

    if (token == localStorage.getItem('TOKEN') && to.path === '/login') {
      // 当用户还要访问登陆页的时候，将其跳转到/路径
      next('/')
    } else {
      try {
        // 请求用户信息
        await userStore.userInfo()
        next()
      } catch (e) {
        // 请求失败或者是token被更改了或者token过期了
       userStore.userLoginOut()
        ElMessage({
          type: 'error',
          message: '你的登陆信息过期了，请重新登陆',
        })
        next({
          path: '/login',
          query: {
            redirect: to.path
          }
        })
      }
    }
  } else {
    // 用户没有登陆
    // 如果访问的是login页面，允许通过.否则跳转到登陆页面
    if (to.path == '/login') {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.path,
        },
      })
    }
  }
})
router.afterEach((to, from) => {
  nprogress.done()
})

// 路由鉴权 结合token和路由守卫进行实现
// 当全局前置守卫的时候通过token判断是否有登陆过 使用pinia存储的数据进行判断
// 当登陆了，其他几个子页面均可以访问
// 未登陆，其他几个页面均不能访问
