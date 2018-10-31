<template>
  <div>
    <wux-checkbox-group :name="cate.cateId" :value="selectIndexs" :title="cate.cateName" @change="onChange">
      <div v-for="(equip, equipIndex) in cate.equips" :key="equipIndex">
        <div v-if="cellType === true">
          <wux-checkbox color="balanced" :title="equip" :value="equipIndex"/>
        </div>
        <div v-else>
          <wux-checkbox color="balanced" :title="equip.name" :label="equip.remark" :value="equipIndex"/>
        </div>
      </div>
    </wux-checkbox-group>
  </div>
</template>

<script>
export default {
  props: {
    cate: {
      type: Object,
      default: {}
    }
  },

  data() {
    return {
      selectIndexs: []
    }
  },

  computed: {
    cellType() {
      const equip = this.cate.equips[0]
      return typeof equip === 'string'
    }
  },

  methods: {
    onChange(e) {
      const index = e.mp.detail.index + ''
      const array = this.selectIndexs
      if (array.indexOf(index) === -1) {
        this.selectIndexs = [...array, index]
      } else {
        this.selectIndexs = array.filter(n => n !== index)
      }
    }
  },

  onUnload() {
    this.selectIndexs = []
  }
}
</script>

<style>
</style>
