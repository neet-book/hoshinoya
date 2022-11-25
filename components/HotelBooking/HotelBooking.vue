<template>
  <div class="hotel-booking">
    <div class="hotel-booking-bg">
      <div class="hotel-booking-container">
        <!-- 查询条件 -->
        <div class="hotel-booking-cond-container">
          <booking-cond ></booking-cond>
        </div>

        <!-- 旅店入住日期选择控制 -->
        <div class="calendar-ctl">
          <calendar-control></calendar-control>
        </div>
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
import  BookingCond from './BookingCond'
import CalendarControl from "./CalendarControl.vue";

export interface HotelCondition {
  adult: number
  child: number
  infant: number
  stayNight: number,
  hotel: string
}

@Component({
  components: { CalendarControl, BookingCond }
})
export default class BookingHotel extends Vue {
  condition: {
  }
  tab: string = this.$store.state.hotelNameEn
}
</script>

<style scoped>
.hotel-booking {
  width: 100vw;
  height: 100vh;
  position: fixed;

  font-family: "Helvetica Neue LT W01_55 Roman", hsn-zhcn-sans-demilight, hsn-zhtw-sans-demilight, sans-serif;

  z-index: 300;
}

.hotel-booking-bg {
  height: 100%;
  width: 100%;
  background-color: #fff;
}

.hotel-booking-container {
  max-width: 950px;
  padding-top: 50px;
  margin: auto;
}

.calendar-ctl {
  margin-top: 30px;
}
</style>