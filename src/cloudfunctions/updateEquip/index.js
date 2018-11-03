// 云函数入口文件
const cloud = require('wx-server-sdk')
const result = require('./result')

cloud.init()

const db = cloud.database()
const _ = db.command

// type: 0, 我的装备，1、通用装备
// equip: Equip
exports.main = async (event, context) => {
  const type = event.type
  const equip = event.equip
  const equipId = equip._id
  delete equip._id

  const collectionName = type === 0 ? 'myequips' : 'equips'

  try {
    const res = await db
      .collection(collectionName)
      .doc(equipId)
      .set({
        data: equip
      })
    return result.successResult(res)
  } catch (error) {
    return result.errorResult(error)
  }
}
