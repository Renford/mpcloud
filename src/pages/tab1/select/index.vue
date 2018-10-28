<template>
  <div>
    <form @submit="onFormSubmit">
      <div v-for="(cate, cateIndex) in categories" :key="cateIndex">
        <equipment-group :equipment="cate"></equipment-group>
      </div>
      
      <div class="bottom-button-container">
        <button class="form-button" formType="submit">下一步</button>
      </div>
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
      cateId: '',
      cateName: '',
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
    ...mapActions('equipment', ['getCategories']),

    onFormSubmit(e) {
      console.log('===onFormSubmit', e.mp.detail.value, this.categories)
      const array = obj2Array(e.mp.detail.value, this)
      console.log('===onFormSubmit', array)
      this.$router.push({
        path: '/pages/tab1/commit/main',
        query: {
          equips: JSON.stringify(array)
        }
      })
    }
  },

  mounted() {
    this.cateId = this.$route.query.cateId
    this.cateName = this.$route.query.cateId
    this.getCategories(this.cateId)

    // equips.forEach(item => {
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

const obj2Array = (obj, that) => {
  // const arr = [that.cateId, 'xishu', 'yiwu', 'dianzi']

  let equips = []
  that.categories.forEach(cate => {
    const selIndexs = obj[cate.cateId]
    selIndexs.forEach(index => {
      equips.push({
        name: cate.equips[parseInt(index)],
        type: '',
        number: 1,
        status: false,
        cateId: cate.cateId,
        cateName: cate.cateName
      })
    })
  })

  return equips
}
</script>

<style scoped>
</style>