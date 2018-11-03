<template>
  <div>
    <form @submit="onFormSubmit">
      <div v-for="(cate, cateIndex) in sections" :key="cateIndex">
        <cate-group :cate="cate" :selectObject="selectObject"></cate-group>
      </div>
      
      <div class="bottom-button-container" v-if="equips.length > 0">
        <button class="form-button" formType="submit">{{nextButtonTitle}}</button>
      </div>
    </form>
  </div>
</template>

<script>
import CateGroup from '@/components/CateGroup'

import api from '@/api/api'
import appUtils from '@/common/utils/AppUtils'

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
    ...mapState('equip', ['equips']),

    sections: {
      get: function() {
        // 为了规避二次进入选中装备错误，暂时屏蔽已添加的装备
        let filters = []
        if (this.viewType === '0') {
          // const cates = this.plan.todos.concat(this.plan.dones)
          const cates = this.plan.dones
          cates.forEach(cate => {
            const names = cate.equips.map(equip => {
              return equip.name
            })
            filters = [...filters, ...names]
          })
        }

        const obj = {}
        this.equips
          .filter(equip => {
            return filters.indexOf(equip.name) === -1
          })
          .forEach(equip => {
            if (obj[equip.cateId] === undefined) {
              obj[equip.cateId] = [equip]
            } else {
              obj[equip.cateId] = [...obj[equip.cateId], equip]
            }
          })

        return getShowOrder(obj, this)
      }
    }
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
    ...mapActions('equip', ['getEquips']),

    onFormSubmit(e) {
      const array = obj2Array(e.mp.detail.value, this)
      console.log('======onFormSubmit', array)
      if (this.viewType === '0') {
        const plan = getRequestPlan(e.mp.detail.value, this.plan)
        updatePlan(array, plan, this)
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

  onLoad() {
    this.cateId = this.$route.query.cateId
    this.viewType = this.$route.query.type
    if (this.viewType === '0') {
      this.plan = JSON.parse(this.$route.query.plan)
      updateSelectObject(this)
    }

    this.getEquips(this.cateId)
  },

  // mounted() {
  //   console.log('===select mounted', this)
  //   this.cateId = this.$route.query.cateId
  //   this.viewType = this.$route.query.type
  //   if (this.viewType === '0') {
  //     this.plan = JSON.parse(this.$route.query.plan)
  //     updateSelectObject(this)
  //   }

  //   this.getCategories(this.cateId)
  // },

  // onShow() {
  //   console.log('===select onshow', this)
  //   this.cateId = this.$route.query.cateId
  //   this.viewType = this.$route.query.type
  //   if (this.viewType === '0') {
  //     this.plan = JSON.parse(this.$route.query.plan)
  //     updateSelectObject(this)
  //   }

  //   this.getCategories(this.cateId)
  // },

  onUnload() {
    // Object.assign(this.$data, this.$options.data())
    console.log('===select onUnload', this)
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

    let arr = []
    if (obj[cate.cateId] !== undefined) {
      arr = obj[cate.cateId]
    }
    obj[cate.cateId] = arr.concat(equips)
  })

  that.selectObject = obj
}

const obj2Array = (obj, that) => {
  let equips = []
  that.sections.forEach(cate => {
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

const getRequestPlan = (obj, plan) => {
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
      todos.push(val)
    })
  })

  const tempPlan = JSON.parse(JSON.stringify(plan))
  tempPlan.todos = todos
  tempPlan.dones = dones

  return tempPlan
}

const updatePlan = async (equips, plan, that) => {
  wx.showLoading({
    title: '数据更新中...'
  })

  const res = await api.travel.addEquips(1, equips)
  console.log('=====update plan', res, equips)
  api.travel
    .updatePlan(plan)
    .then(res => {
      wx.hideLoading()
      that.$router.back()
      // that.$router.push({ path: '/pages/tab1/home/main', reLaunch: true })
    })
    .catch(err => {
      wx.hideLoading()
      console.log('===update err ===', err)
    })
}

const getShowOrder = (obj, that) => {
  if (Object.keys(obj).length === 0) {
    return []
  }
  console.log('=========res=======', obj, that.equips)
  // const first = {
  //   cateId: that.cateId,
  //   cateName: obj[that.cateId][0].cateName,
  //   equips: obj[that.cateId]
  // }
  // const last = {
  //   cateId: 'qita',
  //   cateName: obj['qita'][0].cateName,
  //   equips: obj['qita']
  // }
  // delete obj[that.cateId]
  // delete obj['qita']

  const others = Object.keys(obj).map(id => {
    return {
      cateId: id,
      cateName: obj[id][0].cateName,
      equips: obj[id]
    }
  })

  return others

  // return [first, ...others, last]
}
</script>

<style scoped>
</style>
