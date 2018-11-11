<template>
  <div class="pack-container">

    <div class="tips-container F5 C2 B8" v-if="type==='1'">
      <div>{{tips}}</div>
    </div>

    <div v-for="(cate, cateIndex) in sortCates" :key="cateIndex">
      <div v-if="cate.equips.length > 0">
        <wux-cell-group :title="cate.cateName">
          <div v-for="(equip, equipIndex) in cate.equips" :key="equipIndex">
            <wux-cell :title="equip.name" :label="equip.remark"></wux-cell>
          </div>
        </wux-cell-group>
      </div>
    </div>

    <div v-if="type==='0'">
      <div class="bottom-fixed-container flex-row" :style="{height: bottomHeight+'px'}">
        <button class="button-next C5" plain @click="onUseEvent">创建活动</button>
        <button class="button-finish C5" plain open-type="share">分享模板</button>
      </div>
    </div>
    <div v-else>
      <div class="bottom-fixed-container flex-row" :style="{height: bottomHeight+'px'}">
        <button class="button-next C5" plain @click="onUseEvent">创建活动</button>
        <button class="button-finish C5" plain @click="onSaveEvent">保存模板</button>
      </div>
    </div>
    
  </div>
</template>

<script>
import appUtils from '@/common/utils/AppUtils'
import cateUtils from '@/common/utils/CateUtils'

import store from '@/store'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      type: 0, // 0、详情，1、分享
      temp: {},
      fromUserName: ''
    }
  },

  computed: {
    ...mapState('temp', ['shareTemp']),

    tips: {
      get: function() {
        return `小贴士：这是$${this.fromUserName}$分享的装备模板`
      }
    },

    bottomHeight: {
      get: function() {
        return appUtils.bottomHeight
      }
    },

    sortCates: {
      get: function() {
        if (Object.keys(this.temp).length === 0) {
          return []
        }

        return cateUtils.getSortCatesFromEquips(this.temp.equips)
      }
    }
  },

  components: {},

  methods: {
    ...mapActions('temp', ['getShareTemp']),

    onUseEvent(e) {
      this.$router.push({
        path: '/pages/tab1/commit/main',
        query: {
          cateId: '',
          equips: JSON.stringify(this.temp.equips)
        }
      })
    },

    onSaveEvent(e) {
      const equips = this.temp.equips.map(equip => {
        return equip.name
      })
      const equisStr = JSON.stringify(equips)
      this.$router.push({
        path: '/pages/tab2/tempadd/main',
        query: {
          equips: equisStr
        }
      })
    }
  },

  mounted() {
    this.type = this.$route.query.type
    if (this.type === '0') {
      this.temp = JSON.parse(this.$route.query.temp)
      wx.setNavigationBarTitle({ title: this.temp.title })
    } else if (this.type === '1') {
      this.fromUserName = this.$route.query.fromUserName
      const tempId = this.$route.query.tempId
      const that = this
      wx.showLoading({
        title: '数据加载中...'
      })
      this.getShareTemp(tempId)
        .then(res => {
          wx.hideLoading()
          that.temp = that.shareTemp
          wx.setNavigationBarTitle({ title: this.temp.title })
        })
        .catch(err => {
          wx.hideLoading()
          console.log('===err', err)
        })
    }
  },

  onShareAppMessage(e) {
    const path = `/pages/tab1/home/main?tempId=${this.temp._id}?userName=${
      appUtils.userInfo.nickName
    }`
    return {
      title: '打包小助手',
      path: path,
      imageUrl: '/static/icon'
    }
  }
}
</script>

<style scoped>
.pack-container {
  padding: 0 0 180rpx 0;
}

.tips-container {
  height: 60rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.button-next {
  width: 50%;
  height: 120rpx;
  border: 0;
  color: white;
}

.button-finish {
  width: 50%;
  height: 120rpx;
  border: 0;
  color: white;
}
</style>
