<template>
  <div>

    <wux-toast id="wux-toast" />

    <wux-cell-group title="标题（必填）">
      <wux-cell hover-class="none">
        <wux-input placeholder="留个标题吧" controlled :value="title" @change="onTitleChange"></wux-input>
      </wux-cell>  
    </wux-cell-group>    

    <wux-cell-group title="简介（可选）">
      <wux-cell hover-class="none">
        <wux-textarea rows="3" placeholder="留不留简介，看你心情啦" controlled :value="desp" @change="onDespChange"/>
      </wux-cell>
    </wux-cell-group>

    <div class="bottom-button-container">
      <wux-button block type="balanced" @click="onSubmitEvent">提交</wux-button>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'

import { $wuxToast } from '../../../../static/wux/index'
export default {
  data() {
    return {
      title: '',
      desp: '',
      equips: ''
    }
  },

  components: {},

  methods: {
    onTitleChange(e) {
      this.title = e.mp.detail.value
    },

    onDespChange(e) {
      this.desp = e.mp.detail.value
    },

    onSubmitEvent(e) {
      if (this.title.length === 0) {
        $wuxToast().info({
          type: 'text',
          text: '标题不能为空'
        })
        return
      }
      const temp = {
        title: this.title,
        desp: this.desp,
        equips: this.equips
      }

      const that = this
      api.temp
        .addTemp(temp)
        .then(res => {
          that.$router.back()
        })
        .catch(err => {
          console.log('===err', err)
        })
    }
  },
  mounted() {
    this.equips = JSON.parse(this.$route.query.equips)
    console.log('====equips', this.equips)
  }
}
</script>

<style scoped>
</style>
