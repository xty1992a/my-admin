module.exports = {
  outputDir: "../../public/mobile",
  publicPath: process.env.NODE_ENV === "production" ? "/mobile/" : "/",
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].minify = false;
      return args;
    });
  }
};
