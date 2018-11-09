<template>
  <div>
    <wux-calendar id="wux-calendar" />
    <wux-toast id="wux-toast" />

    <wux-cell-group>
      <wux-cell hover-class="none">
        <wux-input label="标题" placeholder="定个标题吧" focus @change="onTitleChange"></wux-input>
      </wux-cell>
      <wux-cell hover-class="none">
        <wux-input label="出发地" placeholder="从哪儿出发" @change="onOriginChange">></wux-input>
      </wux-cell>
      <wux-cell hover-class="none">
        <wux-input label="目的地" placeholder="我想去哪儿" @change="onDestChange">></wux-input>
      </wux-cell>
      <wux-cell title="活动日期" is-link :extra="planDate" @click="onDateEvent"></wux-cell>
    </wux-cell-group>

    <div class="bottom-button-container">
      <wux-button block type="balanced" @click="onSubmitEvent">生成规划清单</wux-button>
    </div>
    
  </div>
</template>

<script>
import api from '@/api/api'

import { $wuxCalendar, $wuxToast } from '../../../../static/wux/index'

export default {
  data() {
    return {
      cateId: '',
      equips: [],
      planTitle: '',
      planDate: '',
      planOrigin: '',
      planDest: ''
    }
  },

  components: {},

  methods: {
    onTitleChange(e) {
      this.planTitle = e.mp.detail.value
    },

    onOriginChange(e) {
      this.planOrigin = e.mp.detail.value
    },

    onDestChange(e) {
      this.planDest = e.mp.detail.value
    },

    onDateEvent(e) {
      let values = [new Date().getTime()]
      if (this.planDate.length > 0) {
        values = [this.planDate]
      }
      const that = this
      $wuxCalendar().open({
        value: values,
        onChange: (values, displayValues) => {
          that.planDate = displayValues[0]
        }
      })
    },

    onSubmitEvent(e) {
      if (isDataValid(this) === false) {
        return
      }

      let plan = {
        title: this.planTitle,
        date: this.planDate,
        originating: this.planOrigin,
        destination: this.planDest,
        todos: this.equips,
        dones: [],
        cateId: this.cateId
      }

      const that = this
      wx.showLoading({
        title: '数据提交中...'
      })
      api.plan
        .addPlan(plan)
        .then(res => {
          wx.hideLoading()
          that.$router.push({ path: '/pages/tab1/home/main', reLaunch: true })
        })
        .catch(err => {
          wx.hideLoading()
          console.log('add plan error', err)
        })
    }
  },

  mounted() {
    this.cateId = this.$route.query.cateId
    this.equips = JSON.parse(this.$route.query.equips)
    console.log('===equips', this.equips)
  },

  created() {}
}

const isDataValid = that => {
  let result = true
  if (that.planTitle.length === 0) {
    $wuxToast().show({
      type: 'text',
      text: '没有标题的规划不是一个好规划'
    })
    result = false
  }

  if (that.planDate.length === 0) {
    $wuxToast().show({
      type: 'text',
      text: '选个出发日期呗'
    })
    result = false
  }

  if (that.planOrigin.length === 0) {
    $wuxToast().show({
      type: 'text',
      text: '没有始发地，小的不知从哪出发!'
    })
    result = false
  }

  if (that.planDest.length === 0) {
    $wuxToast().show({
      type: 'text',
      text: '没有目的地，小的不知去往哪里!'
    })
    result = false
  }

  return result
}
</script>

<style scoped>
</style>
