<template>
  <div>
    <form @submit="onFormSubmit">
      <div v-for="(cate, cateIndex) in categories" :key="cateIndex">
        <cate-group :cate="cate" :selectObject="selectObject"></cate-group>
      </div>
      
      <div class="bottom-button-container" v-if="categories.length > 0">
        <button class="form-button" formType="submit">{{nextButtonTitle}}</button>
      </div>
    </form>
  </div>
</template>

<script>
import CateGroup from '@/components/CateGroup'

import api from '@/api/api'

import store from '@/store'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      viewType: '', // 0、添加，1、创建
      cateId: '',
      nextButtonTitle: '确定',

      plan: {},
      selectObject: {}
    }
  },

  computed: {
    ...mapState('category', ['categories'])
  },

  watch: {
    viewType(type) {
      if (type === '0') {
        wx.setNavigationBarTitle({ title: '选择装备' })
        this.nextButtonTitle = '确定'
      } else if (type === '1') {
        wx.setNavigationBarTitle({ title: '选择装备(2/3)' })
        this.nextButtonTitle = '下一步'
      }
    }
  },

  components: {
    CateGroup
  },

  methods: {
    ...mapActions('category', ['getCategories']),

    onFormSubmit(e) {
      const array = obj2Array(e.mp.detail.value, this)
      if (this.viewType === '0') {
        handlePlan(e.mp.detail.value, this)
        updatePlan(this)
      } else if (this.viewType === '1') {
        this.$router.push({
          path: '/pages/tab1/commit/main',
          query: {
            cateId: this.cateId,
            equips: JSON.stringify(array)
          }
        })
      }
    }
  },

  mounted() {
    this.cateId = this.$route.query.cateId
    this.viewType = this.$route.query.type
    if (this.viewType === '0') {
      this.plan = JSON.parse(this.$route.query.plan)
      updateSelectObject(this)
    }

    this.getCategories(this.cateId)
  }
}

const updateSelectObject = that => {
  if (Object.keys(that.plan).length === 0) {
    return {}
  }

  const obj = {}
  that.plan.todos.forEach(cate => {
    if (typeof cate === 'string') {
      return cate
    }
    const equips = cate.equips.map(equip => {
      return equip.name
    })
    obj[cate.cateId] = equips
  })

  that.plan.dones.forEach(cate => {
    if (typeof cate === 'string') {
      return cate
    }
    const equips = cate.equips.map(equip => {
      return equip.name
    })
    obj[cate.cateId] = obj[cate.cateId].concat(equips)
  })

  that.selectObject = obj
}

const obj2Array = (obj, that) => {
  let equips = []
  that.categories.forEach(cate => {
    const names = obj[cate.cateId]
    names.forEach(name => {
      equips.push({
        name: name,
        number: 1,
        status: 1, // 0, 虚购买，1、已拥有
        remark: '', // 备注
        cateId: cate.cateId,
        cateName: cate.cateName
      })
    })
  })

  return equips
}

const handlePlan = (obj, that) => {
  const plan = that.plan

  let todos = []
  let dones = []

  plan.dones.forEach(cate => {
    const arr = cate.equips.map(equip => {
      return equip.name
    })
    dones = dones.concat(arr)
  })

  Object.values(obj).forEach(arr => {
    arr.forEach(val => {
      if (dones.indexOf(val) === -1) {
        todos.push(val)
      }
    })
  })

  plan.todos = todos
  plan.dones = dones

  that.plan = plan
}

const updatePlan = that => {
  api.travel
    .updatePlan(that.plan._id, that.plan)
    .then(res => {
      that.$router.back()
      // that.$router.push({ path: '/pages/tab1/home/main', reLaunch: true })
    })
    .catch(err => {
      console.log('===update err ===', err)
    })
}
</script>

<style scoped>
</style>
