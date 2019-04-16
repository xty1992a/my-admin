module.exports = {
  outputDir: '../../public/mobile',
  publicPath: process.env.NODE_ENV === 'production'
	  ? '/mobile/'
	  : '/',
}
