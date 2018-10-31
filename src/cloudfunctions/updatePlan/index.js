// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const plan = event.plan
  const planId = plan._id
  delete plan._id

  try {
    return await db
      .collection('myplans')
      .doc(planId)
      .set({
        data: plan
      })
      .then(res => {
        return res.data
      })
  } catch (e) {
    console.error('===update my plans: ', e)
  }
}
