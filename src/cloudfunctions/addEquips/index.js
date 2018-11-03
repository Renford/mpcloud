// 云函数入口文件
const cloud = require('wx-server-sdk')
const result = require('./result')

cloud.init()
const db = cloud.database()

// type: 0、通用装备, 1、我的装备，
// equip: Equip
exports.main = async (event, context) => {
  const type = event.type
  const equips = event.equips
  let openId = event.userInfo.openId
  if (openId === undefined) {
    openId = event.openId
  }

  let collectionName = getCollectionName(type)

  try {
    const exists = []
    const success = []

    for (let i = 0; i < equips.length; i++) {
      const equip = equips[i]
      equip['_openid'] = openId

      let result = await db
        .collection(collectionName)
        .where({
          ...getOptions(type, equip)
        })
        .get()

      if (result.data.length > 0) {
        exists.push(equip.name)
      } else {
        const res = await db.collection(collectionName).add({
          data: equip
        })
        if (res.errMsg === 'collection.add:ok') {
          success.push(equip.name)
        }
      }
    }

    const data = {
      exists: exists,
      success: success
    }
    return result.formateResult(0, '', data)
  } catch (error) {
    return result.errorResult(error)
  }
}

// 表名
const getCollectionName = type => {
  return type === 0 ? 'equips' : 'myequips'
}

// 查询条件
const getOptions = (type, equip) => {
  if (type === 0) {
    return {
      name: equip.name
    }
  } else {
    return {
      _openid: equip._openid,
      name: equip.name
    }
  }
}
