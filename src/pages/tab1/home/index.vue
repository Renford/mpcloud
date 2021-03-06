<template>
  <div class="home-container">

    <div v-if="viewStatus === -1">
      <div class="nodata-container">
      </div>
    </div>
    
    <div v-else-if="viewStatus === 0">
      <div class="nodata-container">
        <wux-prompt :visible="viewStatus === 0" text="登录失败, 点击重试" @click="onLoginEvent" />
      </div>
    </div>

    <div v-else-if="viewStatus === 1">
      <div class="nodata-container">
        <wux-prompt :visible="viewStatus === 1" title="暂无活动，点击添加" @click="onAddPlanEvent" />
      </div>
    </div>

    <div v-else>

      <div class="header-container">
        <home-header :plan="plan"></home-header>
      </div>

      <wux-divider :text="todoTitle"/>
      <div v-for="(cate, cateIndex) in cateTodos" :key="cateIndex">
        <div v-if="cate.equips.length > 0">
          <wux-cell-group :title="cate.cateName">
            <div v-for="(equip, equipIndex) in cate.equips" :key="equipIndex">
              <wux-cell :title="equip.name" is-link :label="equip.remark" @click="onItemEvent(equip)"></wux-cell>
            </div>
          </wux-cell-group>
        </div>
      </div>

      <wux-divider :text="doneTitle"/>
      <div v-for="(cate, cateIndex) in cateDones" :key="cateIndex">
        <div v-if="cate.equips.length > 0">
          <wux-cell-group :title="cate.cateName">
            <div v-for="(equip, equipIndex) in cate.equips" :key="equipIndex">
              <wux-cell :title="equip.name" is-link :label="equip.remark" @click="onItemEvent(equip)"></wux-cell>
            </div>
          </wux-cell-group>
        </div>
      </div>

      <div class="bottom-fixed-container" :style="{height: bottomHeight+'px'}">
        <button class="bottom-button" plain @click="onShowPackPage">{{bottomBtnTitle}}</button>
      </div>

      <div class="user-container">
        <wux-image :src="headUrl" shape="circle" width=90rpx height=90rpx></wux-image>
        <button class="user-button B0" open-type="getUserInfo" @getuserinfo="onGetUserInfo"></button>
      </div>

      <div class="share-container">
        <wux-image src="/static/icon_share.png" shape="circle" width=90rpx height=90rpx></wux-image>
        <button class="share-button B0" open-type="share"></button>
      </div>

      <div class="add-container" @click="onAddEquipsEvent">
        <wux-image src="/static/icon_add.png" shape="circle" width=90rpx height=90rpx></wux-image>
      </div>
    </div>
   
  </div>
</template>

<script>
import HomeHeader from '@/components/HomeHeader'

import appUtils from '@/common/utils/AppUtils'
import cateUtils from '@/common/utils/CateUtils'

import store from '@/store'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      viewStatus: -1, // -1、数据加载中，0、未登录，1、无数据，2、有数据
      headUrl: '/static/icon_head.png',
      todoTitle: '未装包',
      doneTitle: '已装包'
    }
  },

  computed: {
    ...mapState('plan', ['plan']),
    ...mapState('category', ['cates']),

    cateTodos: {
      get: function() {
        if (Object.keys(this.plan).length === 0) {
          return []
        }
        const total = this.plan.todos.length + this.plan.dones.length
        this.todoTitle = `未装包(${this.plan.todos.length}/${total})`
        return cateUtils.getSortCatesFromEquips(this.plan.todos)
      }
    },

    cateDones: {
      get: function() {
        if (Object.keys(this.plan).length === 0) {
          return []
        }
        const total = this.plan.todos.length + this.plan.dones.length
        this.doneTitle = `已装包(${this.plan.dones.length}/${total})`
        return cateUtils.getSortCatesFromEquips(this.plan.dones)
      }
    },

    bottomHeight: {
      get: function() {
        return appUtils.bottomHeight
      }
    },

    bottomBtnTitle: {
      get: function() {
        let title = '开始打包'
        if (Object.keys(this.plan).length > 0 && this.plan.status === 1) {
          title = '继续打包'
        }
        return title
      }
    }
  },

  components: {
    HomeHeader
  },

  methods: {
    ...mapActions('plan', ['getCurrentPlan']),
    ...mapActions('category', ['getCates']),

    onLoginEvent(e) {
      getOpenId(this)
    },

    onAddPlanEvent(e) {
      this.$router.push({
        path: '/pages/tab1/category/main'
      })
    },

    onAddEquipsEvent(e) {
      const type = this.plan.cateId.length === 0 ? 4 : 3
      const planStr = JSON.stringify(this.plan)
      this.$router.push({
        path: '/pages/tab1/select/main',
        query: {
          type: type,
          cateId: this.plan.cateId,
          plan: planStr
        }
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

  onShow() {
    getCurrentPlan(this)
    if (Object.keys(appUtils.userInfo).length > 0) {
      this.headUrl = appUtils.userInfo.avatarUrl
    }
  },

  mounted() {
    showImportShareData(this)
  },

  onShareAppMessage(e) {
    const path = '/pages/tab1/home/main'
    return {
      title: '提前计划，逐条打包，从此杜绝‘忘带XX了’...',
      path: path,
      imageUrl: '/static/img_share.png'
    }
  }
}

function getOpenId(that) {
  appUtils.getOpenId().then(res => {
    getCurrentPlan(that)
  })
}

function getCurrentPlan(that) {
  if (cateUtils.cates.length === 0) {
    that.getCates().then(res => {
      that
        .getCurrentPlan()
        .then(res => {
          updateViewStatus(that)
        })
        .catch(err => {
          console.log('err====', err)
          updateViewStatus(that)
        })
    })
  } else {
    that
      .getCurrentPlan()
      .then(res => {
        updateViewStatus(that)
      })
      .catch(err => {
        console.log('err====', err)
        updateViewStatus(that)
      })
  }
}

function updateViewStatus(that) {
  if (appUtils.openId.length === 0) {
    that.viewStatus = 0
  } else if (Object.keys(that.plan).length === 0) {
    that.viewStatus = 1
  } else {
    that.viewStatus = 2
  }
  if (Object.keys(that.plan).length > 0) {
    wx.setNavigationBarTitle({ title: that.plan.title })
  }
}

function showImportShareData(that) {
  if (appUtils.isShowShareTemp()) {
    that.$router.push({
      path: '/pages/tab2/tempdetail/main',
      query: {
        type: 1,
        tempId: appUtils.shareTempId,
        fromUserName: appUtils.shareUserName
      }
    })
    appUtils.clearShareTemp()
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
  right: 30rpx;
  bottom: 210rpx;
  width: 90rpx;
  height: 90rpx;
  background-color: #7a7a7a;
  border-radius: 50rpx;
}

.user-button {
  position: fixed;
  z-index: 101;
  right: 30rpx;
  bottom: 210rpx;
  width: 90rpx;
  height: 90rpx;
  border-radius: 50rpx;
  opacity: 0;
}

.share-container {
  position: fixed;
  z-index: 100;
  right: 30rpx;
  bottom: 330rpx;
  width: 90rpx;
  height: 90rpx;
  background-color: #7a7a7a;
  border-radius: 50rpx;
}

.share-button {
  position: fixed;
  z-index: 101;
  right: 30rpx;
  bottom: 330rpx;
  width: 90rpx;
  height: 90rpx;
  border-radius: 50rpx;
  opacity: 0;
}

.add-container {
  position: fixed;
  z-index: 100;
  right: 30rpx;
  bottom: 450rpx;
  width: 90rpx;
  height: 90rpx;
  background-color: #7a7a7a;
  border-radius: 50rpx;
}
</style>
