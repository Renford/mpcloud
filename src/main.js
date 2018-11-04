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

const pageDatas = {}

// 添加全局方法或属性
Vue.prototype.$isPage = function isPage() {
  return this.$mp && this.$mp.mpType === 'page'
}

Vue.prototype.$pageId = function pageId() {
  if (this.$isPage() && this.$mp.page !== undefined && this.$mp.page !== null) {
    return this.$mp.page.__wxWebviewId__
  } else {
    return null
  }
}

// 注入组件
Vue.mixin({
  methods: {
    stashPageData() {
      // 备份route
      return { data: { ...this.$data }, route: this.$route }
    },
    restorePageData(oldData) {
      // 恢复route
      this._route = oldData.route
      this.$router.currentRoute = oldData.route
      Object.assign(this.$data, oldData.data)
    }
  },

  onLoad() {
    if (this.$isPage()) {
      // 新进入页面
      Object.assign(this.$data, this.$options.data())
    }
  },

  // 这里有一个bug，当调用 relauch 的时候，pageId没有，pageData无法删除
  onUnload() {
    if (this.$isPage()) {
      // 退出页面，删除数据
      console.log('===onUnload delete date: ', this.$pageId(), pageDatas)
      delete pageDatas[this.$pageId()]
      this.$needReloadPageData = true
    }
  },

  onHide() {
    if (this.$isPage()) {
      // 将要隐藏时，备份数据
      pageDatas[this.$pageId()] = this.stashPageData()
    }
  },

  onShow() {
    if (this.$isPage()) {
      // 如果是后退回来的，拿出历史数据来设置data
      if (this.$needReloadPageData) {
        const oldData = pageDatas[this.$pageId()]

        if (oldData) {
          this.restorePageData(oldData)
        }
        this.$needReloadPageData = false
      }
    }
  }
})
