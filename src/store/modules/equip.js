import api from '@/api/api'
import cateUtils from '@/common/utils/CateUtils'

const state = {
  equips: []
}

const mutations = {
  setEquips: (state, equips) => {
    state.equips = equips
  }
}

const actions = {
  getEquips({ commit, state }, cateId) {
    if (state.equips.length === 0) {
      wx.showLoading({
        title: '数据加载中...'
      })
    }
    const ids = [cateId, ...cateUtils.getBaseCateIds()]
    return api.equip
      .getEquips(0, ids)
      .then(res => {
        wx.hideLoading()
        commit('setEquips', res)
      })
      .catch(err => {
        wx.hideLoading()
        console.log('===errr:', err)
      })
  },

  addEquips({ commit, state }, equips) {
    wx.showLoading({
      title: '数据更新中...'
    })
    return api.equip
      .addEquips(0, equips)
      .then(res => {
        wx.hideLoading()
        console.log('add equips success=====', res)
      })
      .catch(err => {
        wx.hideLoading()
        console.log('add equips error=====', err)
      })
  },

  getMyEquips({ commit, state }) {
    if (state.equips.length === 0) {
      wx.showLoading({
        title: '数据加载中...'
      })
    }
    return api.equip
      .getEquips(1, [])
      .then(res => {
        wx.hideLoading()
        commit('setEquips', res)
      })
      .catch(err => {
        wx.hideLoading()
        console.log('===get my equips:', err)
      })
  },

  addMyEquips({ commit, state }, equips) {
    wx.showLoading({
      title: '数据更新中...'
    })
    return api.equip
      .addEquips(1, equips)
      .then(res => {
        wx.hideLoading()
        console.log('add my equips success=====', res)
      })
      .catch(err => {
        wx.hideLoading()
        console.log('add my equips error=====', err)
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
