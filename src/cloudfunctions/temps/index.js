// 云函数入口文件
const cloud = require('wx-server-sdk')
const result = require('./result')

cloud.init()

const db = cloud.database()
const _ = db.command

// type: 1、add，2、del，3、update，4、get
exports.main = async (event, context) => {
  const type = event.type
  const openId = event.userInfo.openId

  try {
    let res = ''
    if (type === 1) {
      res = await addTemp(event)
    } else if (type === 2) {
      res = await delTemp(event)
    } else if (type === 3) {
      res = await updateTemps(event)
    } else if (type === 4) {
      res = await getTemps(event)
    }

    if (res === '') {
      return result.formateResult(1, 'db temps requst fail')
    } else {
      return result.successResult(res)
    }
  } catch (error) {
    return result.errorResult(error)
  }
}

const addTemp = async event => {
  const openId = event.userInfo.openId
  const temp = event.temp
  temp['_openid'] = openId

  return db.collection('temps').add({
    data: temp
  })
}

const delTemp = async event => {
  const tempId = event.tempId

  return db
    .collection('temps')
    .doc(tempId)
    .remove()
}

// ids 为空，请求我的，不为空请求特定的
const getTemps = async event => {
  const count = event.count
  const openId = event.userInfo.openId

  let params = {}
  if (event.ids.length === 0) {
    params = {
      _openid: openId
    }
  } else {
    params = {
      _id: _.in(event.ids)
    }
  }

  const res = await db
    .collection('temps')
    .where({
      ...params
    })
    .limit(count)
    .get()

  if (res.errMsg === 'collection.get:ok' && res.data.length > 0) {
    for (let i = 0; i < res.data.length; i++) {
      const temp = res.data[i]
      temp.equips = await handleEquips(temp.equips)
    }
  }

  return res
}

const updateTemps = async event => {
  const temp = event.temp
  const tempId = temp._id
  delete temp._id

  return db
    .collection('temps')
    .doc(tempId)
    .set({
      data: temp
    })
}

// [name] => [{cateId, cateName}]
const handleEquips = async names => {
  const result = await db
    .collection('equips')
    .where({
      name: _.in(names)
    })
    .limit(1000)
    .get()

  return result.data
}
