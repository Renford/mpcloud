const OpenIdKey = 'OpenIdKey'
const UserInfoKey = 'UserInfoKey'

class AppUtils {
  openId = ''
  userInfo = {}
  bottomHeight = 48

  sharePlanId = ''

  saveOpenId(openId) {
    this.openId = openId
    wx.setStorage({
      key: OpenIdKey,
      data: openId
    })
  }

  saveUserInfo(userInfo) {
    this.userInfo = userInfo
    wx.setStorage({
      key: UserInfoKey,
      data: userInfo
    })
  }

  isShowSharePlan() {
    if (this.sharePlanId !== undefined && this.sharePlanId.length > 0) {
      return true
    }
    return false
  }

  loadStorage() {
    const that = this
    wx.getStorage({
      key: OpenIdKey,
      success: function(res) {
        that.openId = res.data
      }
    })

    wx.getStorage({
      key: UserInfoKey,
      success: function(res) {
        that.userInfo = res.data
      }
    })
  }

  getSystemInfo() {
    const that = this
    wx.getSystemInfo({
      success: function(res) {
        console.log('=====system info:', res)
        that.bottomHeight = res.screenHeight - res.windowHeight
        if (that.bottomHeight < 80) {
          that.bottomHeight = 48
        }
      },
      fail: function(err) {
        console.log('=====system info', err)
      }
    })
  }

  getOpenId() {
    const that = this
    return wx.cloud
      .callFunction({
        name: 'login'
      })
      .then(res => {
        console.log('=====get openid: ', res)
        if (res.errMsg === 'cloud.callFunction:ok' && res.result.code === 0) {
          that.saveOpenId(res.result.detail.openId)
        }
      })
      .catch(err => {
        console.log('===get openid: ', err)
      })
  }

  getShareObject() {
    const path = `/pages/tab1/home/main`
    return {
      title: '旅中人',
      path: path,
      imageUrl: '/static/icon',
      success: res => {
        console.log('===分享成功...', res)
      },
      fail: err => {
        console.log('===分享失败...', err)
      },
      complete: () => {}
    }
  }
}

export default new AppUtils()
