// export let BaseUrl = 'https://uatapiminapp.emoney.cn/api/'
// export let BaseUrl = 'https://minappadmin.emoney.cn/api/'
export let BaseUrl = 'https://apiminapp.emoney.cn'
export let TongjiUrl = 'https://webtongji.emoney.cn/Page/PageView'

export let BaseApiUrl = `${BaseUrl}/api/`
export let BaseWebUrl = `${BaseUrl}/RealStock/`

export let posZero = 1
export let pageSize = 30
export let updateInterval = 5 * 1000
export let listMaxSize = 50

export let ErrorInfo = {
  kGetDataErrorInfo: new Error('数据获取失败')
}

export default {
  BaseApiUrl,
  BaseWebUrl,
  TongjiUrl,
  posZero,
  pageSize,
  listMaxSize,
  updateInterval,
  ErrorInfo
}
