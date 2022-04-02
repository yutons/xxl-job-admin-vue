module.exports = {
  //路径前缀
  publicPath: "/",
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: (config) => {
    const entry = config.entry('app');
    entry.add('babel-polyfill').end();
    entry.add('classlist-polyfill').end();
    entry.add('@/mock').end();
  },
  css: {
    extract: { ignoreOrder: true }
  },
  //开发模式反向代理配置，生产模式请使用Nginx部署并配置反向代理
  devServer: {
    port: 8311,
    proxy: {
      '/api': {
        //开发环境
        target: 'http://localhost:8080',
        ws: true,
        pathRewrite: {
          '^/api': '/'
        },

        // 测试环境
        //target: 'http://192.168.116.242:8311',

        // 生产环境
        // target: 'http://192.168.0.60:8311',
      }
    }
  }
};
