/*
 * 底部标题栏
 */
import { RouteRecordRaw } from 'vue-router'
const tabbarRouter: RouteRecordRaw[] = [
  {
    path: '/tabbar/home',
    name: 'TabbarHome',
    component: () => import('@/views/tabbar/home/index.vue'),
    meta: { title: '首页', icon: 'home-o', isTabbar: true }
  },
  {
    path: '/tabbar/my',
    name: 'TabbarMy',
    component: () => import('@/views/tabbar/my/index.vue'),
    meta: { title: '我的', icon: 'friends-o', isTabbar: true }
  },
]
export default tabbarRouter
