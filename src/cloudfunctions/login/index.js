const result = require('./result')
exports.main = (event, context) => {
  const data = {
    openId: event.userInfo.openId
  }
  return result.formateResult(0, '', data)
}
