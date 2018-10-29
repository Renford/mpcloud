import api from '@/api/api'

const state = {
  plan: {}
}

const mutations = {
  setPlan: (state, plan) => {
    state.plan = plan
  }
}

const actions = {
  getPlans({ commit, state }) {
    return api.travel
      .getPlans(0, 1)
      .then(res => {
        console.log('home get plans ===', res)
        if (res.length > 0) {
          commit('setPlan', res[0])
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
