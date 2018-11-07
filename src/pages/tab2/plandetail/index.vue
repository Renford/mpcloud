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
  </div>
</template>

<script>
import cateUtils from '@/common/utils/CateUtils'
export default {
  data() {
    return {
      plan: {}
    }
  },

  computed: {
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

  methods: {},

  mounted() {
    this.plan = JSON.parse(this.$route.query.plan)
    wx.setNavigationBarTitle({ title: this.plan.title })
    console.log('=== plan detail:', this.plan)
  }
}
</script>

<style scoped>
</style>
