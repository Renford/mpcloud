import api from '@/api/api'

const state = {
  equips: []
}

const mutations = {
  setEquips: (state, equips) => {
    state.equips = equips
  }
}

const actions = {
  getEquips({ commit, state }) {
    return api.travel
      .getEquips()
      .then(res => {
        console.log('====get equips', res)
        commit('setEquips', res)
      })
      .catch(err => {
        console.log('===errr:', err)
      })
  },

  addEquips({ commit, state }, equips) {
    return api.travel
      .addEquips(equips)
      .then(res => {
        console.log('add equips success=====', res)
      })
      .catch(err => {
        console.log('add equips error=====', err)
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
