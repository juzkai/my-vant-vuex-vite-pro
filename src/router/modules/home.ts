/*
 * @Description:
 */
import { RouteRecordRaw } from 'vue-router'
const homeRouter: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue')
  }
]
export default homeRouter
