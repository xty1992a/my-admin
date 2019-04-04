/**
 * Created by TY-xie on 2017/10/13.
 */
const ss = window.sessionStorage
export default {
  getItem(key) {
	try {
	  return JSON.parse(ss.getItem(key))
	} catch (err) {
	  return null
	}
  },
  setItem(key, val) {
	ss.setItem(key, JSON.stringify(val))
  },
  clear() {
	ss.clear()
  },
  keys() {
	return ss.keys()
  },
  removeItem(key) {
	ss.removeItem(key)
  },
}
