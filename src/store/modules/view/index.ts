/*
 * @Description: 处理页面缓存
 */
import type { RouteRecordNameGeneric } from 'vue-router'
import type { GetterTree, MutationTree, ActionTree } from 'vuex'
import type { State } from '@/store'
import type { ConfigProviderTheme } from 'vant'
import { localStorageUtil } from '@/utils/storageUtil'
import { LocalStorageMark } from '@/constants/StorageMark'

// 自定义样式类型
type PrivateThemeType = 'green'
type ThemeType = ConfigProviderTheme | PrivateThemeType
export const themeTypeList: ThemeType[] = ['dark', 'light', 'green']

export interface ViewState {
  cacheView: RouteRecordNameGeneric[],
  theme: ThemeType
}

const state: ViewState = {
  cacheView: ['TabbarIndex'],
  theme: 'green'
}

const getters: GetterTree<ViewState, State> = {}

const mutations: MutationTree<ViewState> = {
  ADD_CACHE_VIEW: (state: ViewState, view: RouteRecordNameGeneric) => {
    if (!state.cacheView.includes(view)) {
      state.cacheView.push(view)
    }
  },
  DELETE_CACHE_VIEW: (state: ViewState, view: RouteRecordNameGeneric) => {
    const index = state.cacheView.indexOf(view)
    if (index > -1) {
      state.cacheView.splice(index, 1)
    }
  },
  SET_THEME: (state: ViewState, theme: ThemeType) => {
    state.theme = theme || 'green'
  }
}
const actions: ActionTree<ViewState, State> = {
  addCacheView ({ commit } , view: RouteRecordNameGeneric) {
    commit('ADD_CACHE_VIEW', view)
  },
  deleteCacheView ({ commit }, view: RouteRecordNameGeneric) {
    commit('DELETE_CACHE_VIEW', view)
  },
  setTheme ({ state }, theme: ThemeType = 'green') {
    if (themeTypeList.includes(theme)) {
      state.theme = theme
      localStorageUtil.setItem(LocalStorageMark.THEME, theme)
    }
  }
}
export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions
}
