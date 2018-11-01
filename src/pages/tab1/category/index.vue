<template>
  <div>  
    <wux-grids>
      <div v-for="(item, index) in showCates" :key="index">
        <wux-grid :thumb="item.iconUrl" :label="item.cateName" @click="onItemTapEvent(item)"/>
      </div>
    </wux-grids>
  </div>
</template>

<script>
import api from '@/api/api'

import store from '@/store'
import { mapState, mapGetters, mapActions } from 'vuex'

const cates = [
  {
    cateId: 'dianzi',
    cateName: '电子',
    cateType: '0',
    equips: [
      '手机',
      '相机',
      '耳机',
      '自拍杆',
      '手机充电器',
      '相机充电器',
      '雨伞',
      '钱包',
      '钥匙',
      '剃须刀'
    ]
  },
  {
    cateId: 'xishu',
    cateName: '洗漱',
    cateType: '0',
    equips: [
      '牙刷',
      '牙膏',
      '毛巾',
      '洗发水',
      '沐浴露',
      '洗面奶',
      '面膜',
      '护肤水',
      '剃须刀'
    ]
  },
  {
    cateId: 'yiwu',
    cateName: '衣物',
    cateType: '0',
    equips: [
      '内衣',
      '睡衣',
      '外套',
      '袜子',
      '皮带',
      '短裤',
      '裤子',
      '太阳镜',
      '隐形眼镜',
      '耳塞',
      '眼罩'
    ]
  },
  {
    cateId: 'luying',
    cateName: '露营',
    cateType: '1',
    iconUrl:
      'cloud://mycloud-243c6f.8d35-mycloud-243c6f/categories/icon_camping.png',
    equips: [
      '地布',
      '铝箔垫',
      '防潮垫',
      '帐篷',
      '睡袋',
      '帐篷灯',
      '头灯',
      '手电筒'
    ]
  },
  {
    cateId: 'dengshan',
    cateName: '登山',
    cateType: '1',
    iconUrl:
      'cloud://mycloud-243c6f.8d35-mycloud-243c6f/categories/icon_mountain.png',
    equips: []
  },
  {
    cateId: 'sheying',
    cateName: '摄影',
    cateType: '1',
    iconUrl:
      'cloud://mycloud-243c6f.8d35-mycloud-243c6f/categories/icon_photo.png',
    equips: []
  },
  {
    cateId: 'tubu',
    cateName: '徒步',
    cateType: '1',
    iconUrl:
      'cloud://mycloud-243c6f.8d35-mycloud-243c6f/categories/icon_walk.png',
    equips: [
      '帽子',
      '速干衣',
      '速干裤',
      '袜子',
      '徒步鞋',
      '太阳镜',
      '防晒霜',
      '水杯',
      '指南针',
      '登山包',
      '水袋',
      '鞋套'
    ]
  },
  {
    cateId: 'qixing',
    cateName: '骑行',
    cateType: '1',
    iconUrl:
      'cloud://mycloud-243c6f.8d35-mycloud-243c6f/categories/icon_riding.png',
    equips: [
      '头盔',
      '骑行风镜',
      '骑行手套',
      '骑行服',
      '骑行裤',
      '备用内胎',
      '打气筒',
      '码表',
      '尾灯'
    ]
  },
  {
    cateId: 'youyong',
    cateName: '游泳',
    cateType: '1',
    iconUrl:
      'cloud://mycloud-243c6f.8d35-mycloud-243c6f/categories/icon_swimming.png',
    equips: ['泳装', '泳镜', '拖鞋']
  },
  {
    cateId: 'shatan',
    cateName: '沙滩',
    cateType: '1',
    iconUrl:
      'cloud://mycloud-243c6f.8d35-mycloud-243c6f/categories/icon_sandy.png',
    equips: ['帽子', '太阳镜', '沙滩泳衣', '沙滩裤', '沙滩巾', '拖鞋', '防晒霜']
  },
  {
    cateId: 'huaxue',
    cateName: '滑雪',
    cateType: '1',
    iconUrl:
      'cloud://mycloud-243c6f.8d35-mycloud-243c6f/categories/icon_skiing.png',
    equips: ['雪帽', '雪衣', '雪裤', '太阳镜', '防寒手套', '雪套']
  }
]

export default {
  data() {
    return {}
  },

  computed: {
    ...mapState('category', ['cates']),

    showCates: {
      get: function() {
        return this.cates.filter(cate => {
          const arr = ['dianzi', 'yiwu', 'xishu']
          return arr.indexOf(cate.cateId) === -1
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
          // cateName: item.cateName,
          type: 1
        }
      })
    }
  },

  mounted() {
    this.getCates()
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

