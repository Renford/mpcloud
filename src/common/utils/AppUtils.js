// import api from '@/api/api'

const OpenIdKey = 'OpenIdKey'
const UserInfoKey = 'UserInfoKey'
// const CategoriesKey = 'CategoriesKey'

class AppUtils {
  openId = ''
  userInfo = {}
  bottomHeight = 48

  // cates = []
  // _baseCateIds = []
  // _sortCateIds = []

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

  // saveCates(cates) {
  //   this.cates = cates
  //   wx.setStorage({
  //     key: CategoriesKey,
  //     data: cates
  //   })
  // }

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

    // wx.getStorage({
    //   key: CategoriesKey,
    //   success: res => {
    //     that.cates = res.data
    //   }
    // })
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

  // getBaseCateIds() {
  //   if (this._baseCateIds.length === 0) {
  //     this._baseCateIds = this.cates
  //       .filter(cate => {
  //         return cate.cateType !== '1'
  //       })
  //       .map(cate => {
  //         return cate.cateId
  //       })
  //   }

  //   return this._baseCateIds
  // }

  // getSortCateIds() {
  //   if (this._sortCateIds.length === 0) {
  //     this._sortCateIds = this.cates.map(cate => {
  //       return cate.cateId
  //     })
  //   }
  //   return this._sortCateIds
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
