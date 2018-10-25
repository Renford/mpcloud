import api from '@/api/api'

const OpenIdKey = 'OpenIdKey'
const UserInfoKey = 'UserInfoKey'
const OfficeInfoKey = 'OfficeInfoKey'
const SourceUserIdKey = 'SourceUserIdKey'

class AppUtils {
  openId = ''
  userInfo = {}
  officeInfo = {}
  sourceUserId = ''

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

  saveOffcieInfo(officeInfo) {
    this.officeInfo = officeInfo
    wx.setStorage({
      key: OfficeInfoKey,
      data: officeInfo
    })
  }

  saveSourceUserId(userId) {
    this.sourceUserId = userId
    wx.setStorage({
      key: SourceUserIdKey,
      data: userId
    })
  }

  clearSourceUserId() {
    this.sourceUserId = ''
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

    wx.getStorage({
      key: OfficeInfoKey,
      success: function(res) {
        that.officeInfo = res.data
      }
    })

    wx.getStorage({
      key: SourceUserIdKey,
      success: function(res) {
        that.sourceUserId = res.data
      }
    })
  }

  launchApp(that) {
    if (this.openId.length === 0) {
      this.wxLogin(that)
      this.getOfficeInfo()
    } else {
    }
  }

  wxLogin(that) {
    let tempThis = this
    wx.login({
      success: function(res) {
        let code = res.code
        tempThis
          .getOpenId(code)
          .then(() => {
            tempThis
              .getUserInfo()
              .then(res => {})
              .catch(err => {
                console.log('用户信息获取失败，进入注册页面\n', err)
                that.$router.push({
                  path: '/pages/tab3/register/main',
                  reLaunch: true
                })
              })
          })
          .catch(err => {
            console.log('===getOpenid error:', err)
          })
      },
      fail: function(err) {
        console.log('===wx login error:', err)
      }
    })
  }

  getOpenId(code) {
    let tempThis = this
    return api.mine.getOpenId(code).then(res => {
      tempThis.openId = res.openid
    })
  }

  getUserInfo() {
    let tempThis = this
    return api.mine.getUserInfo(this.openId).then(res => {
      tempThis.userInfo = res[0]
      tempThis.saveOpenId(tempThis.openId)
      tempThis.saveUserInfo(tempThis.userInfo)
    })
  }

  getOfficeInfo() {
    let tempThis = this
    return api.mine
      .getOfficeInfo()
      .then(res => {
        tempThis.officeInfo = res[0]
        tempThis.saveOffcieInfo(tempThis.officeInfo)
      })
      .catch(err => {
        console.log('===get office info eror:', err)
      })
  }

  getShareObject() {
    const path = `/pages/tab3/mine/main?userId=${this.userInfo.id}`
    return {
      title: '我的',
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
