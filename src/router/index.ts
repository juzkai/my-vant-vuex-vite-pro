import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import homeRouter from './modules/home'
import tabbarRouter from './modules/tabbar'
// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/tabbar/home',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  ...homeRouter,
  ...tabbarRouter
]
/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: '/login' })
}

export default router
