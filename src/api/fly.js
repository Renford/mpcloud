import config from './config'

let Fly = require('flyio/dist/npm/wx')
let fly = new Fly()

fly.interceptors.response.use(res => {
  // console.log('=======', byteConvert(JSON.stringify(res.data).length))
  // console.log('=====request url:', res.engine.responseURL)
  // console.log('=====request response', res.data)
  if (res.data.result.code === 0) {
    return res.data.detail
  } else {
    return Promise.reject(config.ErrorInfo.kGetDataErrorInfo)
  }
})

export default fly
