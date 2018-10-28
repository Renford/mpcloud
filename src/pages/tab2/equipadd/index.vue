<template>
  <div>
    <wux-button block type="balanced" open-type="getUserInfo" @getuserinfo="onGetUserInfo">userInfo</wux-button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  components: {},

  methods: {
    onGetUserInfo(info) {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          console.log('[云函数] [login] user openid: ', res)
          // wx.navigateTo({
          //   url: '../userConsole/userConsole'
          // })
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
          // wx.navigateTo({
          //   url: '../deployFunctions/deployFunctions'
          // })
        }
      })
    }
  },

  created() {}
}
</script>

<style scoped>
</style>
