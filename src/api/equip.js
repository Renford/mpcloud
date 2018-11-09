import cloud from './cloud'
import config from './config'

// 装备相关操作
class Equip {
  addEquips(type, equips) {
    const params = {
      type: type,
      equips: equips
    }
    return cloud.callFunction('addEquips', params).then(res => {
      return res
    })
  }

  deleteMyEquip(equipId) {
    const params = {
      equipId: equipId
    }

    return cloud.callFunction('deleteMyEquip', params).then(res => {
      return res
    })
  }

  getEquips(type, ids) {
    const params = {
      type: type,
      count: config.pageSize,
      ids: ids
    }
    return cloud.callFunction('getEquips', params).then(res => {
      return res
    })
  }

  // type: 0, 我的装备，1、通用装备
  updateEquip(type, equip) {
    const params = {
      type: type,
      equip: equip
    }
    return cloud.callFunction('updateEquip', params).then(res => {
      return res
    })
  }
}

export default new Equip()
