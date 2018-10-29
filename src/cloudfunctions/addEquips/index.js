// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const equips = event.equips
  let openId = event.userInfo.openId
  if (openId === undefined) {
    openId = event.openId
  }

  try {
    const exists = []
    const success = []

    for (let i = 0; i < equips.length; i++) {
      const equip = equips[i]
      equip['_openid'] = openId

      let result = await db
        .collection('myequips')
        .where({
          _openid: equip._openid,
          name: equip.name
        })
        .get()

      if (result.data.length > 0) {
        exists.push(equip.name)
      } else {
        const res = await db.collection('myequips').add({
          data: equip
        })
        if (res._id !== undefined) {
          success.push(equip.name)
        }
      }
    }

    return {
      exists: exists,
      success: success
    }
  } catch (error) {
    console.error('===add equips error: ', error)
  }
}
