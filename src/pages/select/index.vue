<template>
  <div>
    <form @submit="onFormSubmit">
      <div v-for="(cate, cateIndex) in categories" :key="cateIndex">
        <equipment-group :equipment="cate"></equipment-group>
      </div>
      
      <button class="form-button" formType="submit">提交</button>
    </form>
  </div>
</template>

<script>
import EquipmentGroup from '@/components/EquipmentGroup'

import api from '@/api/api'

import store from '@/store'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      selectIndexs: {}
    }
  },

  computed: {
    ...mapState('equipment', ['categories'])
  },

  components: {
    EquipmentGroup
  },

  methods: {
    ...mapActions('equipment', ['getEquips']),

    onFormSubmit(info) {
      console.log('===onFormSubmit', info)
    }
  },

  mounted() {
    this.getEquips('')
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
