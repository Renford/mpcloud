<template>
  <div>

    <div class="heaer-container">
      <wux-image :src="userInfo.avatarUrl" shape="circle" width=120rpx height=120rpx></wux-image>
      <div class="header-name C1 F3">断红残雪</div>
    </div>

    <wux-cell-group>
      <wux-cell title="我的规划" is-link url="/pages/tab2/plans/main"></wux-cell>
      <wux-cell title="我的装备" is-link url="/pages/tab2/equips/main"></wux-cell>
    </wux-cell-group>

  </div>
</template>

<script>
import appUtils from '@/common/utils/AppUtils'
export default {
  data() {
    return {
      userInfo: appUtils.userInfo
    }
  },

  components: {},

  methods: {
    onGetUserInfo(info) {}
  },

  created() {}
}
</script>

<style scoped>
.heaer-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 360rpx;
}

.header-image {
  width: 100rpx;
  height: 100rpx;
}

.header-name {
  margin-top: 10rpx;
}
</style>
