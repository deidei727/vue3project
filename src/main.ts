import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import '@/style/index.scss'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import router from './router'
import pinia from './store'
// 忽略当前文件ts类型的检测否则有红色提示(打包会失败)
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from '@/App.vue'
// import SvgIcon from '@/components/SvgIcon/index.vue'
import globalComponents from '@/components'
import './permission'
// import axios from 'axios'

// // // 测试接口
// axios({
//     url:'/api/user/login',
//     method:'post',
//     data:{
//         username:'admin',
//         password:'111111'
//     }
// }).then((result) => {
//     console.log(result)
// }).catch((err) => {
//     console.log(err)
// });

// axios({
//     url:'/api/user/info',
//     method:'get',

// }).then((result) => {
//     console.log(result)
// }).catch((err) => {
//     console.log(err)
// });

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})
app.use(globalComponents)
app.use(router)
app.use(pinia)
// 注册成全局组件
// app.component('SvgIcon',SvgIcon)
app.mount('#app')
