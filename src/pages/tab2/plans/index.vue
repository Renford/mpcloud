<template>
  <div>

    <wux-cell-group>
      <div v-for="(plan, index) in plans" :key="index">
        <wux-card :title="plan.title" :extra="plan.statusName">
          <div slot="body">{{plan.originating + '-->' + plan.destination}}</div>
          <div slot="footer">{{plan.date}}</div>
        </wux-card>
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
    }
  },

  mounted() {
    const that = this
    this.getPlans().then(res => {
      console.log('plans====', that.plans)
    })
  },

  created() {}
}
</script>

<style scoped>
</style>
