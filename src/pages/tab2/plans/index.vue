<template>
  <div>

    <wux-cell-group>
      <div v-for="(plan, index) in plans" :key="index">
        <van-swipe-cell right-width="65">
          <div class="cell-container flex-col B1" @click="onItemEvent(plan)">
            <div class="C1 F3">{{plan.title}}</div>
            <div class="cell-content C1 F4">{{plan.originating + '-->' + plan.destination}}</div>
            <div class="flex-row F4 C3">
              <div>{{plan.statusName}}</div>
              <div class="cell-divider">|</div>
              <div>{{plan.date}}</div>
            </div>
          </div>
          <div slot="right" class="cell-right B0 F4 C5" @click="onDeleteEvent(plan)">删除</div>
        </van-swipe-cell>
      </div>
    </wux-cell-group>

  </div>
</template>

<script>
import api from '@/api/api'
import store from '@/store'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {}
  },

  computed: {
    ...mapState('plan', ['plans'])
  },
  components: {},

  methods: {
    ...mapActions('plan', ['getPlans']),

    onCreateEvent(e) {
      console.log('e==========', e)
    },

    onItemEvent(plan) {
      const planStr = JSON.stringify(plan)
      this.$router.push({
        path: '/pages/tab2/plandetail/main',
        query: {
          plan: planStr
        }
      })
    },

    onDeleteEvent(plan) {
      wx.showLoading({
        title: '正在删除...'
      })

      const that = this
      api.plan.deletePlan(plan._id).then(res => {
        that
          .getPlans()
          .then(res => {
            wx.hideLoading()
          })
          .catch(err => {
            console.log('===err', err)
            wx.hideLoading()
          })
      })
    }
  },

  mounted() {
    this.getPlans()
  },

  created() {}
}
</script>

<style scoped>
.cell-container {
  height: 200rpx;
  padding: 0 30rpx;
  margin-bottom: 10rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cell-content {
  margin: 10rpx 0;
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
