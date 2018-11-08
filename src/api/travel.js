import cloud from './cloud'
import config from './config'

class Travel {
  getCategories(ids) {
    let params = {
      ids: ids
    }
    return cloud.callFunction('getCates', params).then(res => {
      return res
    })
  }

  addCategory(cate) {
    return cloud.add('categories', cate)
  }

  addEquips(type, equips) {
    const params = {
      type: type,
      equips: equips
    }
    return cloud.callFunction('addEquips', params).then(res => {
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

  addPlan(plan) {
    const data = Object.assign(
      {
        status: 0,
        statusName: '未开始'
      },
      plan
    )
    const params = {
      plan: data
    }

    return cloud.callFunction('addPlan', params).then(res => {
      return res
    })
  }

  // status: 状态，0、未开始，1、进行中，2、已完成
  getPlans(status, count) {
    const params = {
      status: status,
      count: count
    }
    return cloud.callFunction('getMyPlans', params).then(res => {
      return res
    })
  }

  getPlanFromId(planId) {
    const params = {
      ids: [planId],
      count: 1
    }
    return cloud.callFunction('getPlans', params).then(res => {
      return res
    })
  }

  updatePlan(plan) {
    const params = {
      plan: plan
    }
    return cloud.callFunction('updatePlan', params)
  }
}

export default new Travel()
