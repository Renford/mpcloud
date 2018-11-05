import api from '@/api/api'
import appUtils from '@/common/utils/AppUtils'

const state = {
  cates: [], // 大类，不包含equips
  categories: [] // 详情类，包含equips
}

const mutations = {
  setCates: (state, cates) => {
    state.cates = cates
  },
  setCategories: (state, cates) => {
    state.categories = cates
  }
}

const actions = {
  getCates({ commit, state }) {
    const ids = []
    return api.travel
      .getCategories(ids)
      .then(res => {
        commit('setCates', res)
        appUtils.saveCates(res)
      })
      .catch(err => {
        console.log('===errr:', err)
      })
  },

  getCategories({ commit, state }, id) {
    const ids = [id, 'yiwu', 'dianzi', 'xishu']
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
