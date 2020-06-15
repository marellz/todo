import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './components'

import PerfectScrollbar from 'vue2-perfect-scrollbar'

Vue.use(PerfectScrollbar)

import './sass/app.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
