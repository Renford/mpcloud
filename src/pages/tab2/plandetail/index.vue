<template>
  <div>
    <div v-for="(cate, cateIndex) in cates" :key="cateIndex">
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
export default {
  data() {
    return {
      plan: {}
    }
  },

  computed: {
    cates: {
      get: function() {
        if (Object.keys(this.plan).length === 0) {
          return []
        }

        if (parseInt(this.plan.status) === 0) {
          return this.plan.todos
        } else if (parseInt(this.plan.status) === 2) {
          return this.plan.dones
        } else {
          const obj = {}
          this.plan.todos.forEach(item => {
            obj[item.cateId] = item.equips
          })

          this.plan.dones.forEach(item => {
            if (item.equips.length > 0) {
              if (obj[item.cateId] === undefined) {
                obj[item.cateId] = item.equips
              } else {
                const equips = obj[item.cateId]
                obj[item.cateId] = [...equips, ...item.equips]
              }
            }
          })

          return Object.values(obj).map(equips => {
            return {
              cateId: equips[0].cateId,
              cateName: equips[0].cateName,
              equips: equips
            }
          })
        }
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
