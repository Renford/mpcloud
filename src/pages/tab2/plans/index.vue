<template>
  <div>

    <wux-cell-group>
      <div v-for="(plan, index) in plans" :key="index">
        <div class="sub-title C3 F4">{{plan.date}}</div>
        <wux-wing-blank size="default">
          <wux-card :title="plan.title" :extra="plan.statusName" @click="onItemEvent(plan)">
            <div slot="body">{{plan.originating + '-->' + plan.destination}}</div>
            <!-- <div slot="footer">{{plan.date}}</div> -->
          </wux-card>
        </wux-wing-blank>
      </div>
    </wux-cell-group>

  </div>
</template>

<script>
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
    }
  },

  mounted() {
    const that = this
    this.getPlans()
  },

  created() {}
}
</script>

<style scoped>
.sub-title {
  padding: 15rpx 0 5rpx 30rpx;
}
</style>
