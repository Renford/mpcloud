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
  getCategories({ commit, state }, id) {
    const cateIds = [id, 'yiwu', 'dianzi', 'xishu']
    const _ = wx.cloud.database().command
    const ids = _.in(cateIds)
    return api.travel
      .getCategories(ids)
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
