// vue.config.js
module.exports = {
  devServer: {
    port: 8090,
  },
  outputDir: __dirname + '/../server/admin',
  publicPath: process.env.NODE_ENV === 'production' ?
    '/admin/' : '/'
}