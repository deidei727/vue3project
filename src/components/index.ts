import SvgIcon from './SvgIcon/index.vue'
import page from './page/index.vue'
import {App, Component } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
interface allGlobalComponent{
    [key:string]:Component 
}
// 注册自定义插件
const allGlobalComponent:allGlobalComponent={SvgIcon,page}
export default{
    install(app:App){
        Object.keys(allGlobalComponent).forEach(item => {
            // 将其全部注册为全局的组件
            app.component(item, allGlobalComponent[item])
        })
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
          }
    }
}