import {routes} from '@/router'

function filterSideRoutes(routes) {
  return routes.filter(it => {
	if (it.children) {
	  it.children = filterSideRoutes(it.children)
	}
	return it.hasOwnProperty('meta') && it.meta.isSide
  })
}

export default {
  namespaced: true,
  state: {
	rawRoutes: routes, // 原始路由
	visitedRoutes: [], // 访问过的路由,即标签
	tagCache: [], // 标签页面缓存
  },
  mutations: {
	ADD_TAG: (state, route) => {
	  if (!route.meta || !route.meta.isTag) return
	  if (state.visitedRoutes.map(it => it.fullPath.toLowerCase()).includes(route.fullPath.toLowerCase())) return
	  state.tagCache.push({key: route.fullPath.toLowerCase(), data: null})
	  state.visitedRoutes.push(route)
	},
	DEL_TAG: (state, route) => {
	  state.tagCache = state.tagCache.filter(it => it.key !== route.fullPath.toLowerCase())
	  state.visitedRoutes = state.visitedRoutes.filter(it => it.fullPath.toLowerCase() !== route.fullPath.toLowerCase())
	},

	DEL_TAGS: (state, routes) => {
	  let keys = routes.map(it => it.fullPath.toLowerCase())

	  state.tagCache = state.tagCache.filter(it => !keys.includes(it.key))
	  state.visitedRoutes = state.visitedRoutes.filter(it => !keys.includes(it.fullPath.toLowerCase()))
	},

	UPDATE_TAG_CACHE: (state, {key, data}) => {
	  let cache = state.tagCache.find(it => it.key === key.toLowerCase())
	  cache && (cache.data = {...(cache.data || {}), ...(data || {})})
	},
  },
  actions: {},
  getters: {
	sideRoutes: state => filterSideRoutes(state.rawRoutes),
  },
}
