import router, {routes} from './index'
import {isLogin} from '../utils/auth'
import store from '../store'

// region 收集路由
// 递归收集所有路由的name
function getName(list) {
  return list.reduce((p, it) => {
	let children = []
	if (it.children) {
	  children = getName(it.children)
	}
	return [...p, it.name, ...children]
  }, [])
}

// 所有路由
const names = getName(routes)

// endregion

// region 利用全局守卫鉴权
router.beforeEach(async (to, from, next) => {
  const log = (...args) => console.log(`%c path to ${to.path}`, 'background:#222;padding:0 10px 0 100px;color:#bada55', ...args)
  const login = isLogin()

  // 404,登录等页面直接放过
  if (to.meta.free) {
	log('free')
	// 已登录前往登录的,重定向首页
	if (to.path.toLowerCase() === '/login' && login) {
	  log('go to login')
	  next({name: 'Root'});
	  return
	}

	next();
	return
  }

  // 未登录重定向登录页
  if (!login) {
	log(`you should login before visit this page!`);
	next('/Login');
	return
  }

  // region 拉取鉴权条件(authList)
  if (!store.state.User.roleInfo) {
	log('no info');
	// 先拉取用户信息,获取角色
	let userResult = await store.dispatch('User/getUserInfo');
	if (!userResult.success) {
	  next({name: 'NotFound'});
	  return
	}
	// 再拉取角色信息,获取允许通过的路由表
	let res = await store.dispatch('User/getRoleInfo', userResult.data.role);
	if (!res.success) {
	  next({name: 'NotFound'});
	  return
	}
  }
  // endregion

  let {authList} = store.state.User.roleInfo;

  // 访问不允许的路由
  if (!authList.includes(to.name) && names.includes(to.name)) {
	next('/Error/NoAuth');
	return
  }

  // 正常访问(包括乱码,导去404)
  next()
});
// endregion
