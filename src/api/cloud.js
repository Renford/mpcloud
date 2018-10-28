import config from './config'

class Cloud {
  add(url, params) {
    return wx.cloud
      .database()
      .collection(url)
      .add({
        data: params
      })
  }

  delete(url, docid) {
    return wx.cloud
      .database()
      .collection(url)
      .doc(docid)
      .remove()
  }

  // 更新记录的某个属性
  update(url, docid, params) {
    return wx.cloud
      .database()
      .collection(url)
      .doc(docid)
      .update({
        data: params
      })
  }

  // 更新整条记录
  set(url, docid, params) {
    return wx.cloud
      .database()
      .collection(url)
      .doc(docid)
      .set({
        data: params
      })
  }

  get(url, params) {
    let ops = params
    if (params === undefined) {
      ops = {}
    }

    let count = 10
    if (ops.count !== undefined) {
      count = ops.count
      delete ops.count
    }

    console.log('===ops====', ops, count)

    const db = wx.cloud.database()
    return db
      .collection(url)
      .where({
        ...ops
      })
      .limit(count)
      .get()
      .then(res => {
        if (res.errMsg === 'collection.get:ok') {
          return res.data
        } else {
          return Promise.reject(config.ErrorInfo.kGetDataErrorInfo)
        }
      })
  }
}

export default new Cloud()
