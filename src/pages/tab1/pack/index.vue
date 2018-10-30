<template>
  <div class="pack-container">
    <form @submit="onFormSubmit">
      <div v-for="(cate, cateIndex) in plan.todos" :key="cateIndex">
        <cate-group :cate="cate"></cate-group>
      </div>
      
      <div class="bottom-fixed-container flex-row" :style="{height: bottomHeight+'px'}">
        <button id="100" class="button-next C5" plain formType="submit">下次继续</button>
        <button id="101" class="button-finish C5" plain formType="submit">完成</button>
      </div>
    </form>
  </div>
</template>

<script>
import api from '@/api/api'
import appUtils from '@/common/utils/AppUtils'

import CateGroup from '@/components/CateGroup'

export default {
  data() {
    return {
      plan: {}
    }
  },

  computed: {
    bottomHeight: {
      get: function() {
        return appUtils.bottomHeight
      }
    }
  },

  components: {
    CateGroup
  },

  methods: {
    onFormSubmit(e) {
      let type = 0
      const obj = e.mp.detail.value
      const tag = e.mp.detail.target.id
      if (tag === '100') {
        type = 1
      } else if (tag === '101') {
        type = 2
      }

      todos2dones(obj, type, this)
      updatePlan(obj, this)
    }
  },

  mounted() {
    this.plan = JSON.parse(this.$route.query.plan)
    console.log('=====plan=====', this.plan)
  },

  created() {}
}

const updatePlan = (obj, that) => {
  api.travel
    .updatePlan(that.plan._id, that.plan)
    .then(res => {
      that.$router.back()
    })
    .catch(err => {
      console.log('===update err ===', err)
    })
}

const todos2dones = (obj, type, that) => {
  const plan = that.plan

  let todos = []
  let dones = []
  let selects = []

  plan.todos.forEach(cate => {
    const arr = cate.equips.map(equip => {
      return equip.name
    })
    todos = todos.concat(arr)

    const indexs = obj[cate.cateName]
    if (indexs.length > 0) {
      const arr = indexs.map(index => {
        return cate.equips[parseInt(index)].name
      })
      selects = selects.concat(arr)
    }
  })

  plan.dones.forEach(cate => {
    const arr = cate.equips.map(equip => {
      return equip.name
    })
    dones = dones.concat(arr)
  })

  if (type === 1) {
    plan.status = 1
    plan.statusName = '进行中'
    selects.forEach(name => {
      dones.push(name)
      todos.splice(todos.indexOf(name), 1)
    })
    plan.todos = todos
    plan.dones = dones
  } else if (type === 2) {
    plan.status = 2
    plan.statusName = '已完成'
    plan.todos = []
    plan.dones = dones.concat(todos)
  }

  that.plan = plan
}
</script>

<style scoped>
.pack-container {
  padding: 0 0 180rpx 0;
}

.button-next {
  width: 75%;
  height: 120rpx;
  border: 0;
  color: white;
}

.button-finish {
  width: 25%;
  height: 96rpx;
  border: 0;
  color: white;
}
</style>
