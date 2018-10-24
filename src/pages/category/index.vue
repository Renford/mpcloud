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

let cates = [
  {
    cateid: 'camping',
    name: '露营',
    icon:
      'cloud://mycloud-243c6f.8d35-mycloud-243c6f/categories/icon_camping.png'
  },
  {
    cateid: 'mountain',
    name: '登山',
    icon:
      'cloud://mycloud-243c6f.8d35-mycloud-243c6f/categories/icon_mountain.png'
  },
  {
    cateid: 'photo',
    name: '摄影',
    icon: 'cloud://mycloud-243c6f.8d35-mycloud-243c6f/categories/icon_photo.png'
  },
  {
    cateid: 'riding',
    name: '骑行',
    icon:
      'cloud://mycloud-243c6f.8d35-mycloud-243c6f/categories/icon_riding.png'
  },
  {
    cateid: 'sandy',
    name: '沙滩',
    icon: 'cloud://mycloud-243c6f.8d35-mycloud-243c6f/categories/icon_sandy.png'
  },
  {
    cateid: 'skiing',
    name: '滑雪',
    icon:
      'cloud://mycloud-243c6f.8d35-mycloud-243c6f/categories/icon_skiing.png'
  },
  {
    cateid: 'swimming',
    name: '游泳',
    icon:
      'cloud://mycloud-243c6f.8d35-mycloud-243c6f/categories/icon_swimming.png'
  },
  {
    cateid: 'walking',
    name: '徒步',
    icon: 'cloud://mycloud-243c6f.8d35-mycloud-243c6f/categories/icon_walk.png'
  }
]

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

