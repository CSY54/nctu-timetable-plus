process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  lintOnSave: false,
  transpileDependencies: ['vuetify'],
  devServer: {
    disableHostCheck: true
  }
}
