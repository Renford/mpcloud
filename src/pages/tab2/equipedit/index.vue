<template>
  <div class="edit-container">
    <wux-select id="wux-select" />
    <wux-toast id="wux-toast" />

    <wux-cell-group>
      <wux-cell hover-class="none">
        <wux-input label="名称" placeholder="如登山杖、手套等" controlled :value="equip.name" @change="onNameChange"/>
      </wux-cell>
      <wux-cell hover-class="none">
        <wux-input label="备注" placeholder="如型号、大小、颜色等" controlled :value="equip.remark" @change="onRemarkChange"/>
      </wux-cell>
      <wux-cell title="数量" hover-class="none">
        <wux-input-number shape="circle" color="balanced" slot="footer" min=0 max=9 controlled :value="equip.number" @change="onNumberChange"/>
      </wux-cell>
      <wux-cell title="类型" is-link :extra="equip.cateName" @click="onShowPicker"/>
    </wux-cell-group>

    <div class="bottom-button-container">
      <wux-button block type="balanced" @click="onSubmitEvent">确定</wux-button>
    </div>
  </div>
</template>

<script>
import { $wuxSelect, $wuxToast } from '../../../../static/wux/index'

import api from '@/api/api'
import store from '@/store'
import { mapState, mapGetters, mapActions } from 'vuex'

import appUtils from '@/common/utils/AppUtils'
import cateUtils from '@/common/utils/CateUtils'
export default {
  data() {
    return {
      equip: {}
    }
  },

  computed: {
    cateNames: {
      get: function() {
        return cateUtils.cates.map(cate => {
          return cate.cateName
        })
      }
    }
  },

  components: {},

  methods: {
    ...mapActions('category', ['getCates']),

    onNameChange(e) {
      this.equip.name = e.mp.detail.value
    },

    onRemarkChange(e) {
      this.equip.remark = e.mp.detail.value
    },

    onNumberChange(e) {
      this.equip.number = e.mp.detail.value
    },

    onShowPicker(e) {
      const that = this
      $wuxSelect('#wux-select').open({
        value: this.equip.cateName,
        options: this.cateNames,

        onConfirm: (value, index, options) => {
          console.log('===wux-select--onConfirm', value, index, options)
          if (index !== -1) {
            const cate = cateUtils.cates[index]
            that.equip.cateId = cate.cateId
            that.equip.cateName = cate.cateName
          }
        }
      })
    },

    onSubmitEvent(e) {
      if (this.equip.name.length === 0) {
        $wuxToast().info({
          type: 'text',
          text: '装备名称不能为空!'
        })
      } else {
        wx.showLoading({
          title: '数据更新中...'
        })
        const that = this
        api.travel
          .updateEquip(0, this.equip)
          .then(res => {
            wx.hideLoading()
            that.$router.back()
          })
          .catch(err => {
            wx.hideLoading()
            $wuxToast().error({
              type: 'text',
              text: err.message
            })
          })
      }
    }
  },

  mounted() {
    this.equip = JSON.parse(this.$route.query.equip)
    console.log('===equips:', this.equip)

    const that = this
    if (cateUtils.cates.length === 0) {
      this.getCates().then(res => {
        that.cateNames = cateUtils.cates.map(cate => {
          return cate.cateName
        })
      })
    }
  },

  onLoad() {}
}
</script>
<style scoped>
.edit-container {
  padding: 40rpx 0 0 0;
}
</style>
