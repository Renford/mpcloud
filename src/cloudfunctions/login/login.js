exports.main = (event, context) => {
  console.error('===event:', event)
  console.error('===context:', context)

  return {
    openid: event.userInfo.openid
  }
}
