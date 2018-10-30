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
    // const cateIds = ['yiwu', 'dianzi', 'xishu']
    // const _ = wx.cloud.database().command
    // const ids = _.nin(cateIds)
    return api.travel
      .getCategories()
      .then(res => {
        commit('setCates', res)
        appUtils.saveCates(res)
      })
      .catch(err => {
        console.log('===errr:', err)
      })
  },

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
