const express = require('express');
const createError = require('http-errors');
const compression = require('compression');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const api = require('./routes/api');

const multipartMiddleware = require('connect-multiparty')();
const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
	destination(req, file, cb) {
	  cb(null, path.join(__dirname, 'public/imgs'));
	},
	filename(req, file, cb) {
	  cb(null, `${Date.now()}_${file.originalname}`)
	},
  }),
});

const app = express();
app.use(compression())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, 'public')));
app.post('/api/upload', upload.single('file'), function (req, res, next) {
  console.log(req.file, 'api upload')
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

app.use(multipartMiddleware)
app.use('/api', api)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
