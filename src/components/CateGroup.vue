<template>
  <div>
    <wux-checkbox-group :name="cate.cateId" :value="selectValues" :title="cate.cateName" @change="onChange">
      <div v-for="(equip, equipIndex) in cate.equips" :key="equipIndex">
        <div v-if="cellType === true">
          <wux-checkbox color="balanced" :title="equip" :value="equip"/>
        </div>
        <div v-else>
          <wux-checkbox color="balanced" :title="equip.name" :label="equip.remark" :value="equip.name"/>
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

  computed: {
    cellType() {
      const equip = this.cate.equips[0]
      return typeof equip === 'string'
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

  mounted() {
    const arr = this.selectObject[this.cate.cateId]
    console.log('=====mounted', this.cate, this.selectObject, arr)
    if (arr !== undefined && arr.length > 0) {
      this.selectValues = arr
    }
  },

  onShow() {
    const arr = this.selectObject[this.cate.cateId]
    console.log('=====onshow', this.cate, this.selectObject, arr)
    if (arr !== undefined && arr.length > 0) {
      this.selectValues = arr
    }
  },

  onUnload() {
    console.log('onUnload=============================================')
    this.selectValues = []
  }
}
</script>

<style>
</style>
