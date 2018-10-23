import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from '@/store'

import MpvueRouterPatch from 'mpvue-router-patch'
Vue.use(MpvueRouterPatch)
Vue.use(Vuex)

// const mpvueTrace = require('mpvue-lint/mpvue-trace')
// mpvueTrace.trace(Vue)

Vue.config.productionTip = false
App.store = store
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
