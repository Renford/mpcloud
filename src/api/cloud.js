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

  update(url, docid, params) {
    return wx.cloud
      .database()
      .collection(url)
      .doc(docid)
      .update({
        data: params
      })
  }

  get(url, params) {
    let ops = params
    if (params === undefined) {
      ops = {}
    }

    const db = wx.cloud.database()
    return db
      .collection(url)
      .where({
        ...ops
      })
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
