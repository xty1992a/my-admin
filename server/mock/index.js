/*
* 拦截dev-server的所有post/get请求,符合规则的,使用相应callback处理,其余放过
* */

const login = require('./login');
const user = require('./user');

// get请求
const GETList = [
  {
	test: /\/api\/User\/UserInfo/,
	callback: login.getUserInfo,
  },
  {
	test: /\/api\/User\/UserList/,
	callback: login.getUserList,
  },
  {
	test: /\/api\/User\/GetRole/,
	callback: user.getRole,
  },
  {
	test: /\/api\/User\/getEditorList/,
	callback: user.getEditorList,
  },

]
// post 请求
const POSTList = [
  {
	test: /\/api\/Login\/UserLogin/,
	callback: login.loginByUsername,
  },
  {
	test: /\/api\/User\/DeleteEditor/,
	callback: user.deleteEditor,
  },
  {
	test: /\/api\/User\/DeleteUser/,
	callback: login.deleteUser,
  },
  {
	test: /\/api\/User\/AddEditor/,
	callback: user.addEditor,
  },
  {
	test: /\/api\/User\/RewriteEditor/,
	callback: user.rewriteEditor,
  },
  {
	test: /\/api\/User\/RewriteUser/,
	callback: login.rewriteUser,
  },
  {
	test: /\/api\/User\/AddUser/,
	callback: login.addUser,
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
	return Promise.resolve(false)
  }
}

// 拦截器
module.exports = {
  get(req, res, next) {
	const mock = match(req)
	const list = GETList.map(it => mock(it.test, it.callback))
	Promise.all(list)
		.then(results => {
		  const data = results.find(Boolean)
		  if (data) {
			res.json(data)
		  }
		  else {
			res.json(null)
		  }
		})
  },
  post(req, res, next) {
	const mock = match(req)
	const list = POSTList.map(it => mock(it.test, it.callback))
	Promise.all(list)
		.then(results => {
		  const data = results.find(Boolean)
		  if (data) {
			res.json(data)
		  }
		  else {
			res.json(null)
		  }
		})
  },
}

// endregion
