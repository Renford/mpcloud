// 云函数入口文件
const cloud = require('wx-server-sdk')
const result = require('./result')

cloud.init()

const db = cloud.database()
const _ = db.command

// 请求我的规划
exports.main = async (event, context) => {
  const openId = event.userInfo.openId
  const count = event.count
  const status = event.status

  try {
    const res = await db
      .collection('myplans')
      .where({
        _openid: openId,
        status: _.in(status)
      })
      .orderBy('status', 'asc')
      .orderBy('date', 'asc')
      .limit(count)
      .get()

    if (res.errMsg === 'collection.get:ok' && res.data.length > 0) {
      for (let i = 0; i < res.data.length; i++) {
        const plan = res.data[i]
        plan.todos = await handleEquips(plan.todos, openId)
        plan.dones = await handleEquips(plan.dones, openId)
      }
    }

    return result.successResult(res)
  } catch (error) {
    return result.errorResult(error)
  }
}

// [name] => [{cateId, cateName}]
const handleEquips = async (names, openId) => {
  const result = await db
    .collection('myequips')
    .where({
      _openid: openId,
      name: _.in(names)
    })
    .get()

  return result.data
}
