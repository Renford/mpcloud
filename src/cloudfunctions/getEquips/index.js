// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const count = event.count
  const openId = event.userInfo.openId

  try {
    const result = await db
      .collection('myequips')
      .where({
        _openid: openId
      })
      .limit(count)
      .get()
    return arr2section(result.data)
  } catch (error) {
    console.error('===add plan error:', error)
  }
}

const cateIds = [
  'luying',
  'dengshan',
  'tubu',
  'sheying',
  'qixing',
  'shatan',
  'huaxue',
  'youyong',
  'dianzi',
  'xishu',
  'yiwu'
]

// [equip] => [{cateId:'', equips: [equip]}]
const arr2section = equips => {
  const obj = {}
  const cateObj = {}
  equips.forEach(equip => {
    const arr = obj[equip.cateId]
    if (arr === undefined) {
      obj[equip.cateId] = [equip]
      cateObj[equip.cateId] = equip.cateName
    } else {
      obj[equip.cateId] = [...arr, equip]
    }
  })

  const result = []
  cateIds.forEach(id => {
    const equips = obj[id]
    if (equips !== undefined) {
      result.push({
        cateId: id,
        cateName: cateObj[id],
        equips: equips
      })
    }
  })
  return result
}
