const userMap = {
  admin: {
	roles: ['admin'],
	token: 'admin',
	introduction: '我是超级管理员',
	avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
	name: 'Super Admin',
  },
  editor: {
	roles: ['editor'],
	token: 'editor',
	introduction: '我是编辑',
	avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
	name: 'Normal Editor',
  },
}

module.exports = {
  loginByUsername: config => {
	const username ='admin'// config.body.get('username')
	return userMap[username]
  },
  getUserInfo: req => {
	console.log(req.params)
	let username = 'admin'
	return userMap[username]
  },
  logout: () => true,
}
