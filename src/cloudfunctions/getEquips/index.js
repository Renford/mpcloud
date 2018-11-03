// 云函数入口文件
const cloud = require('wx-server-sdk')
const result = require('./result')

cloud.init()

const db = cloud.database()
const _ = db.command

// type: 0、共有装备，1、我的装备
exports.main = async (event, context) => {
  const type = event.type
  const count = event.count
  const openId = event.userInfo.openId

  const ids = event.ids.length > 0 ? _.in(event.ids) : _.nin(event.ids)

  try {
    if (type === 0) {
      const res = await db
        .collection('equips')
        .where({
          cateId: ids
        })
        .limit(count)
        .get()
      return result.successResult(res)
    } else {
      const res = await db
        .collection('myequips')
        .where({
          _openid: openId
        })
        .limit(count)
        .get()
      return result.successResult(res)
    }
  } catch (error) {
    return result.errorResult(error)
  }
}
