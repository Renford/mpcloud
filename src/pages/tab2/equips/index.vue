<template>
  <div>

    <div v-for="(cate, cateIndex) in sections" :key="cateIndex">
      <wux-cell-group :title="cate.cateName">
        <div v-for="(equip, equipIndex) in cate.equips" :key="equipIndex">
          <wux-cell :title="equip.name" is-link :label="equip.remark" @click="onItemEvent(equip)"></wux-cell>
        </div>
        <wux-cell hover-class="none">
          <wux-input :id="cateIndex" placeholder="添加新装备" clear placeholder-class="C1 F1" @confirm="onConfirm">
            <image style="width: 20px; height: 20px; margin-right: 5px" src="/static/icon_add.png" />
          </wux-input>
        </wux-cell>
      </wux-cell-group>
    </div>

    <!-- <div class="bottom-button-container">
      <wux-button block type="balanced" @click="onAddEvent">添加装备</wux-button>
    </div> -->
  </div>
</template>

<script>
import store from '@/store'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {}
  },

  computed: {
    ...mapState('equip', ['equips']),

    sections: {
      get: function() {
        const obj = {}
        this.equips.forEach(equip => {
          if (obj[equip.cateId] === undefined) {
            obj[equip.cateId] = [equip]
          } else {
            obj[equip.cateId] = [...obj[equip.cateId], equip]
          }
        })

        return Object.keys(obj).map(id => {
          return {
            cateId: id,
            cateName: obj[id][0].cateName,
            equips: obj[id]
          }
        })
      }
    }
  },

  components: {},

  methods: {
    ...mapActions('equip', ['getMyEquips', 'addMyEquips']),

    onItemEvent(equip) {
      const equipStr = JSON.stringify(equip)
      this.$router.push({
        path: '/pages/tab2/equipedit/main',
        query: {
          equip: equipStr
        }
      })
    },

    onConfirm(e) {
      console.log('===onConfirm', e)
      const name = e.mp.detail.value
      const index = parseInt(e.mp.target.id)
      const cate = this.sections[index]
      const equip = {
        name: name,
        number: 1,
        status: 1, // 0, 虚购买，1、已拥有
        remark: '', // 备注
        cateId: cate.cateId,
        cateName: cate.cateName
      }

      store.dispatch('equip/addMyEquips', [equip]).then(res => {
        store.dispatch('equip/getMyEquips')
      })
    }

    // onAddEvent(e) {
    //   this.$router.push({
    //     path: '/pages/tab2/equipedit/main'
    //   })
    // }
  },

  onShow() {
    this.getMyEquips()
  },

  mounted() {}
}
</script>

<style scoped>
</style>
