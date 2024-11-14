import type { GetterTree, MutationTree, ActionTree } from 'vuex'
import type { State } from '@/store'
import { CookieMark } from '@/constants/StorageMark'
import { cookieUtil } from '@/utils/storageUtil'

export interface UserState {
  token: string,
  userId: string
}

const state: UserState = {
  token: '',
  userId: ''
}

const getters: GetterTree<UserState, State> = {}

const mutations: MutationTree<UserState> = {
  SET_TOKEN (state: UserState, token: string) {
    state.token = token
    cookieUtil.setItem(CookieMark.TOKEN, token, { expires: 7 })
  }
}

const actions: ActionTree<UserState, State> = {
  setToken ({ commit }, token: string) {
    commit('SET_TOKEN', token || '')
  },
  getToken () {
    return new Promise(resolve => {
      const token = cookieUtil.getItem(CookieMark.TOKEN)
      state.token = token || ''
      resolve(token)
    })
  }
}

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions
}
