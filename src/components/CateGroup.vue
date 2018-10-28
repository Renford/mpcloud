<template>
  <div>
    <wux-checkbox-group :name="cate.cateName" :value="selectIndexs" :title="cate.cateName" @change="onChange">
      <div v-for="(equip, equipIndex) in cate.equips" :key="equipIndex">
        <wux-checkbox color="balanced" :title="equip.name" :label="equip.typeName" :value="equipIndex"/>
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

  mounted() {}
}
</script>

<style>
</style>
