import api from '@/api/api'

const state = {
  equips: [],
  clothes: []
}

const mutations = {
  setEquips: (state, cates) => {
    state.equips = cates
  }
}

const actions = {
  getEquips({ commit, state }, type) {
    return api.travel
      .getEquips(type)
      .then(res => {
        console.log('getEquips ===', res)
        commit('setEquips', res)
      })
      .catch(err => {
        console.log('===errr:', err)
      })
  },

  getClothes({ commit, state }) {
    return api.travel
      .getEquips('clothes')
      .then(res => {
        console.log('getEquips ===', res)
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
