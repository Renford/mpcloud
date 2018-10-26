<template>
  <div>
    <form @submit="onFormSubmit">
      <wux-checkbox-group name="a" :value="value" title="Default" @change="onChange">
        <wux-checkbox color="balanced" title="Light" value="1" />
        <wux-checkbox color="balanced" title="Stable" value="2" />
        <wux-checkbox color="balanced" title="Positive" value="3" />
        <wux-checkbox color="balanced" title="Calm" value="4" />
        <wux-checkbox color="balanced" title="Balanced" value="5" />
        <wux-checkbox color="balanced" title="Energized" value="6" />
        <wux-checkbox color="balanced" title="Assertive" value="7" />
        <wux-checkbox color="balanced" title="Royal" value="8" />
        <wux-checkbox color="balanced" title="Dark" value="9" />
      </wux-checkbox-group>
      
      <button class="form-button" formType="submit">提交</button>
    </form>
  </div>
</template>

<script>
import api from '@/api/api'

import store from '@/store'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      value: ['1', '2']
    }
  },

  computed: {
    ...mapState('equipment', ['equips'])
  },

  components: {},

  methods: {
    ...mapActions('equipment', ['getEquips']),

    onFormSubmit(info) {
      console.log('===onFormSubmit', info)
    },

    onChange(e) {
      console.log('===onChange', e)
    }
  },

  mounted() {
    this.getEquips('camping')
      .then(res => {
        console.log('res====', res)
      })
      .catch(err => {
        console.log('err====', err)
      })

    // datas.forEach(item => {
    //   api.travel
    //     .addEquip(item)
    //     .then(res => {
    //       console.log('add equip success=====', res)
    //     })
    //     .catch(err => {
    //       console.log('add equip error=====', err)
    //     })
    // })
  },

  created() {}
}
</script>

<style scoped>
</style>
