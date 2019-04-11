const fs = require('fs');
const path = require('path');

module.exports = {
  read(path) {
	return new Promise(resolve => {
	  fs.readFile(path, 'utf8', (err, res) => {
		if (err) {
		  resolve(false)
		}
		else {
		  resolve(JSON.parse(res))
		}
	  })
	})
  },
  write(path, data) {
	return new Promise(resolve => {
	  fs.writeFile(path, JSON.stringify(data), (err, res) => {
		if (err) {
		  resolve({
			success: false,
			data: err,
			message: '写入失败!',
		  })
		}
		else {
		  resolve({
			success: true,
			data: null,
			message: '写入成功!',
		  })
		}
	  })
	})
  },
}
