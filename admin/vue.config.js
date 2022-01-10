// vue.config.json
module.exports = {
  devServer: {
    port: 8088,
  },
  outputDir: __dirname + '/../server/admin',
  publicPath: process.env.NODE_ENV === 'production' ?
    '/admin/' : '/'
}
