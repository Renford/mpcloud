// 云函数入口文件
const cloud = require('wx-server-sdk')
const result = require('./result')

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

    if (res.errMsg === 'collection.get:ok' && res.data.length > 0) {
      for (let i = 0; i < res.data.length; i++) {
        const plan = res.data[i]

        const result = await db
          .collection('myequips')
          .where({
            _openid: openId,
            name: _.in(plan.todos)
          })
          .get()
        console.log('result======before', result)
        plan.todos = arr2section(result.data)
        console.log('result======after', plan.todos)

        if (plan.dones.length > 0) {
          const result = await db
            .collection('myequips')
            .where({
              _openid: openId,
              name: _.in(plan.dones)
            })
            .get()
          plan.dones = arr2section(result.data)
        } else {
          const todos = JSON.parse(JSON.stringify(plan.todos))
          plan.dones = todos.map(cate => {
            cate.equips = []
            return cate
          })
        }
      }
    }

    return result.successResult(res)
  } catch (error) {
    return result.errorResult(error)
  }
}

// [name] => [{cateId, cateName}]
const handleCates = async (names, openId) => {
  const result = await db
    .collection('myequips')
    .where({
      _openid: openId,
      name: _.in(names)
    })
    .get()

  return arr2section(result.data)
}

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

  return Object.keys(obj).map(id => {
    return {
      cateId: id,
      cateName: cateObj[id],
      equips: obj[id]
    }
  })
}
