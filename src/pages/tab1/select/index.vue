<template>
  <div class="pack-container">

    <wux-toast id="wux-toast" />
    
    <div class="tips-container F5 C2 B8" v-if="viewType==='5'">
      <div>此为您好友的装备清单</div>
    </div>

    <form @submit="onFormSubmit">
      <div v-for="(cate, cateIndex) in sections" :key="cateIndex">
        <cate-group :cate="cate" :selectObject="selectObject"></cate-group>
      </div>

      <div class="bottom-fixed-container flex-row" :style="{height: bottomHeight+'px'}">
        <button id="100" class="button-next C5" plain formType="submit">{{nextButtonTitle}}</button>
        <div v-if="viewType==='5'">
          <button id="101" class="button-finish C5" plain formType="submit">暂不使用</button>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
import CateGroup from '@/components/CateGroup'
import { $wuxSelect, $wuxToast } from '../../../../static/wux/index'

import api from '@/api/api'
import appUtils from '@/common/utils/AppUtils'
import cateUtils from '@/common/utils/CateUtils'

import store from '@/store'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      viewType: '', // 1、创建——选择，2、创建——选择我的装备，3、添加——选择，4、添加——选择我的装备，5、分享
      cateId: '',
      nextButtonTitle: '确定',

      plan: {},
      selectObject: {}
    }
  },

  computed: {
    ...mapState('equip', ['equips']),
    ...mapState('plan', ['sharePlan']),

    bottomHeight: {
      get: function() {
        return appUtils.bottomHeight
      }
    },

    sections: {
      get: function() {
        // 过滤已装包的装备
        let filters = []
        if (this.viewType === '3' || this.viewType === '4') {
          if (this.plan.dones.length > 0) {
            filters = this.plan.dones.map(equip => {
              return equip.name
            })
          }
        }

        let equips = this.equips
        if (this.viewType === '5' && Object.keys(this.sharePlan).length > 0) {
          equips = [...this.sharePlan.todos, ...this.sharePlan.dones]
        }

        equips = equips.filter(equip => {
          return filters.indexOf(equip.name) === -1
        })

        return cateUtils.getSortCatesFromEquips(equips)
      }
    }
  },

  watch: {
    viewType(type) {
      if (type === '1' || type === '2') {
        wx.setNavigationBarTitle({ title: '选择装备(2/3)' })
        this.nextButtonTitle = '下一步'
      } else if (type === '3' || type === '4') {
        wx.setNavigationBarTitle({ title: '选择装备' })
        this.nextButtonTitle = '确定'
      } else if (type === '5') {
        wx.setNavigationBarTitle({ title: 'TA的装备清单' })
        this.nextButtonTitle = '使用TA的清单'
      }
    }
  },

  components: {
    CateGroup
  },

  methods: {
    ...mapActions('equip', ['getEquips', 'getMyEquips']),
    ...mapActions('plan', ['getSharePlan']),

    onFormSubmit(e) {
      console.log('======onFormSubmit', e)
      const tag = e.mp.detail.target.id

      if (tag === '100') {
        const array = obj2Array(e.mp.detail.value, this)
        if (array.length === 0) {
          $wuxToast().info({
            type: 'text',
            text: '出去玩总要带点装备吧!'
          })
          return
        }

        if (this.viewType === '3' || this.viewType === '4') {
          const plan = getRequestPlan(e.mp.detail.value, this.plan)
          updatePlan(array, plan, this)
        } else if (this.viewType === '1' || this.viewType === '2') {
          this.$router.push({
            path: '/pages/tab1/commit/main',
            query: {
              cateId: this.cateId,
              equips: JSON.stringify(array)
            }
          })
        } else if (this.viewType === '5') {
          this.$router.push({
            path: '/pages/tab1/commit/main',
            query: {
              cateId: this.cateId,
              equips: JSON.stringify(array)
            }
          })
        }
      } else if (tag === '101') {
        this.$router.back()
      }
    }
  },

  onLoad() {
    this.viewType = this.$route.query.type
    this.cateId = this.$route.query.cateId
    if (this.viewType === '3' || this.viewType === '4') {
      this.plan = JSON.parse(this.$route.query.plan)
      updateSelectObject(this.plan, this)
    }

    if (this.viewType === '2' || this.viewType === '4') {
      this.getMyEquips()
    } else if (this.viewType === '1' || this.viewType === '3') {
      this.getEquips(this.cateId)
    } else if (this.viewType === '5') {
      let that = this
      this.getSharePlan(appUtils.shareTempId).then(res => {
        updateSelectObject(that.sharePlan, that)
      })
    }
  },

  onUnload() {
    store.commit('equip/setEquips', [])
  }
}

const updateSelectObject = (plan, that) => {
  if (Object.keys(plan).length === 0) {
    return {}
  }

  const obj = {}
  plan.todos.forEach(equip => {
    if (obj[equip.cateId] === undefined) {
      obj[equip.cateId] = [equip.name]
    } else {
      obj[equip.cateId] = [...obj[equip.cateId], equip.name]
    }
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

  dones = plan.dones.map(equip => {
    return equip.name
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

  const res = await api.equip.addEquips(1, equips)
  api.plan
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
</script>

<style scoped>
.pack-container {
  padding: 0 0 180rpx 0;
}

.tips-container {
  height: 60rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.button-next {
  width: 100%;
  height: 120rpx;
  border: 0;
  color: white;
}

.button-finish {
  position: absolute;
  right: 0;
  width: 25%;
  height: 96rpx;
  border: 0;
  color: lightgray;
  font-size: 26rpx;
  justify-content: center;
  align-items: center;
  display: flex;
}
</style>
