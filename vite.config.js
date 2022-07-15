import { defineConfig, loadEnv } from 'vite'  // defineConfig对vite进行配置
import react from '@vitejs/plugin-react'
import postcss from 'postcss-pxtorem'
import vitePluginImp from 'vite-plugin-imp' //vitePluginImp 是将 antd-mobile 进行按需加载


export default defineConfig((command, mode) => {
  return {
    plugins: [
      react(),
      // antd按需引入样式
      vitePluginImp({
        libList: [
          {
            libName: 'antd-mobile',
            libDirectory: 'es/components',
            style(name) {
              return `antd-mobile/es/components/${name}/${name}.css`
            },
          },
        ]
      })
    ],
    // 配置别名
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
      alias: {
        '@': '/src'
      }
    },
    // 服务端代理配置
    server: {
      proxy: {
        // 选项写法
        '/api': {
          target: 'https://www.xxx.xxx',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      }
    },
    // css模块适配移动端
    css: {
      postcss: {
        plugins: [
          postcss({ // 把px单位换算成rem单位
            rootValue: 32, // 换算基数，默认100，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
            propList: ['*'], //属性的选择器，*表示通用
            unitPrecision: 5, // 允许REM单位增长到的十进制数字,小数点后保留的位数。
            exclude: /(node_module)/,  // 默认false，可以（reg）利用正则表达式排除某些文件夹的方法
          })
        ]
      }
    }
  }

})
