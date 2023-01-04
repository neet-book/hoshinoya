<template>
  <div class="hotel-booking">
    <div class="hotel-booking-bg">
      <div class="hotel-booking-container">
        <!-- 查询条件 -->
        <div class="hotel-booking-cond-container">
          <booking-cond
            :discount="discount"
            :limit="conditionLimit"
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
            <calendar :date="'2023/01/03'" :vacancies="getVacancy('2023/01/03')"></calendar>
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
import  BookingCond, { Discount, CondLimit, HotelSearchCondition } from './BookingCond'
import CalendarControl from "./CalendarControl.vue";
import Calendar, {VacancyState} from "./Calender/Calender.vue"
import MessageBox from '/components/common/MessageBox.vue'
import { getCalenderVacancies, getHotelDetails, HotelDetail } from "~/utils/network"


function createVacancyKey (date, stayNight, customer) {
  return [date, stayNight, customer.adult, customer.child, customer.infant, customer.baby].join('+')
}

@Component({
  components: { CalendarControl, BookingCond, Calendar, MessageBox },
  async fetch() {
    const hotel = this.$route.params.hotel_name
    const detail: HotelDetail | null = await getHotelDetails(hotel)
      .catch(err => {
        console.error(err)
        return null
      })

    if (detail !== null) {
      this.details.set(hotel, detail)
      this.conditionLimit = detail.searchCondition
      this.discount = detail.discount
      const date = new Date()
      const searchDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      this.condition = {
        adult: detail.searchCondition.adultNumDefault,
        child: detail.searchCondition.childNumDefault,
        infant: detail.searchCondition.infantNumDefault,
        baby: detail.searchCondition.babyNumDefault,
        stayNight: detail.searchCondition.hotelNightDefault
      }
      const vacancies = await getCalenderVacancies(
          detail.hotelId,
          searchDate,
          this.condition
      )
        .catch(e => {
          console.error(e)
          return []
        })

      if (vacancies) {
        const vacancyKey = createVacancyKey(
      `${date.getFullYear()}-${date.getMonth() + 1}`,
          this.condition.stayNight,
      {
          adult: this.condition.adult,
          child: this.condition.child,
          baby: this.condition.baby,
          infant: this.condition.infant
        })

        this.vacancies.set(vacancyKey, vacancies)
      }
    }
  }
})
export default class BookingHotel extends Vue {
  details = new Map<string, HotelDetail>()
  condition: HotelSearchCondition = null
  tab: string = this.$store.state.hotelNameEn
  currentDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1}
  vacancies = new Map
  discount: Discount[] = []
  conditionLimit: CondLimit = null


  onConditionChange(condition) {
    this.condition = Object.assign({}, condition.condition)
    this.$message.confirm(condition.hotel)
  }

  onMonthChange() {

  }
  nextMonth() {

  }
  prevMonth() {

  }

  getVacancy(dateStr: string) {
    if (this.condition) {
      const date = new Date(dateStr)
      const key = createVacancyKey(
          `${date.getFullYear()}-${date.getMonth() + 1}`,
          this.condition.stayNight,
          {
            adult: this.condition.adult,
            child: this.condition.child,
            baby: this.condition.baby,
            infant: this.condition.infant
          })
      return this.vacancies.get(key)
    }
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