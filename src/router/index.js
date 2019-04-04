import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import Login from '@/views/Login'

Vue.use(Router)

export const routes = [
  {
	path: '/',
	redirect: '/Home/index',
	name: 'Root',
	meta: {
	  redirectName: 'HomeIndex',
	  free: true,
	  title: '根页面',
	},
  },
  {
	path: '/Login',
	name: 'Login',
	component: Login,
	meta: {
	  isSide: false, isTag: false, title: '登录', icon: '', free: true,
	},
  },
  {
	path: '/Home',
	name: 'Home',
	component: Layout,
	meta: {isSide: true, isTag: true, title: '首页', icon: 'menu_my'},
	children: [
	  {
		path: 'Index',
		name: 'Index',
		component: () => import('@/views/Home/index.vue'),
		meta: {isSide: true, isTag: true, title: '我的', icon: 'menu_my'},
	  },
	  {
		path: 'AuthEdit',
		name: 'AuthEdit',
		component: () => import('@/views/Home/AuthEdit'),
		meta: {isSide: true, isTag: true, title: '权限编辑', icon: 'menu_my'},
	  },
	  {
		path: 'UserEdit',
		name: 'UserEdit',
		component: () => import('@/views/Home/UserEdit'),
		meta: {isSide: false, isTag: true, title: '用户编辑', icon: 'menu_my'},
	  },
	],
  },
  {
	path: '/Dashboard',
	name: 'Dashboard',
	component: Layout,
	meta: {isSide: true, isTag: true, title: '面板', icon: 'menu_effect_statistics'},
	children: [
	  {
		path: 'DashboardActivity',
		name: 'DashboardActivity',
		component: () => import('@/views/Dashboard/index.vue'),
		meta: {isSide: true, isTag: true, title: '活动统计', icon: 'menu_effect_statistics'},
	  },
	],
  },
  {
	path: '/Activity',
	name: 'Activity',
	component: Layout,
	meta: {isSide: true, isTag: true, title: '活动', icon: 'menu_activity_creation'},
	children: [
	  {
		path: 'ActivityList',
		name: 'ActivityList',
		component: () => import('@/views/ActivityList/index.vue'),
		meta: {isSide: true, isTag: true, title: '活动列表', icon: 'menu_activity_creation'},
	  },
	  {
		path: 'ActivityListDetail/:activity_id',
		name: 'ActivityListDetail',
		component: () => import('@/views/ActivityListDetail/index.vue'),
		meta: {isSide: false, isTag: true, title: '活动详情', icon: 'menu_activity_creation'},
	  },
	],
  },
  {
	path: '/Test',
	name: 'Test',
	component: Layout,
	meta: {isSide: true, isTag: true, title: '测试', icon: 'menu_management'},
	children: [
	  {
		path: 'Icons',
		name: 'Icons',
		component: () => import('@/views/Test/Icons/index.vue'),
		meta: {isSide: true, isTag: true, title: '图标', icon: 'menu_management'},
	  },
	],
  },
  {
	path: '/Error',
	name: 'Error',
	component: Layout,
	meta: {isSide: false, isTag: true, title: '错误', icon: 'menu_management'},
	children: [
	  {
		path: 'NoAuth',
		name: 'NoAuth',
		component: () => import('@/views/Error/NoAuth/index.vue'),
		meta: {isSide: true, isTag: true, title: '没有权限', icon: 'menu_management', free: true},
	  },
	],
  },
]

const router = new Router({
  routes,
})

export default router
