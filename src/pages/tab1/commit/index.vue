<template>
  <div>
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
      <wux-cell title="活动日期" is-link></wux-cell>
    </wux-cell-group>

    <div class="bottom-button-container">
      <wux-button block type="balanced" @click="onSubmitEvent">生成计划清单</wux-button>
    </div>
    
  </div>
</template>

<script>
import api from '@/api/api'

export default {
  data() {
    return {
      equips: [],
      planTitle: '东海裸泳',
      planDate: '2018-12-12 12:30',
      planOrigin: '上海',
      planDest: '东海'
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

    onSubmitEvent(e) {
      console.log('submit====', e)
      let plan = {
        title: this.planTitle,
        date: this.planDate,
        origin: this.planOrigin,
        destination: this.planDest,
        todos: this.equips
      }

      // api.travel.addEquips(this.equips)

      const that = this
      api.travel
        .addPlan(plan)
        .then(res => {
          console.log('add plan sucess====')
          that.$router.push({ path: '/pages/tab1/home/main', reLaunch: true })
        })
        .catch(err => {
          console.log('add plan error', err)
        })
    }
  },

  mounted() {
    this.equips = JSON.parse(this.$route.query.equips)
    console.log('======moutedn', this.equips)
  },

  created() {}
}
</script>

<style scoped>
</style>
