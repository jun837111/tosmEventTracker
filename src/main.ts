import { createApp } from 'vue'
import '@/assets/styles/style.css'
import App from './App.vue'

// 引入 Element Plus 的 CSS 和函式庫
import 'element-plus/dist/index.css'
import "element-plus/theme-chalk/dark/css-vars.css"
import '@/assets/styles/css-vars.css'
import ElementPlus from 'element-plus'

const app = createApp(App)

// 使用 Element Plus
app.use(ElementPlus)
app.mount('#app')