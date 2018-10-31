// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const equip = event.equip
  const equipId = equip._id
  delete equip._id
  try {
    return await db
      .collection('myequips')
      .doc(equipId)
      .set({
        data: equip
      })
      .then(res => {
        return res.data
      })
  } catch (e) {
    console.error('===update equips: ', e)
  }
}
