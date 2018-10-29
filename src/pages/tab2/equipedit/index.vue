<template>
  <div>
    <wux-cell-group>
      <wux-cell hover-class="none">
        <wux-input label="名称" placeholder="这里是装备名称" />
      </wux-cell>
      <wux-cell hover-class="none">
        <wux-input label="型号" placeholder="这里是具体型号"/>
      </wux-cell>
      <wux-cell title="数量" hover-class="none">
        <wux-input-number shape="circle" color="balanced" slot="footer" />
      </wux-cell>
      <wux-cell title="类型" is-link extra="说明文字" @click="onShowPicker"/>
    </wux-cell-group>

    <div class="bottom-button-container">
      <wux-button block type="balanced" @click="onSubmitEvent">提交</wux-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      equip: {}
    }
  },

  components: {},

  methods: {
    onShowPicker(e) {
      console.log('=====onShowPicker')
    }
  },

  created() {}
}
</script>

<style scoped>
</style>
