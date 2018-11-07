<script>
import appUtils from '@/common/utils/AppUtils'
import cateUtils from '@/common/utils/CateUtils'

export default {
  created() {
    appUtils.getSystemInfo()
    appUtils.loadStorage()
    cateUtils.loadStorage()
  },

  onLaunch() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env: 'test-dad143',
        env: 'mycloud-243c6f',
        traceUser: true
      })
    }

    appUtils.getOpenId()
  }
}
</script>

<style>
@import url('./common/css/font.css');
@import url('./common/css/color.css');
@import url('./common/css/base.css');

page {
  background-color: #f2f3f4;
}
</style>
