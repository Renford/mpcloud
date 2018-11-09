import api from '@/api/api'
import config from '@/api/config'

const state = {
  plan: {}, // 下一个未完成规划
  sharePlan: {}, // 分享的plan
  plans: [] // 所有规划
}

const mutations = {
  setPlan: (state, plan) => {
    state.plan = plan
  },

  setSharePlan: (state, plan) => {
    state.sharePlan = plan
  },

  setPlans: (state, plans) => {
    state.plans = plans
  }
}

const actions = {
  getCurrentPlan({ commit, state }) {
    if (Object.keys(state.plan).length === 0) {
      wx.showLoading({
        title: '数据加载中...'
      })
    }

    return api.plan
      .getPlans([0, 1], 1)
      .then(res => {
        wx.hideLoading()
        if (res.length > 0) {
          commit('setPlan', res[0])
        } else {
          commit('setPlan', {})
        }
      })
      .catch(err => {
        wx.hideLoading()
        console.log('===errr:', err)
      })
  },

  getSharePlan({ commit, state }, planId) {
    if (Object.keys(state.plan).length === 0) {
      wx.showLoading({
        title: '数据加载中...'
      })
    }

    return api.plan
      .getPlanFromId(planId)
      .then(res => {
        wx.hideLoading()
        if (res.length > 0) {
          commit('setSharePlan', res[0])
        } else {
          commit('setSharePlan', {})
        }
      })
      .catch(err => {
        wx.hideLoading()
        console.log('===errr:', err)
      })
  },

  getPlans({ commit, state }) {
    if (state.plans.length === 0) {
      wx.showLoading({
        title: '数据加载中...'
      })
    }
    return api.plan
      .getPlans([0, 1, 2], config.pageSize)
      .then(res => {
        wx.hideLoading()
        commit('setPlans', res)
      })
      .catch(err => {
        wx.hideLoading()
        console.log('===errr:', err)
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
