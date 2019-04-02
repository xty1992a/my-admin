// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './icons/index.js'
import Element from 'element-ui'
import './styles/index.less'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index.js'
import storage from './utils/setStorage'
// import './mock'

Vue.use(Element, {size: 'medium'})

Vue.config.productionTip = false
Vue.prototype.$storage = storage

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>',
})
