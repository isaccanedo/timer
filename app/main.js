import Vue from 'vue'
import VueRouter from 'vue-router'

import './assets/css/font-awesome'
import './assets/css/normalize'
import './assets/less/global'

import App from './app'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  // http://router.vuejs.org/en/api/options.html
  // mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  routes: routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
