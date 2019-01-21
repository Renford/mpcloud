<script>
import appUtils from "@/common/utils/AppUtils";
import cateUtils from "@/common/utils/CateUtils";

export default {
  created() {
    appUtils.getSystemInfo();
    appUtils.loadStorage();
    cateUtils.loadStorage();
  },

  onLaunch(ops) {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        // env: 'test-dad143',
        env: "mycloud-243c6f",
        traceUser: true
      });
    }

    console.log("=========app ops", ops);
    if (ops.query.tempId !== undefined && ops.query.tempId.length !== 0) {
      appUtils.shareTempId = ops.query.tempId;
      appUtils.shareUserName = ops.query.userName;
    }

    appUtils.getOpenId();
  },

  onShow() {
    appUtils.checkVersionUpdate();
  }
};
</script>

<style>
@import url("./common/css/font.css");
@import url("./common/css/color.css");
@import url("./common/css/base.css");

page {
  background-color: #f2f3f4;
}
</style>
