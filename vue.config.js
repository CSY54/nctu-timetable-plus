process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  lintOnSave: false,
  transpileDependencies: ['vuetify'],
  devServer: {
    disableHostCheck: true
  },
  pwa: {
    name: 'NCTU Timetable+',
    themeColor: '#1976d2',
    msTileColor: '#1976d2',
    assetsVersion: process.env.VUE_APP_VERSION
  }
}
