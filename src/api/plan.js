import cloud from './cloud'
import config from './config'

// 活动相关操作
class Plan {
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

  deletePlan(planId) {
    const params = {
      planId: planId
    }

    return cloud.callFunction('deletePlan', params).then(res => {
      console.log()
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

export default new Plan()
