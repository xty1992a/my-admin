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
	rawRoutes: routes,
	visitedRoutes: [],
  },
  mutations: {
	ADD_TAG: (state, route) => {
	  if (!route.meta || !route.meta.isTag) return
	  if (state.visitedRoutes.map(it => it.fullPath.toLowerCase()).includes(route.fullPath.toLowerCase())) return
	  state.visitedRoutes.push(route)
	},
	DEL_TAG: (state, route) => state.visitedRoutes = state.visitedRoutes.filter(it => it.fullPath.toLowerCase() !== route.fullPath.toLowerCase()),
  },
  actions: {},
  getters: {
	sideRoutes: state => filterSideRoutes(state.rawRoutes),
  },
}
