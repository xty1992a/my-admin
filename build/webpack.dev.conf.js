'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

// region 接口
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

// endregion

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
	rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true}),
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
	clientLogLevel: 'warning',
	historyApiFallback: {
	  rewrites: [
		{from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html')},
	  ],
	},
	hot: true,
	contentBase: false, // since we use CopyWebpackPlugin.
	compress: true,
	host: HOST || config.dev.host,
	port: PORT || config.dev.port,
	open: config.dev.autoOpenBrowser,
	overlay: config.dev.errorOverlay
		? {warnings: false, errors: true}
		: false,
	publicPath: config.dev.assetsPublicPath,
	proxy: config.dev.proxyTable,
	quiet: true, // necessary for FriendlyErrorsPlugin
	watchOptions: {
	  poll: config.dev.poll,
	},
	// region 拦截请求
	before,
	// endregion
  },
  plugins: [
	new webpack.DefinePlugin({
	  'process.env': require('../config/dev.env'),
	}),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
	new webpack.NoEmitOnErrorsPlugin(),
	// https://github.com/ampedandwired/html-webpack-plugin
	new HtmlWebpackPlugin({
	  filename: 'index.html',
	  template: 'index.html',
	  inject: true,
	}),
	// copy custom static assets
	new CopyWebpackPlugin([
	  {
		from: path.resolve(__dirname, '../static'),
		to: config.dev.assetsSubDirectory,
		ignore: ['.*'],
	  },
	]),
  ],
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
	if (err) {
	  reject(err)
	}
	else {
	  // publish the new Port, necessary for e2e tests
	  process.env.PORT = port
	  // add port to devServer config
	  devWebpackConfig.devServer.port = port

	  // Add FriendlyErrorsPlugin
	  devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
		compilationSuccessInfo: {
		  messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
		},
		onErrors: config.dev.notifyOnErrors
			? utils.createNotifierCallback()
			: undefined,
	  }))

	  resolve(devWebpackConfig)
	}
  })
})
