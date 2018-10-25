<script>
export default {
  created() {},

  onLaunch() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true
      })
    }
  }
}
</script>

<style>
@import url('./common/css/font.css');
@import url('./common/css/color.css');
@import url('./common/css/base.css');

page {
  background-color: #f8f8f8;
}
</style>
