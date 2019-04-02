/*
* 拦截dev-server的所有post/get请求,符合规则的,使用相应callback处理,其余放过
* */

const login = require('./login');

// get请求
const GETList = [
  {
	test: /\/api\/User\/UserInfo/,
	callback: login.getUserInfo,
  },

]
// post 请求
const POSTList = [
  {
	test: /\/api\/Login\/UserLogin/,
	callback: login.loginByUsername,
  },
]

// region main
// 匹配函数
const match = (req) => (test, callback) => {
  let {originalUrl: url} = req
  if (test.test(url)) {
	return callback(req)
  }
  else {
	return false
  }
}

// 拦截器
module.exports = {
  get(req, res, next) {
	const mock = match(req)
	const list = GETList.map(it => mock(it.test, it.callback))
	const data = list.find(Boolean)

	if (data) {
	  res.json({
		success: true,
		data,
	  })
	}
	else {
	  next()
	}
  },
  post(req, res, next) {
	const mock = match(req)
	const list = POSTList.map(it => mock(it.test, it.callback))
	const data = list.find(Boolean)

	if (data) {
	  res.json({
		success: true,
		data,
	  })
	}
	else {
	  next()
	}
  },
}

// endregion
