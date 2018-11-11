import api from '@/api/api'

const state = {
  temps: [],
  shareTemp: {}
}

const mutations = {
  setTemps: (state, temps) => {
    state.temps = temps
  },

  setShareTemp: (state, temp) => {
    state.shareTemp = temp
  }
}

const actions = {
  getTemps({ commit, state }) {
    return api.temp
      .getTemps([])
      .then(res => {
        commit('setTemps', res)
      })
      .catch(err => {
        console.log('===errr:', err)
      })
  },

  getShareTemp({ commit, state }, id) {
    return api.temp
      .getTemps([id])
      .then(res => {
        console.log('=====get share temp', res)
        commit('setShareTemp', res[0])
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
