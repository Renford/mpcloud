exports.main = (event, context) => {
  // { userInfo:
  //   { appId: 'wx90942fcf33887fac',
  //     openId: 'oLUYH0R2CrC2-WMu_wzHzby8TJk8' } }

  // { callbackWaitsForEmptyEventLoop: [Getter/Setter],

  return {
    openid: event.userInfo.openId
  }
}
