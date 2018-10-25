import api from '@/api/api'

const state = {
  equips: []
}

const mutations = {
  setEquips: (state, cates) => {
    state.equips = cates
  }
}

const actions = {
  getEquips({ commit, state }) {
    return api.travel
      .getEquips()
      .then(res => {
        console.log('categories ===', res)
        commit('setEquips', res)
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
