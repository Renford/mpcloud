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

      // api.travel
      //   .updatePlan(this.plan._id, this.plan)
      //   .then(res => {
      //     console.log('===update res ===', res)
      //   })
      //   .catch(err => {
      //     console.log('===update err ===', err)
      //   })
    }
  },

  mounted() {
    this.plan = JSON.parse(this.$route.query.plan)
    console.log('=====plan=====', this.plan.todos)
  },

  created() {}
}

const todos2dones = (obj, that) => {
  const todos = that.plan.todos
  const dones = that.plan.dones === [] ? todos : that.plan.dones
  const tempObj = {}
  todos.forEach(cate => {
    const indexs = obj[cate.Name]
    if (indexs.length > 0) {
      const array = indexs.map(index => {
        return cate.equips[parseInt(index)]
      })

      tempObj[cate.cateId] = array
    }
  })
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
