import api from '@/api/api'

const OpenIdKey = 'OpenIdKey'
const UserInfoKey = 'UserInfoKey'

class AppUtils {
  openId = ''
  userInfo = {}
  bottomHeight = 96

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
        that.bottomHeight = res.screenHeight - res.windowHeight
        console.log('=====system info:', res)
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
        name: 'login',
        data: {}
      })
      .then(res => {
        console.log('=====get openid: ', res)
        if (res.errMsg === 'cloud.callFunction:ok') {
          that.saveOpenId(res.result.openid)
        }
      })
      .catch(err => {
        console.log('===get openid: ', err)
      })
  }

  // launchApp(that) {
  //   if (this.openId.length === 0) {
  //     this.wxLogin(that)
  //     this.getOfficeInfo()
  //   } else {
  //   }
  // }

  // wxLogin(that) {
  //   let tempThis = this
  //   wx.login({
  //     success: function(res) {
  //       let code = res.code
  //       tempThis
  //         .getOpenId(code)
  //         .then(() => {
  //           tempThis
  //             .getUserInfo()
  //             .then(res => {})
  //             .catch(err => {
  //               console.log('用户信息获取失败，进入注册页面\n', err)
  //               that.$router.push({
  //                 path: '/pages/tab3/register/main',
  //                 reLaunch: true
  //               })
  //             })
  //         })
  //         .catch(err => {
  //           console.log('===getOpenid error:', err)
  //         })
  //     },
  //     fail: function(err) {
  //       console.log('===wx login error:', err)
  //     }
  //   })
  // }

  // getOpenId(code) {
  //   let tempThis = this
  //   return api.mine.getOpenId(code).then(res => {
  //     tempThis.openId = res.openid
  //   })
  // }

  // getUserInfo() {
  //   let tempThis = this
  //   return api.mine.getUserInfo(this.openId).then(res => {
  //     tempThis.userInfo = res[0]
  //     tempThis.saveOpenId(tempThis.openId)
  //     tempThis.saveUserInfo(tempThis.userInfo)
  //   })
  // }

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
