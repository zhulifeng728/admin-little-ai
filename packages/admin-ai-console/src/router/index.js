import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/knowledge',
      children: [
        {
          path: 'knowledge',
          name: 'Knowledge',
          component: () => import('../views/Knowledge.vue'),
          meta: { title: '知识库管理' }
        },
        {
          path: 'routes',
          name: 'Routes',
          component: () => import('../views/Routes.vue'),
          meta: { title: '路由配置' }
        },
        {
          path: 'models',
          name: 'Models',
          component: () => import('../views/Models.vue'),
          meta: { title: 'AI模型配置' }
        }
      ]
    }
  ]
})

export default router
