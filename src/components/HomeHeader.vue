<template>
  <div class="header-container B8">
    <div class="C1 F2">2018-08-08</div>
    <div class="detail-container">
      <div class="C2 F4">{{plan.origin}}</div>
      <div class="detail-arrow">--></div>
      <div class="C2 F4">{{plan.destination}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    plan: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style scoped>
.header-container {
  /* padding: 30rpx; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 160rpx;
}

.detail-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.detail-arrow {
  margin: 5rpx 30rpx;
}
</style>
