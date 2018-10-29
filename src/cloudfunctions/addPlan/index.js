// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const equips = event.plan.todos
  const plan = event.plan
  plan['_openid'] = event.userInfo.openId

  try {
    cloud.callFunction({
      name: 'addEquips',
      data: {
        equips: equips,
        openId: event.userInfo.openId
      }
    })

    plan.todos = equips.map(equip => {
      return equip.name
    })

    return await db.collection('myplans').add({
      data: plan
    })
  } catch (error) {
    console.error('===add plan error:', error)
  }
}
