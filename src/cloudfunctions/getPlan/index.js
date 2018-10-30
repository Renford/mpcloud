// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const status = event.status
  const count = event.count
  const openId = event.userInfo.openId

  try {
    const res = await db
      .collection('myplans')
      .where({
        _openid: openId,
        status: _.in(status)
      })
      .limit(count)
      .get()

    if (res.data !== undefined) {
      for (let i = 0; i < res.data.length; i++) {
        const plan = res.data[i]
        const result = await db
          .collection('myequips')
          .where({
            _openid: openId,
            name: _.in(plan.todos)
          })
          .get()

        plan.todos = arr2section(result.data)
        if (plan.dones.length === 0) {
          const todos = JSON.parse(JSON.stringify(plan.todos))
          plan.dones = todos.map(cate => {
            cate.equips = []
            return cate
          })
        }
      }
    }

    return res
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
