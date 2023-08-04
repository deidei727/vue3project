import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ mode }) => {
  // 获取对应环境下的变量
  // 默认情况下是开发环境，通过mode可以获取测试环境和线上环境,process.cwd()是项目的根目录
  let env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        enable: true,
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    // 注册全局的sass变量
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/style/variable.scss";',
        }
      }
    },
    //代理跨域
    server: {
      proxy: {
        // 这个是不同环境下的关键字，在我们发起 请求的时候，后面会带上这个关键字，不同环境下的关键字不同
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址设置
          target: env.VITE_SERVE,
          //需要代理跨域
          changeOrigin: true,
          //路径重写,因为我们请求的接口前面是没有api的
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    }
  }
})
