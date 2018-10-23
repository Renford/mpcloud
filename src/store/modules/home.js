const state = {
  tabs: []
}

const mutations = {
  setTabs: (state, tabs) => {
    state.tabs = tabs
  }
}

const actions = {
  getCategories({ commit, state }) {
    // return api.haogu
    //   .getCategories()
    //   .then(res => {
    //     let tabs = TabManager.handleData(res, state.currIndex)
    //     // getData(that)
    //     commit('setTabs', tabs)
    //   })
    //   .catch(err => {
    //     console.log('request haogu error====', err)
    //   })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
