import config from './config'

class Http {
  post(url, params) {
    return new Promise((resolve, reject) => {
      let options = {
        url: url,
        method: 'POST',
        data: params
      }
      options.success = function(res) {
        // console.log('====request sucess:' + url, res)
        if (res.data.result.code === 0) {
          resolve(res.data.detail)
        } else {
          reject(config.ErrorInfo.kGetDataErrorInfo)
        }
      }
      options.fail = function(res) {
        // console.log('====request fail:' + url, res)
        reject(res)
      }
      options.complete = function(res) {
        console.log('====request complete:' + url, res)
      }

      wx.request(options)
    })
  }

  get(url, params) {
    return new Promise((resolve, reject) => {
      let options = {
        url: url,
        method: 'Get',
        data: params
      }
      options.success = function(res) {
        resolve(res)
      }
      options.fail = function(res) {
        reject(res)
      }
      options.complete = function(res) {
        console.log('====request complete:' + url, res)
      }

      wx.request(options)
    })
  }
}

export default new Http()
