import type { InjectionKey, App } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import modules from './modules'

export interface State {
  [x: string]: any // 解决使用 store.state.view.x 等报红线的问题
}

// InjectionKey 将store安装到Vue应用程序时提供类型,将类型传递InjectionKey给useStore方法
const key: InjectionKey<Store<State>> = Symbol()

const store = createStore<State>({
  modules
})
/**
 * 对外导出的方法，页面中使用 useStore 不在从 vuex 中引入，而是从 store 目录中，要是怕引起混淆，也可以改用其他名字
 * @returns
 */
export function useStore() {
  return baseUseStore(key)
}
// 全局注册 store
export function setupStore(app: App) {
  app.use(store, key)
}
export default store
