<template>
  <div>
    <wux-toast id="wux-toast" />

    <div v-for="(temp, index) in templates" :key="index">
      <van-swipe-cell right-width="65">
        <div class="cell-container flex-row B1" @click="onItemTapEvent(temp)">
          <div class="flex-col">
            <div class="C1 F3">{{temp.title}}</div>
            <div class="cell-content C3 F5">{{temp.desp}}</div>
          </div>
          <wux-button size="small" type="balanced" @click.stop="onItemUseEvent(temp)">立即使用</wux-button>
        </div>
        <div slot="right" class="cell-right B0 F4 C5" @click="onItemDelEvent(temp)">删除</div>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
import store from '@/store'
import { mapState, mapGetters, mapActions } from 'vuex'

import { $wuxToast } from '../../../../static/wux/index'

export default {
  data() {
    return {}
  },

  computed: {
    ...mapState('temp', ['temps']),

    templates: {
      get: function() {
        if (this.temps.length === 0) {
          return []
        }

        return this.temps.map(temp => {
          if (temp.desp.length === 0) {
            temp.desp = temp.equips
              .map(equip => {
                return equip.name
              })
              .join('、')
          }
          return temp
        })
      }
    }
  },

  components: {},

  methods: {
    ...mapActions('temp', ['getTemps']),

    onItemTapEvent(temp) {
      const tempStr = JSON.stringify(temp)
      this.$router.push({
        path: '/pages/tab2/tempdetail/main',
        query: {
          type: 0,
          temp: tempStr
        }
      })
    },

    onItemUseEvent(temp) {
      const array = JSON.stringify(temp.equips)
      this.$router.push({
        path: '/pages/tab1/commit/main',
        query: {
          equips: JSON.stringify(array)
        }
      })
    },

    onItemDelEvent(temp) {
      const that = this
      api.temp
        .delTemp(temp._id)
        .then(result => {
          that.getTemps()
        })
        .catch(err => {
          console.log('===err', err)
          $wuxToast().info({
            type: 'text',
            text: '删除失败'
          })
        })
    }
  },

  mounted() {
    this.getTemps()
  }
}
</script>

<style scoped>
.cell-container {
  height: 200rpx;
  padding: 0 30rpx;
  margin-bottom: 10rpx;
  align-items: center;
  justify-content: space-between;
}

.cell-content {
  margin: 10rpx 0;
  width: 500rpx;
  height: 80rpx;
  line-height: 40rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.cell-divider {
  padding: 0 20rpx;
}

.cell-right {
  width: 130rpx;
  height: 200rpx;
  text-align: center;
  line-height: 200rpx;
}
</style>
