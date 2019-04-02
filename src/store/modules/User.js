import * as API from '../../api'
import Cookie from 'js-cookie'

export default {
  namespaced: true,
  state: {
	userInfo: null,
  },
  mutations: {
	SET_USER_INFO: (state, info) => state.userInfo = info,
  },
  actions: {
	async LoginByUsername({commit}, params) {
	  let res = await API.login(params)
	  console.log(res)
	  if (res.success) {
		Cookie.set('user', res.data.data.token, {expires: 1})
		commit('SET_USER_INFO', res.data.data)
	  }
	  return res
	},
	async getUserInfo({commit}, params) {
	  let res = await API.getUser(params)
	  console.log(res)

	  return {success: false}
	},
  },
  getters: {},
}
