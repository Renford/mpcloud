<template>
  <div>
    <wux-checkbox-group :name="cate.cateId" :value="selectValues" :title="cate.cateName" @change="onChange">
      <div v-for="(equip, equipIndex) in cate.equips" :key="equipIndex">
        <wux-checkbox color="balanced" :title="equip.name" :label="equip.remark" :value="equip.name"/>
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
    },

    selectObject: {
      type: Object,
      default: {}
    }
  },

  data() {
    return {
      selectValues: []
    }
  },

  watch: {
    selectObject(obj) {
      let arr = this.selectObject[this.cate.cateId]
      if (arr === undefined) {
        arr = []
      }
      this.selectValues = arr
    }
  },

  methods: {
    onChange(e) {
      const value = e.mp.detail.value
      const array = this.selectValues
      if (array.indexOf(value) === -1) {
        this.selectValues = [...array, value]
      } else {
        this.selectValues = array.filter(val => val !== value)
      }
    }
  },

  onLoad() {
    Object.assign(this.$data, this.$options.data())
    const arr = this.selectObject[this.cate.cateId]
    if (arr !== undefined && arr.length > 0) {
      this.selectValues = arr
    }
  },

  onUnload() {
    Object.assign(this.$data, this.$options.data())
    this.selectValues = []
  }
}
</script>

<style>
</style>
