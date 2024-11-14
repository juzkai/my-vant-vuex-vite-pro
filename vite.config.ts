import { UserConfig, ConfigEnv, loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// https://vant-ui.github.io/vant/#/zh-CN/quickstart
import { VantResolver } from '@vant/auto-import-resolver'
import { resolve } from 'path'

const pathSrc = resolve(__dirname, 'src')
// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: './',
    build: {
      outDir: 'vitepro' // 默认: dist
      // assetsDir: 'assets'
    },
    resolve: {
      alias: {
        '@': pathSrc,
      },
    },
    css: {
      // CSS 预处理器
      preprocessorOptions: {
        // 定义全局 less 变量
        less: {
          javascriptEnabled: true,
          // 写法一
          additionalData: `
            @import '${resolve(__dirname, 'src/styles/variables.module.less')}';
          `,
          // 写法二
          // additionalData: `
          //   @import 'src/styles/variables.less';
          // `,
        },
      },
    },
    server: {
      // 允许IP访问
      host: '0.0.0.0',
      // 应用端口
      port: Number(env.VITE_APP_PORT),
      // 运行是否自动打开浏览器
      open: true,
      proxy: {
        /**
         * 反向代理解决跨域配置
         */
        [env.VITE_APP_BASE_API]: {
          changeOrigin: true,
          target: env.VITE_APP_API_URL,
          rewrite: (path) =>
            path.replace(new RegExp('^' + env.VITE_APP_BASE_API), ''),
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue', 'vue-router', '@vueuse/core'],
        // 自动导入 vant 相关函数 API，如：showToast
        resolvers: [VantResolver()],
        vueTemplate: true,
        // 配置文件生成位置(false:关闭自动生成)
        dts: false,
        // dts: 'src/typings/auto-imports.d.ts',
      }),
      Components({
        // 自动导入 vant 组件
        resolvers: [VantResolver()],
        // 指定自定义组件位置(默认:src/components)
        dirs: ['src/components', 'src/**/components'],
        // 配置文件位置 (false:关闭自动生成)
        dts: false,
        // dts: 'src/typings/components.d.ts',
      }),
    ],

  }
})
