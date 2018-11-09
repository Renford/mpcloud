// 云函数入口文件
const cloud = require('wx-server-sdk')
const result = require('./result')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const equipId = event.equipId

  try {
    const res = await db
      .collection('myequips')
      .doc(equipId)
      .remove()

    return result.successResult(res)
  } catch (error) {
    return result.errorResult(error)
  }
}
