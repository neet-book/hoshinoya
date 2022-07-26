<template>
  <div class="hotel-booking">
    <div class="hotel-booking-bg">
      <div class="hotel-booking-container">
        <div class="hotel-booking-cond-container">

        </div>
        <!-- 日历符号说明 -->
        <div class="legend"></div>
        <!-- 旅店入住日期选择控制 -->
        <div class="penHotel-ctl"></div>
        <!-- 日历 -->
        <div class="hotel-booking-calendar-container" ></div>

        <!-- 货币 -->
        <div class="hotel-booking-currency"></div>
        <!-- 最佳出价 -->
        <div class="bes-trait"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'

@Component
export default class BookingHotel extends Vue {

}
</script>

<style scoped>
.hotel-booking {
  width: 100vw;
  height: 100vh;
  position: fixed;

  z-index: 100;
}

.hotel-booking-bg {
  height: 100%;
  width: 100%;
  background-color: #fff;
}

.hotel-booking-container {
  max-width: 950px;

}
</style>