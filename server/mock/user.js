const path = require('path');
const tools = require('./tools');

const editPath = path.join(__dirname, 'data/editorList.json')
const userPath = path.join(__dirname, 'data/userList.json')

function write(data) {
  return tools.write(editPath, data)
}

module.exports = {
  getEditorList: req => new Promise(async resolve => {
	let result = await tools.read(editPath)
	resolve({
	  success: !!result,
	  data: result,
	  message: result ? '读取成功!' : '读取失败!',
	})
  }),
  getRole: req => new Promise(async resolve => {
	const roleKey = req.query.role
	const list = await tools.read(editPath)
	const role = list.find(it => it.key === roleKey)
	resolve({
	  success: !!role,
	  data: role,
	  message: role ? '读取成功!' : '读取失败!',
	})
  }),
  deleteEditor: (req) => {
	return new Promise(async resolve => {
	  let {key} = req.query
	  if (!key) return resolve({success: false, message: '缺少必要参数!'})
	  let users = await tools.read(userPath)
	  if (users.map(it => it.role).includes(key)) {
		resolve({
		  success: false,
		  message: `[${key}]在使用中,不能删除!`,
		  data: null,
		})
		return
	  }
	  let list = await tools.read(editPath)
	  if (list) {
		// 已使用的role,不允许删除
		const newData = list.filter(it => it.key !== key)
		resolve(await write(newData))
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
  addEditor: (req) => new Promise(async resolve => {
	if (!req.body.data) return resolve({success: false, message: '缺少必要参数'})
	let data = JSON.parse(req.body.data)
	let list = await tools.read(editPath)
	let index = list.findIndex(it => it.key === data.key)
	if (index === -1) {
	  list.push(data)
	  resolve(await write(list))
	}
	else {
	  resolve({
		success: false,
		data: null,
		message: '角色已存在,请编辑!',
	  })
	}
  }),
  rewriteEditor: req => new Promise(async resolve => {
	if (!req.body.data) return resolve(false)
	let data = JSON.parse(req.body.data)
	let list = await tools.read(editPath)
	let index = list.findIndex(it => it.key === data.key)
	if (index === -1) {
	  resolve({
		success: false,
		message: '角色不存在!',
		data: null,
	  })
	}
	else {
	  list.splice(index, 1, data)
	  resolve(await write(list))
	}
  }),
}
