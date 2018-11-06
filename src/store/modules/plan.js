import api from '@/api/api'
import config from '@/api/config'

const state = {
  plan: {}, // 下一个未完成规划
  plans: [] // 所有规划
}

const mutations = {
  setPlan: (state, plan) => {
    state.plan = plan
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

    return api.travel
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

  getPlans({ commit, state }) {
    if (state.plans.length === 0) {
      wx.showLoading({
        title: '数据加载中...'
      })
    }
    return api.travel
      .getPlans([0, 1, 2], config.pageSize)
      .then(res => {
        wx.hideLoading()
        if (res.length > 0) {
          commit('setPlans', res)
        }
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
