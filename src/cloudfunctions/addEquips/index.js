// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const equips = event.equips

  try {
    equips.forEach(equip => {
      equip['_openid'] = event.userInfo.openId
      db.collection('myequips').add({
        data: equip
      })
    })
  } catch (error) {
    console.error('===add equips error: ', error)
  }
  return {
    code: '0'
  }
}
