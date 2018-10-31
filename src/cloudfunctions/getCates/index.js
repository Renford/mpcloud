// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  let ids = _
  if (event.ids.length === 0) {
    ids = _.nin([])
  } else {
    ids = _.in(event.ids)
  }

  const fields = {}
  event.fields.forEach(field => {
    fields[field] = true
  })

  try {
    return await db
      .collection('categories')
      .where({
        cateId: ids
      })
      .field({
        ...fields
      })
      .get()
      .then(res => {
        return arr2Sort(res.data)
      })
  } catch (error) {
    console.error('===get cates error:', error)
  }
}

// 指定返回顺序
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

const arr2Sort = arr => {
  const obj = {}
  arr.forEach(cate => {
    obj[cate.cateId] = cate
  })

  return cateIds
    .map(id => {
      return obj[id]
    })
    .filter(cate => {
      return cate != undefined
    })
}