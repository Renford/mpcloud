// 云函数入口文件
const cloud = require('wx-server-sdk')
const result = require('./result')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const equips = event.plan.todos
  const plan = event.plan
  plan['_openid'] = event.userInfo.openId

  try {
    const res = await cloud.callFunction({
      name: 'addEquips',
      data: {
        type: 1,
        equips: equips,
        openId: event.userInfo.openId
      }
    })

    console.log('====add my equips result：', res)

    if (res.result.code === 0) {
      plan.todos = equips.map(equip => {
        return equip.name
      })

      const res = await db.collection('myplans').add({
        data: plan
      })

      console.log('====add plan result：', result)

      return result.successResult(res)
    } else {
      return result.formateResult(1, res.result.msg)
    }
  } catch (error) {
    return result.errorResult(error)
  }
}
