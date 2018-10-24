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
    return api.travel
      .getCategories()
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
