<template>
  <div class="header-container">
    <div class="detail-container">
      <div class="originating-container">
        <div class="C5 F1">{{plan.originating}}</div>
      </div>
      <div class="arrow-container">
        <div class="C5">--></div>
      </div>
      <div class="destination-container">
        <div class="C5 F1">{{plan.destination}}</div>
      </div>
    </div>
    <div class="C5 F4">{{plan.date}}</div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 160rpx;
}

.detail-container {
  margin: 5rpx 0 20rpx 0;
  padding: 0 20rpx;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.originating-container {
  width: 300rpx;
  display: flex;
  flex-direction: row-reverse;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.arrow-container {
  width: 90rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.destination-container {
  width: 300rpx;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
