import router, {routes} from './index'
import {isLogin} from '@/utils/auth'
import store from '../store'

function getName(list) {
  return list.reduce((p, it) => {
    let children = []
    if (it.children) {
      children = getName(it.children)
    }
    return [...p, it.name, ...children]
  }, [])
}

const names = getName(routes)


router.beforeEach(async (to, from, next) => {
  if (to.meta.free) {
    next();
    return
  }

  if (!isLogin()) {
    console.log('did not login ', to.path);
    next('/Login');
    return
  }

  if (!store.state.User.roleInfo) {
    console.log('no info');
    let userResult = await store.dispatch('User/getUserInfo');
    if (!userResult.success) {
      next('/Login');
      return
    }
    let res = await store.dispatch('User/getRoleInfo', userResult.data.role);
    if (!res.success) {
      next('/Login');
      return
    }
  }

  let {authList} = store.state.User.roleInfo;
  if (!authList.includes(to.name) && names.includes(to.name)) {
    next('/Error/NoAuth');
    return
  }

  next()
});
