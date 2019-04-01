export default {
  namespaced: true,
  state: {
	asideShow: true,
	navShow: true,
  },
  mutations: {
	TOGGLE_ASIDE: state => state.asideShow = !state.asideShow,
	TOGGLE_NAV: (state, flag) => state.navShow = flag === undefined ? !state.navShow : flag,
  },
  actions: {},
  getters: {
	asideWidth: state => state.asideShow ? 200 : 50,
	navHeight: state => state.navShow ? 90 : 40,
  },
}
