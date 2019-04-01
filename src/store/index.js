import Vue from 'vue'
import VueX from 'vuex'

import App from './modules/App'
import Router from './modules/Router'
import User from './modules/User'

Vue.use(VueX)

export default new VueX.Store({
  modules: {
	Router,
	User,
	App,
  },
})
