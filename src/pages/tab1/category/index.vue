<template>
  <div>  
    <wux-grids>
      <div v-for="(item, index) in showCates" :key="index">
        <wux-grid :thumb="item.iconUrl" :label="item.cateName" @click="onItemTapEvent(item)"/>
      </div>
    </wux-grids>
    
    <div class="bottom-button-container">
      <wux-button block type="balanced" @click="onBottomEvent">从我的装备选择</wux-button>
    </div>

  </div>
</template>

<script>
import api from '@/api/api'
import appUtils from '@/common/utils/AppUtils'
import cateUtils from '@/common/utils/CateUtils'

import store from '@/store'
import { mapState, mapGetters, mapActions } from 'vuex'

import cateData from './CateData'

export default {
  data() {
    return {}
  },

  computed: {
    ...mapState('category', ['cates']),

    showCates: {
      get: function() {
        return this.cates.filter(cate => {
          return cate.cateType === '1'
        })
      }
    }
  },

  components: {},

  methods: {
    ...mapActions('category', ['getCates']),

    onItemTapEvent(item) {
      this.$router.push({
        path: '/pages/tab1/select/main',
        query: {
          cateId: item.cateId,
          type: 1
        }
      })
    },

    onBottomEvent() {
      this.$router.push({
        path: '/pages/tab1/select/main',
        query: {
          type: 2
        }
      })
    }
  },

  mounted() {
    // cateData.init()
    if (cateUtils.cates.length === 0) {
      this.getCates()
    }
  },

  created() {}
}
</script>

<style scoped>
</style>

