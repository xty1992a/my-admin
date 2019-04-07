export default {
  namespaced: true,
  state: {
    asideShow: true,
    navShow: true,
  },
  mutations: {
    CLEAR_STATE: state => {
      state.asideShow = true
      state.navShow = true
    },
    TOGGLE_ASIDE: state => state.asideShow = !state.asideShow,
    TOGGLE_NAV: (state, flag) => state.navShow = flag === undefined ? !state.navShow : flag,

  },
  actions: {},
  getters: {
    asideWidth: state => state.asideShow ? 200 : 50,
    navHeight: state => state.navShow ? 90 : 40,
  },
}
