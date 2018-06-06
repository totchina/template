import { TOKENS, LOGIN_USER_INFO_KEY } from 'utils/constants'
import { LocalStorage } from 'utils/config'

export default () => {
  const SET_TOKENS = 'SET_TOKENS'
  const DEL_TOKENS = 'DEL_TOKENS'
  const SET_LOGIN_USER_INFO = 'SET_LOGIN_USER_INFO'

  const state = {
    tokens: LocalStorage.get(TOKENS) || {},
    loginUserInfo: LocalStorage.get(LOGIN_USER_INFO_KEY) || {}
  }

  const getters = {
    tokens: state => {
      return state.tokens
    },
    loginUserInfo: state => state.loginUserInfo
  }

  const actions = {
    setTokens ({ commit }, value) {
      commit(SET_TOKENS, value)
    },
    delTokens ({ commit }) {
      commit(DEL_TOKENS)
    },
    setLoginUserInfo ({ commit }, user) {
      commit(SET_LOGIN_USER_INFO, user)
    }
  }

  const mutations = {
    [SET_TOKENS] (state, value) {
      state.tokens = value
      LocalStorage.set(TOKENS, value)
    },
    [DEL_TOKENS] (state, value) {
      state.tokens = {}
      state.loginUserInfo = {}
      LocalStorage.remove(TOKENS)
      LocalStorage.remove(LOGIN_USER_INFO_KEY)
    },
    [SET_LOGIN_USER_INFO] (state, user) {
      state.loginUserInfo = user
      // state.loginUserInfo.user_name = (user.org_exinfo && user.org_exinfo.real_name) || user.nick_name || user.user_name || user.user_id
      state.loginUserInfo.user_name = (user.org_exinfo && user.org_exinfo.real_name) || user.nick_name || user.user_name
      LocalStorage.set(LOGIN_USER_INFO_KEY, state.loginUserInfo)
    }
  }
  return {
    state,
    getters,
    actions,
    mutations
  }
}
