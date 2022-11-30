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
          <calendar-control @change="onMonthChange" @next="nextMonth" @prev="prevMonth"></calendar-control>
        </div>
        <!-- 日历 -->
        <div class="hotel-booking-calender-container" >
          <div class="hotel-booking-calender-inner">
            <calendar :date="'2022/11/1'" :vacancies="vacancyStates"></calendar>
          </div>
        </div>
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
import Calendar from "./Calender/Calender.vue"

export interface HotelCondition {
  adult: number
  child: number
  infant: number
  stayNight: number,
  hotel: string
}

@Component({
  components: { CalendarControl, BookingCond, Calendar }

})
export default class BookingHotel extends Vue {
  condition: {
  }
  tab: string = this.$store.state.hotelNameEn
  currentDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1}
  vacancies = new Map

  vacancyStates =  [
    { date: '2022/11/28', vacancy: 30, closeDay: true, holiday: false, price: 20 },
    { date: '2022/11/2', vacancy: 1, closeDay: false, holiday: false, price: 20 },
    { date: '2022/11/3', vacancy: 0, closeDay: false, holiday: false, price: 20 },
    { date: '2022/11/4', vacancy: 30, closeDay: true, holiday: false, price: 20 },
    { date: '2022/11/5', vacancy: 30, closeDay: false, holiday: false, price: 20 },
  ]

  onMonthChange() {

  }
  nextMonth() {

  }
  prevMonth() {

  }
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

.hotel-booking-calender-inner {
  max-width: 28.9rem;
}
</style>