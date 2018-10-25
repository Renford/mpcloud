<template>
  <div>  
    <!-- <wux-button block type="balanced" open-type="getUserInfo" @getuserinfo="onGetUserInfo">userInfo</wux-button> -->
    <wux-grids>
      <div v-for="(item, index) in categories" :key="index">
        <wux-grid :thumb="item.icon" :label="item.name" @click="onItemTapEvent(item)"/>
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

    onGetUserInfo(info) {
      console.log('===onGetUserInfo', info)
    },

    onItemTapEvent(item) {
      console.log('=====onItemTapEvent', item)
      this.$router.push({
        path: '/pages/select/main'
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

