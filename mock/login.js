const tools = require('./tools');
const path = require('path');

const userPath = path.join(__dirname, 'data/userList.json')

module.exports = {
  // 登录
  loginByUsername: async req => {
	let username = JSON.parse(req.body.username)
	let users = await tools.read(userPath)
	let data = users.find(it => it.name === username)// userMap[username]
	return Promise.resolve({
	  success: !!data,
	  data,
	  message: data ? '获取成功!' : '获取失败!',
	})
  },
  // 获取用户信息
  getUserInfo: async req => {
	let username = req.cookies.user
	let users = await tools.read(userPath)
	let data = users.find(it => it.name === username)
	return Promise.resolve({
	  success: !!data,
	  data,
	  message: data ? '获取成功!' : '获取失败!',
	})
  },

  addUser: async req => new Promise(async resolve => {
	if (!req.body.data) return resolve({success: false, message: '缺少必要参数'})
	let data = JSON.parse(req.body.data)
	// 第一次添加,使用data的name初始化token
	data.token = data.name
	let list = await tools.read(userPath)
	let index = list.findIndex(it => it.token === data.token)
	if (index === -1) {
	  list.push(data)
	  resolve(await tools.write(userPath, list))
	}
	else {
	  resolve({
		success: false,
		data: null,
		message: '用户已存在,请编辑!',
	  })
	}
  }),

  deleteUser: (req) => {
	return new Promise(async resolve => {
	  let {token} = req.query
	  if (!token) return resolve({success: false, message: '缺少必要参数!'})
	  let users = await tools.read(userPath)
	  if (users) {
		const newData = users.filter(it => it.token !== token)
		resolve(await tools.write(userPath, newData))
	  }
	  else {
		resolve({
		  success: false,
		  data: null,
		  message: '读取失败!',
		})
	  }
	})
  },

  rewriteUser: req => new Promise(async resolve => {
	if (!req.body.data) return resolve(false)
	let data = JSON.parse(req.body.data)
	let list = await tools.read(userPath)
	let index = list.findIndex(it => it.token === data.token)
	if (index === -1) {
	  resolve({
		success: false,
		message: '用户不存在!',
		data: null,
	  })
	}
	else {
	  list.splice(index, 1, data)
	  resolve(await tools.write(userPath, list))
	}
  }),

  getUserList: req => new Promise(async resolve => {
	let result = await tools.read(userPath)
	resolve({
	  success: !!result,
	  data: result,
	  message: result ? '读取成功!' : '读取失败!',
	})
  }),

  logout: () => Promise.resolve({
	success: true,
	data: null,
	message: '登出成功!',
  }),
}
