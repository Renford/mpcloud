// 云函数入口文件
const cloud = require('wx-server-sdk')
const result = require('./result')

cloud.init()

const db = cloud.database()
const _ = db.command

// 请求活动数组，
exports.main = async (event, context) => {
  const count = event.count
  const ids = event.ids

  try {
    const res = await db
      .collection('myplans')
      .where({
        _id: _.in(ids)
      })
      .orderBy('status', 'asc')
      .orderBy('date', 'asc')
      .limit(count)
      .get()

    if (res.errMsg === 'collection.get:ok' && res.data.length > 0) {
      for (let i = 0; i < res.data.length; i++) {
        const plan = res.data[i]
        plan.todos = await handleEquips(plan.todos)
        plan.dones = await handleEquips(plan.dones)
      }
    }

    return result.successResult(res)
  } catch (error) {
    return result.errorResult(error)
  }
}

// [name] => [{cateId, cateName}]
const handleEquips = async names => {
  const result = await db
    .collection('equips')
    .where({
      name: _.in(names)
    })
    .limit(1000)
    .get()

  return result.data
}
