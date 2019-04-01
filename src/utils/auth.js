import Cookies from 'js-cookie'

export function isLogin() {
  return Cookies.get('user') !== undefined
}
