<template>
  <div>
    <form @submit="onFormSubmit">
      <wux-checkbox-group name="a" :value="value" title="Default" @change="onChange">
        <wux-checkbox color="light" title="Light" value="1" />
        <wux-checkbox color="stable" title="Stable" value="2" />
        <wux-checkbox color="positive" title="Positive" value="3" />
        <wux-checkbox color="calm" title="Calm" value="4" />
        <wux-checkbox color="balanced" title="Balanced" value="5" />
        <wux-checkbox color="energized" title="Energized" value="6" />
        <wux-checkbox color="assertive" title="Assertive" value="7" />
        <wux-checkbox color="royal" title="Royal" value="8" />
        <wux-checkbox color="dark" title="Dark" value="9" />
      </wux-checkbox-group>
      <!-- <wux-button formType="submit"></wux-button> -->
      <wux-button block type="balanced" formType="submit">submit</wux-button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ['1', '2']
    }
  },

  components: {},

  methods: {
    onFormSubmit(info) {
      console.log('===onFormSubmit', info)
    },

    onChange(e) {
      console.log('===onChange', e)
    }
  },

  created() {}
}
</script>

<style scoped>
</style>
