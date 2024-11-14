import router from './router'
import store from './store'
import type { RouteRecordNameGeneric } from 'vue-router'

// 登录白名单
export const whiteList: RouteRecordNameGeneric[] = ['Login']
// vue-router4 之后 next 作为可选参数

router.beforeEach(async to => {
  // 白名单不校验 token
  if (whiteList.includes(to.name)) return
  // 获取 token
  const token = await store.dispatch('getToken')
  if (!token) return '/login'
})
