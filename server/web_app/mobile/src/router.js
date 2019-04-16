import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
	{
	  path: '/',
	  name: 'root',
	  redirect: '/MicroPage',
	},
	{
	  path: '/MicroPage',
	  name: 'micro-page',
	  component: () => import('./views/MicroPage/index.vue'),
	},
  ],
})
