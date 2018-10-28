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
  getCategories({ commit, state }) {
    const cateIds = ['yiwu', 'dianzi', 'xishu']
    const _ = wx.cloud.database().command
    const ids = _.nin(cateIds)
    return api.travel
      .getCategories(ids)
      .then(res => {
        console.log('categories ===', res)
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
