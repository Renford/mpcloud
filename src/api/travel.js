import cloud from './cloud'
import appUtils from '@/common/utils/AppUtils'

class Travel {
  getCategories(ids) {
    return cloud.get('categories', { cateId: ids })
  }

  addCategory(params) {
    return cloud.add('categories', params)
  }

  addEquips(equips) {
    // const that = this
    return wx.cloud
      .callFunction({
        name: 'addEquips',
        data: {
          equips: equips
        }
      })
      .then(res => {
        console.log('===get addEquips success: ', res)
        // if (res.errMsg === 'cloud.callFunction:ok') {
        //   that.saveOpenId(res.result.openid)
        // }
      })
      .catch(err => {
        console.log('===get addEquips error: ', err)
      })
  }

  // addPlan(plan) {
  //   const data = Object.assign(
  //     {
  //       status: 0, // 0、未开始，1、进行中，2、已完成
  //       statusName: '未开始',
  //       dones: []
  //     },
  //     plan
  //   )
  //   return cloud.add('myplans', data)
  // }

  addPlan(plan) {
    const data = Object.assign(
      {
        status: 0, // 0、未开始，1、进行中，2、已完成
        statusName: '未开始',
        dones: []
      },
      plan
    )
    return wx.cloud
      .callFunction({
        name: 'addPlan',
        data: {
          plan: data
        }
      })
      .then(res => {
        console.log('===get addPlan success: ', res)
      })
      .catch(err => {
        console.log('===get addPlan error: ', err)
      })
  }

  getPlans(count) {
    return cloud.get('myplans', {
      count: count,
      _openid: appUtils.openId
    })
  }

  updatePlan(planId, plan) {
    delete plan._id
    delete plan._openid
    return cloud.set('myplans', planId, plan)
  }
}

export default new Travel()
