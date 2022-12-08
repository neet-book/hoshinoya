<template>
  <div class="hotel-booking">
    <div class="hotel-booking-bg">
      <div class="hotel-booking-container">
        <!-- 查询条件 -->
        <div class="hotel-booking-cond-container">
          <booking-cond
            :discount="discount"
            :condLimit="conditionLimit"
            @cond-change="onConditionChange"
          ></booking-cond>
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
import  BookingCond, { Discount, CondLimit, Condition } from './BookingCond'
import CalendarControl from "./CalendarControl.vue";
import Calendar from "./Calender/Calender.vue"
import { getCalenderVacancies } from "~/utils/network"

export interface HotelCondition {
  adult: number
  child: number
  infant: number
  stayNight: number,
  hotel: string
}

@Component({
  components: { CalendarControl, BookingCond, Calendar },
  async fetch() {
    const hotel = this.$store.state.hotelNameEn
    const detail = await getHotelDetail(hotel)

    const date = new Date()
    const vacancies = await getCalenderVacancies(
        hotel,
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        2,
        {}
    )
  }
})
export default class BookingHotel extends Vue {
  details
  condition: Condition = {
  }
  tab: string = this.$store.state.hotelNameEn
  currentDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1}
  vacancies = new Map

  discount: Discount = [
    {
      night: 1,
      off: '0%off'
    },
    {
      night: 2,
      off: '25%off'
    },
    {
      night: 3,
      off: '25%off'
    },
    {
      night: 4,
      off: '25%off'
    },
    {
      night: 5,
      off: '25%off'
    },
    {
      night: 6,
      off: '25-26%off'
    },
    {
      night: 7,
      off: '25-26%off'
    },
    {
      night: 8,
      off: '25-26%off'
    }
  ]

  conditionLimit: CondLimit = {
    // 成人数量限制
    adultNumDefault: 2,
    adultNumMax: 4,
    adultNumMin: 1,
    // 幼儿数量限制 0-3岁
    infantNumDefault: 0,
    infantNumMax: 4,
    infantNumMin: 0,
    // 婴儿数量限制 3-6岁
    babyNumDefault: 0,
    babyNumMax: 4,
    babyNumMin: 0,
    // 儿童数量限制 6岁以下
    childNumDefault: 0,
    childNumMin: 0,
    childNumMax: 4,
    // 时间
    hotelNightDefault: 2,
    hotelNightMin: 0,
    hotelNightMax: 7
  }

  vacancyStates =  [
    { date: '2022/11/28', vacancy: 30, closeDay: true, holiday: false, price: 20 },
    { date: '2022/11/2', vacancy: 1, closeDay: false, holiday: false, price: 20 },
    { date: '2022/11/3', vacancy: 0, closeDay: false, holiday: false, price: 20 },
    { date: '2022/11/4', vacancy: 30, closeDay: true, holiday: false, price: 20 },
    { date: '2022/11/5', vacancy: 30, closeDay: false, holiday: false, price: 20 },
  ]

  get condLimit() {

  }

  onConditionChange(condition: Condition) {
    this.condition = condition
  }

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