const cloud = require('wx-server-sdk')
const result = require('./result')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  let ids = _
  if (event.ids.length === 0) {
    ids = _.nin([])
  } else {
    ids = _.in(event.ids)
  }

  try {
    const res = await db
      .collection('categories')
      .where({
        cateId: ids
      })
      .orderBy('cateType', 'asc')
      .limit(1000)
      .get()

    return result.successResult(res)
  } catch (error) {
    return result.errorResult(error)
  }
}
