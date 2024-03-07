import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  /* 
  配置@路径识别
  --引入path模块
  --设置resolve解析路径
  --设置alias添加别名
  */
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '*': resolve('')
    },
  },

  // 配置全局scss
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/variable.module.scss";`,
        javascriptEnabled: true
      }
    }
  }
})