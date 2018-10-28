<template>
  <div>
    <form @submit="onFormSubmit">
      <div v-for="(cate, cateIndex) in plan.todos" :key="cateIndex">
        <cate-group :cate="cate"></cate-group>
      </div>
      
      <div class="bottom-button-container">
        <button id="100" class="form-button" formType="submit">下次继续</button>
        <button id="101" class="form-button" formType="submit">完成</button>
      </div>
    </form>
  </div>
</template>

<script>
import api from '@/api/api'

import CateGroup from '@/components/CateGroup'

export default {
  data() {
    return {
      plan: {}
    }
  },

  components: {
    CateGroup
  },

  methods: {
    onFormSubmit(e) {
      console.log('===onFormSubmit', e)
      const tag = e.mp.detail.target.id
      if (tag === '100') {
        this.plan.status = 1
        this.plan.statusName = '进行中'
      } else if (tag === '101') {
        this.plan.status = 2
        this.plan.statusName = '已完成'
      }

      const obj = e.mp.detail.value

      api.travel
        .updatePlan(this.plan._id, this.plan)
        .then(res => {
          console.log('===update res ===', res)
        })
        .catch(err => {
          console.log('===update err ===', err)
        })
    }
  },

  mounted() {
    this.plan = JSON.parse(this.$route.query.plan)
    console.log('=====plan=====', this.plan.todos)
  },

  created() {}
}
</script>

<style scoped>
</style>
