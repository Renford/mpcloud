import api from '@/api/api'
import config from '@/api/config'

const state = {
  plan: {}, // 下一个未完成计划
  plans: [] // 所有计划
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
    return api.travel
      .getPlans([0, 1], 1)
      .then(res => {
        if (res.length > 0) {
          commit('setPlan', res[0])
        }
      })
      .catch(err => {
        console.log('===errr:', err)
      })
  },

  getPlans({ commit, state }) {
    return api.travel
      .getPlans([0, 1, 2], config.pageSize)
      .then(res => {
        if (res.length > 0) {
          commit('setPlans', res)
        }
      })
      .catch(err => {
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
