const express = require('express');
const mock = require('../mock');
const multipartMiddleware = require('connect-multiparty')();
const cookieParser = require('cookie-parser')
const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
	destination(req, file, cb) {
	  cb(null, './static/imgs');
	},
	filename(req, file, cb) {
	  cb(null, `${Date.now()}_${file.originalname}`)
	},
  }),
});

const router = express.Router()

function before(app) {
  app.use(cookieParser())
  app.get('*', mock.get)
  app.post('/api/upload', upload.single('file'), function (req, res, next) {
	// 设置返回结果
	if (!req.file) {
	  res.json({
		success: false,
		message: '上传失败!',
	  });
	}
	else {
	  res.json({
		success: true,
		data: req.file,
		message: '上传成功!',
	  });
	}
  });
  app.post('*', multipartMiddleware, mock.post)
}

module.exports = {

}
