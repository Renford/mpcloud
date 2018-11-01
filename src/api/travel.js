import cloud from './cloud'
import config from './config'
import appUtils from '@/common/utils/AppUtils'

class Travel {
  getCategories(ids, fields) {
    let params = {
      ids: ids,
      fields: fields
    }
    return cloud.callFunction('getCates', params).then(res => {
      return res
    })
  }

  addCategory(cate) {
    return cloud.add('categories', cate)
  }

  addEquips(equips) {
    const params = {
      equips: equips
    }
    return cloud.callFunction('addEquips', params).then(res => {
      console.log('=====add equips', res)
      return res
    })
  }

  getEquips() {
    const params = {
      count: config.pageSize
    }
    return cloud.callFunction('getEquips', params).then(res => {
      return res
    })
  }

  updateEquip(equip) {
    const params = {
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

  // status: 状态数组，0、未开始，1、进行中，2、已完成
  getPlans(status, count) {
    const params = {
      status: status,
      count: count
    }
    return cloud.callFunction('getPlan', params).then(res => {
      return res
    })
  }

  updatePlan(planId, plan) {
    delete plan._id
    delete plan._openid
    return cloud.set('myplans', planId, plan)
  }
}

export default new Travel()
