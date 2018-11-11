<template>
  <div>
    <div v-for="(cate, cateIndex) in sortCates" :key="cateIndex">
      <div v-if="cate.equips.length > 0">
        <wux-cell-group :title="cate.cateName">
          <div v-for="(equip, equipIndex) in cate.equips" :key="equipIndex">
            <wux-cell :title="equip.name" :label="equip.remark"></wux-cell>
          </div>
        </wux-cell-group>
      </div>
    </div>

    <div v-if="plan.status === 2">
      <div class="bottom-fixed-container flex-row" :style="{height: bottomHeight+'px'}">
        <button id="100" class="button-next C5" plain @click="onTempsEvent">保存为模板</button>
      </div>
    </div>
    
  </div>
</template>

<script>
import appUtils from '@/common/utils/AppUtils'
import cateUtils from '@/common/utils/CateUtils'

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
    },

    sortCates: {
      get: function() {
        if (Object.keys(this.plan).length === 0) {
          return []
        }

        const equips = [...this.plan.todos, ...this.plan.dones]
        return cateUtils.getSortCatesFromEquips(equips)
      }
    }
  },

  components: {},

  methods: {
    onTempsEvent(e) {
      const equips = this.plan.dones.map(equip => {
        return equip.name
      })
      const equisStr = JSON.stringify(equips)
      this.$router.push({
        path: '/pages/tab2/tempadd/main',
        query: {
          equips: equisStr
        }
      })
    }
  },

  mounted() {
    this.plan = JSON.parse(this.$route.query.plan)
    wx.setNavigationBarTitle({ title: this.plan.title })
    console.log('=== plan detail:', this.plan)
  }
}
</script>

<style scoped>
.button-next {
  width: 100%;
  height: 120rpx;
  border: 0;
  color: white;
}
</style>
