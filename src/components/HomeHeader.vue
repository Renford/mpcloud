<template>
  <div class="header-container">
    <div class="C5 F1">{{plan.date}}</div>
    <div class="detail-container">
      <div class="C5 F4">{{plan.originating}}</div>
      <div class="detail-arrow C5">--></div>
      <div class="C5 F4">{{plan.destination}}</div>
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
  margin-top: 10rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
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
