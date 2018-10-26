<template>
  <div>
    <wux-checkbox-group :name="equipment.type" :value="selectIndexs" :title="equipment.typeName" @change="onChange">
      <div v-for="(equip, equipIndex) in equipment.equips" :key="equipIndex">
        <wux-checkbox color="balanced" :title="equip" :value="equipIndex"/>
      </div>
    </wux-checkbox-group>
  </div>
</template>

<script>
export default {
  props: {
    equipment: {
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
  }
}
</script>

<style>
</style>
