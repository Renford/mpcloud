import api from '@/api/api'

const state = {
  categories: []
}

const mutations = {
  setCategories: (state, cates) => {
    state.categories = cates
  }
}

const actions = {
  getEquips({ commit, state }, type) {
    const _ = wx.cloud.database().command
    const equipType = _.eq(type)
      .or(_.eq('running'))
      .or(_.eq('swimming'))
    return api.travel
      .getEquips(equipType)
      .then(res => {
        commit('setCategories', res)
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
