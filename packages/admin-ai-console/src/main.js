import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)
app.use(ElementPlus, { locale: zhCn })

app.mount('#app')

// 监听AI助手的导航事件
window.addEventListener('ai-assistant-navigate', (e) => {
  const path = e.detail.path
  console.log('AI助手请求导航到:', path)

  // 使用router进行页面跳转
  if (path && router) {
    router.push(path).catch(err => {
      console.error('路由跳转失败:', err)
    })
  }
})
