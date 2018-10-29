import cloud from './cloud'
import config from './config'
import appUtils from '@/common/utils/AppUtils'

class Travel {
  getCategories(ids) {
    return cloud.get('categories', { cateId: ids })
  }

  addCategory(params) {
    return cloud.add('categories', params)
  }

  addEquips(equips) {
    const params = {
      equips: equips
    }
    return cloud.callFunction('addEquips', params).then(res => {
      console.log('=====add equips', res)
      return res
      // if (res.errMsg === 'collection.add:ok') {
      //   return res.data
      // } else {
      //   return Promise.reject(config.ErrorInfo.kAddDataErrorInfo)
      // }
    })
  }

  getEquips() {
    const params = {
      count: config.pageSize
    }
    return cloud.callFunction('getEquips', params).then(res => {
      return res
      // if (res.errMsg === 'collection.get:ok') {
      //   return res.data
      // } else {
      //   return Promise.reject(config.ErrorInfo.kGetDataErrorInfo)
      // }
    })
  }

  addPlan(plan) {
    const data = Object.assign(
      {
        status: 0, // 0、未开始，1、进行中，2、已完成
        statusName: '未开始',
        dones: []
      },
      plan
    )
    const params = {
      plan: data
    }

    return cloud.callFunction('addPlan', params).then(res => {
      if (res.errMsg === 'collection.add:ok') {
        return res.data
      } else {
        return Promise.reject(config.ErrorInfo.kAddDataErrorInfo)
      }
    })
  }

  getPlans(status, count) {
    const params = {
      status: status,
      count: count
    }
    return cloud.callFunction('getPlan', params).then(res => {
      if (res.errMsg === 'collection.get:ok') {
        return res.data
      } else {
        return Promise.reject(config.ErrorInfo.kGetDataErrorInfo)
      }
    })
  }

  updatePlan(planId, plan) {
    delete plan._id
    delete plan._openid
    return cloud.set('myplans', planId, plan)
  }
}

export default new Travel()
