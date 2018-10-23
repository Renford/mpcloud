exports.main = (event, context) => {
  console.log('===event:', event)
  console.log('===context:', context)

  return {
    openid: event.userInfo.openid
  }
}
