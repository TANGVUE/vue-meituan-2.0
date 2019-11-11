import Vue from 'vue'
import App from './App.vue'
import './plugins/vant.js'
import router from './router/router'
import store from './store'
import axios from 'axios'

Vue.prototype.$axios = axios;

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

