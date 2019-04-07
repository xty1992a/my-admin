import * as API from '../../api'
import Cookie from 'js-cookie'

export default {
  namespaced: true,
  state: {
    userInfo: null,
    editorList: [],
    userList: [],
    roleInfo: null,
  },
  mutations: {
    CLEAR_STATE: state => {
      state.userInfo = null
      state.roleInfo = null
      state.editorList = []
      state.userList = []
    },
    SET_USER_INFO: (state, info) => state.userInfo = info,
    SET_ROLE_INFO: (state, info) => state.roleInfo = info,
    SET_EDITOR_LIST: (state, info) => state.editorList = info,
    SET_USER_LIST: (state, info) => state.userList = info,
  },
  actions: {
    // 根据用户名登录并返回用户数据
    async LoginByUsername({commit}, params) {
      let res = await API.login(params)
      console.log(res)
      if (res.success) {
        Cookie.set('user', res.data.token, {expires: 0.5})
        commit('SET_USER_INFO', res.data)
      }
      return res
    },
    // 读取用户cookie返回用户数据
    async getUserInfo({commit, state}) {
      if (state.userInfo) return {success: true, data: state.userInfo}
      let res = await API.getUser()
      if (res.success) {
        commit('SET_USER_INFO', res.data)
      }
      return res
    },
    async getRoleInfo({commit, state}, role) {
      if (!role) {
        if (!state.userInfo) return {success: false}
        role = state.userInfo.role
      }
      if (state.roleInfo) return {success: true, data: state.roleInfo}
      let res = await API.getRole(role)
      if (res.success) {
        commit('SET_ROLE_INFO', res.data)
      }
      return res
    },
    // 获取用户列表
    async getUserList({commit, state}) {
      let res = await API.getUserList()
      if (res.success) {
        commit('SET_USER_LIST', res.data)
      }
      return res
    },
    // 获取角色列表
    async getEditorList({commit, state}) {
      let res = await API.getEditorList()
      if (res.success) {
        commit('SET_EDITOR_LIST', res.data)
      }
      return res
    },

    Logout({commit}) {
      return new Promise(resolve => {
        Cookie.remove('user')
        commit('User/CLEAR_STATE', null, {root: true})
        commit('Router/CLEAR_STATE', null, {root: true})
        commit('App/CLEAR_STATE', null, {root: true})
        resolve()
      })
    },
  },
  getters: {},
}
