// 对axios进行二次封装
import axios from 'axios';
import { ElMessage } from 'element-plus'
import useUserPinia from '@/store/modules/user'

//axios.create()方法会创建一个和axios一样的东西，但是我们可以在创建的时候对其进行配置

const request=axios.create({
    baseURL:import.meta.env.VITE_APP_BASE_API,
    timeout:5000,

})

// 请求拦截器
request.interceptors.request.use((config)=>{
    // useUserPinia() 函数的初始化过程需要在应用程序初始化之后才能完成，所以不能直接放在最开始的位置
    const userStore = useUserPinia()
    console.log("请求",userStore.token)
    //  在config配置对象中有一个headers属性请求头，经常给服务器端携带参数
    config.headers.token=localStorage.getItem("TOKEN")
    return config
})

// 响应拦截器
request.interceptors.response.use((res)=>{
    // 可以简化响应的结果
    console.log(res.data.data.token)
    // if(!res.data.data.token){
    //     console.log('跳转')
    // }
    return res.data
},(err)=>{
    let message=''
    const  status=err.response.status
    switch (status) {
        case 401:
            message='TOKEN过期';
            break;
        case 403:
            message='无权访问';
            break;
        case 404:
            message='请求地址错误';
            break;
        case 500:
            message='服务器出错';
            break; 
        default:
            message='网络出现问题';
            break;
    }
    ElMessage({
        type:'error',
        message
    })

    return Promise.reject(err)

})

// 讲封装好的axios，对外进行暴露
export default request