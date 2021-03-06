const OpenIdKey = 'OpenIdKey'
const UserInfoKey = 'UserInfoKey'

class AppUtils {
  openId = ''
  userInfo = {}
  bottomHeight = 48

  shareTempId = ''
  shareUserName = ''

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

  isShowShareTemp() {
    if (this.shareTempId !== undefined && this.shareTempId.length > 0) {
      return true
    }
    return false
  }

  clearShareTemp() {
    this.shareTempId = ''
    this.shareUserName = ''
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
      title: '打包小助手',
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

  checkVersionUpdate() {
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function(res) {
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，重新启动应用吧！',
        showCancel: false,
        success(res) {
          if (res.confirm) {
          }
        }
      })
    })

    updateManager.onUpdateFailed(function() {
      // 新版本下载失败
    })
  }
}

export default new AppUtils()
