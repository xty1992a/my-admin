import {routes} from '@/router'
import storage from '@/utils/setStorage'

const copy = o => JSON.parse(JSON.stringify(o))
const tagCache = storage.getItem('vuex_cache_tagCache') || []
const visitedRoutes = storage.getItem('vuex_cache_visitedRoutes') || []

function filterSideRoutes(routes, roleInfo) {
  const authList = roleInfo ? roleInfo.authList : []
  return routes.filter(it => {
	if (it.children) {
	  it.children = filterSideRoutes(it.children, roleInfo)
	}
	return it.hasOwnProperty('meta') && it.meta.isSide && authList.includes(it.name)
  })
}

export default {
  namespaced: true,
  state: {
	rawRoutes: routes, // 原始路由
	visitedRoutes, // 访问过的路由,即标签
	tagCache, // 标签页面缓存
  },
  mutations: {
	CLEAR_STATE: state => {
	  state.visitedRoutes = []
	  state.tagCache = []
	},
	ADD_TAG: (state, route) => {
	  if (!route.meta || !route.meta.isTag) return
	  route = {...route}
	  delete route.matched
	  route.fullPath = route.fullPath.toLowerCase()
	  if (state.visitedRoutes.map(it => it.fullPath).includes(route.fullPath)) return
	  state.tagCache.push({key: route.fullPath, data: null})
	  state.visitedRoutes.push(route)
	},
	DEL_TAG: (state, route) => {
	  state.tagCache = state.tagCache.filter(it => it.key !== route.fullPath.toLowerCase())
	  state.visitedRoutes = state.visitedRoutes.filter(it => it.fullPath !== route.fullPath.toLowerCase())
	},

	DEL_TAGS: (state, routes) => {
	  let keys = routes.map(it => it.fullPath.toLowerCase())

	  state.tagCache = state.tagCache.filter(it => !keys.includes(it.key))
	  state.visitedRoutes = state.visitedRoutes.filter(it => !keys.includes(it.fullPath))
	},

	UPDATE_TAG_CACHE: (state, {key, data}) => {
	  let cache = state.tagCache.find(it => it.key === key.toLowerCase())
	  if (cache) {
		cache.data = copy(data)
	  }
	},
  },
  actions: {},
  getters: {
	sideRoutes: (state, getters, root) => filterSideRoutes(JSON.parse(JSON.stringify(state.rawRoutes)), root.User.roleInfo),
  },
}
