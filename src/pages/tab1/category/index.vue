<template>
  <div>  
    <wux-grids>
      <div v-for="(item, index) in categories" :key="index">
        <wux-grid :thumb="item.iconUrl" :label="item.cateName" @click="onItemTapEvent(item)"/>
      </div>
    </wux-grids>
  </div>
</template>

<script>
import api from '@/api/api'

import store from '@/store'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {}
  },

  computed: {
    ...mapState('category', ['categories'])
  },

  components: {},

  methods: {
    ...mapActions('category', ['getCategories']),

    onItemTapEvent(item) {
      this.$router.push({
        path: '/pages/tab1/select/main',
        query: {
          cateId: item.cateId,
          cateName: item.cateName
        }
      })
    }
  },

  mounted() {
    this.getCategories()
    // cates.forEach(item => {
    //   api.travel
    //     .addCategory(item)
    //     .then(res => {
    //       console.log('add====', res)
    //     })
    //     .catch(err => {
    //       console.log('add====err', err)
    //     })
    // })
  },

  created() {}
}
</script>

<style scoped>
</style>

