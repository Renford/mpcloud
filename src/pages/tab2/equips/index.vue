<template>
  <div>

    <div v-for="(cate, cateIndex) in sections" :key="cateIndex">
      <wux-cell-group :title="cate.cateName">
        <div v-for="(equip, equipIndex) in cate.equips" :key="equipIndex">
          <wux-cell :title="equip.name" is-link :label="equip.remark" @click="onItemEvent(equip)"></wux-cell>
          <!-- <van-swipe-cell right-width="65">
            <wux-cell :title="equip.name" is-link :label="equip.remark" @click="onItemEvent(equip)"></wux-cell>
            <div slot="right" class="cell-right B0 F4 C5" @click="onDeleteEvent(equip)">删除</div>
          </van-swipe-cell> -->
        </div>
        <wux-cell hover-class="none">
          <wux-input :id="cateIndex" placeholder="添加新装备" clear placeholder-class="C1 F1" @confirm="onAddEvent">
            <image style="width: 20px; height: 20px; margin-right: 5px" src="/static/icon_add.png" />
          </wux-input>
        </wux-cell>
      </wux-cell-group>
    </div>

    <!-- <div class="bottom-button-container">
      <wux-button block type="balanced" @click="onAddEvent">添加装备</wux-button>
    </div> -->
  </div>
</template>

<script>
import cateUtils from '@/common/utils/CateUtils'

import api from '@/api/api'
import store from '@/store'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {}
  },

  computed: {
    ...mapState('equip', ['equips']),

    sections: {
      get: function() {
        return cateUtils.getSortCatesFromEquips(this.equips)
      }
    }
  },

  components: {},

  methods: {
    ...mapActions('equip', ['getMyEquips', 'addMyEquips']),

    onItemEvent(equip) {
      const equipStr = JSON.stringify(equip)
      this.$router.push({
        path: '/pages/tab2/equipedit/main',
        query: {
          equip: equipStr
        }
      })
    },

    onDeleteEvent(equip) {
      wx.showLoading({
        title: '正在删除...'
      })

      const that = this
      api.equip.deleteMyEquip(equip._id).then(res => {
        that
          .getMyEquips()
          .then(res => {
            wx.hideLoading()
          })
          .catch(err => {
            console.log('===err', err)
            wx.hideLoading()
          })
      })
    },

    onAddEvent(e) {
      const name = e.mp.detail.value
      const index = parseInt(e.mp.target.id)
      const cate = this.sections[index]
      const equip = {
        name: name,
        number: 1,
        status: 1, // 0, 虚购买，1、已拥有
        remark: '', // 备注
        cateId: cate.cateId,
        cateName: cate.cateName
      }

      store.dispatch('equip/addMyEquips', [equip]).then(res => {
        store.dispatch('equip/getMyEquips')
      })
    }

    // onAddEvent(e) {
    //   this.$router.push({
    //     path: '/pages/tab2/equipedit/main'
    //   })
    // }
  },

  onShow() {
    this.getMyEquips()
  },

  mounted() {}
}
</script>

<style scoped>
.cell-right {
  width: 130rpx;
  height: 100rpx;
  text-align: center;
  line-height: 100rpx;
}
</style>
