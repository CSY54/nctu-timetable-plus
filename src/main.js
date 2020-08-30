import Vue from 'vue'
import VueGtag from 'vue-gtag'

import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(VueGtag, {
  config: {
    id: 'UA-134221599-2'
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
