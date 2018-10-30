<template>
  <div class="home-container">
    
    <div v-if="viewStatus === 0">
      <div class="nodata-container">
        <wux-prompt :visible="viewStatus === 0" text="登录失败, 点击重试" @click="onLoginEvent" />
      </div>
    </div>

    <div v-else-if="viewStatus === 1">
      <div class="nodata-container">
        <wux-prompt :visible="viewStatus === 1" title="暂无计划，点击添加" @click="onAddPlanEvent" />
      </div>
    </div>

    <div v-else>

      <div class="header-container">
        <home-header :plan="plan"></home-header>
      </div>

      <wux-divider text="未收纳" dashed/>
      <div v-for="(cate, cateIndex) in plan.todos" :key="cateIndex">
        <wux-cell-group :title="cate.cateName">
          <div v-for="(equip, equipIndex) in cate.equips" :key="equipIndex">
            <wux-cell :title="equip.name" is-link :label="equip.remark" @click="onItemEvent(equip)"></wux-cell>
          </div>
        </wux-cell-group>
      </div>

      <div v-if="plan.dones.length > 0">
        <wux-divider text="已收纳" dashed/>
        <div v-for="(cate, cateIndex) in plan.dones" :key="cateIndex">
          <wux-cell-group :title="cate.cateName">
            <div v-for="(equip, equipIndex) in cate.equips" :key="equipIndex">
              <wux-cell :title="equip.name" is-link :label="equip.remark" @click="onItemEvent(equip)"></wux-cell>
            </div>
          </wux-cell-group>
        </div>
      </div>

      <div class="bottom-fixed-container" :style="{height: bottomHeight+'px'}">
        <button class="bottom-button" plain @click="onShowPackPage">{{nextBtnTitle}}</button>
      </div>

      <div class="user-container">
        <wux-image :src="headUrl" shape="circle" width=100rpx height=100rpx>
          <image src="/static/icon_user.png" slot="loading" />
        </wux-image>
        <button class="user-button" open-type="getUserInfo" @getuserinfo="onGetUserInfo"></button>
      </div>
    </div>
   
  </div>
</template>

<script>
import EquipmentGroup from '@/components/EquipmentGroup'
import HomeHeader from '@/components/HomeHeader'

import appUtils from '@/common/utils/AppUtils'

import store from '@/store'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      viewStatus: 0, // 0、未登录，1、无数据，2、有数据
      headUrl: appUtils.userInfo.avatarUrl,
      nextBtnTitle: '开始打包'
    }
  },

  computed: {
    ...mapState('plan', ['plan']),

    bottomHeight: {
      get: function() {
        return appUtils.bottomHeight
      }
    }
  },

  components: {
    EquipmentGroup,
    HomeHeader
  },

  methods: {
    ...mapActions('plan', ['getCurrentPlan']),

    onLoginEvent(e) {
      getOpenId(this)
    },

    onAddPlanEvent(e) {
      this.$router.push({
        path: '/pages/tab1/category/main'
      })
    },

    onGetUserInfo(e) {
      if (Object.keys(appUtils.userInfo).length === 0) {
        appUtils.saveUserInfo(e.mp.detail.userInfo)
        this.headUrl = appUtils.userInfo.avatarUrl
      }

      this.$router.push({
        path: '/pages/tab2/mine/main'
      })
    },

    onShowPackPage(e) {
      const planStr = JSON.stringify(this.plan)
      this.$router.push({
        path: '/pages/tab1/pack/main',
        query: {
          plan: planStr,
          type: 1
        }
      })
    },

    onItemEvent(equip) {
      const equipStr = JSON.stringify(equip)
      this.$router.push({
        path: '/pages/tab2/equipedit/main',
        query: {
          equip: equipStr
        }
      })
    }
  },

  mounted() {
    // updateViewStatus(this)
    // getCurrentPlan(this)
  },

  onShow() {
    updateViewStatus(this)
    getCurrentPlan(this)
  }
}

function getOpenId(that) {
  appUtils.getOpenId().then(res => {
    getCurrentPlan(that)
  })
}

function getCurrentPlan(that) {
  that
    .getCurrentPlan()
    .then(res => {
      updateViewStatus(that)
      if (Object.keys(that.plan).length > 0) {
        wx.setNavigationBarTitle({ title: that.plan.title })
      }
    })
    .catch(err => {
      console.log('err====', err)
      updateViewStatus(that)
    })
}

function updateViewStatus(that) {
  if (appUtils.openId.length === 0) {
    that.viewStatus = 0
  } else if (Object.keys(that.plan).length === 0) {
    that.viewStatus = 1
  } else {
    that.viewStatus = 2
  }
}
</script>

<style scoped>
.home-container {
  padding: 160rpx 0 180rpx 0;
}

.header-container {
  position: fixed;
  z-index: 100;
  top: 0;
  width: 100%;
  height: 160rpx;
  background-color: #282a34;
}

.bottom-button {
  width: 100%;
  height: 96rpx;
  color: white;
  border: 0;
}

.user-container {
  position: fixed;
  z-index: 100;
  right: 20rpx;
  bottom: 200rpx;
  width: 100rpx;
  height: 100rpx;
  background-color: darkgrey;
  border-radius: 50rpx;
}

.user-button {
  position: fixed;
  z-index: 101;
  right: 20rpx;
  bottom: 200rpx;
  width: 100rpx;
  height: 100rpx;
  border-radius: 50rpx;
  opacity: 0;
}
</style>
