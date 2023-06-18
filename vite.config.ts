import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(()=>{
 return {
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')], 
      symbolId: 'icon-[dir]-[name]',
    }),
    viteMockServe({
      enable:true,
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
    },
  }, 
  // 注册全局的sass变量
  css:{
    preprocessorOptions:{
      scss:{
        javascriptEnabled: true,
        additionalData: '@import "./src/style/variable.scss";',
      }
    }
  }
 }
})
