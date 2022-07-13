<template>
  <div class="hotel-booking-bar" @click="openBooking">
    <div class="booking-bar-container">
      <div class="booking-date">
        <div>入住日</div>
        <div class="calendar"></div><div>{{ currentDate }}</div>
      </div>
      <div class="booking-button">客房预订</div>
      <div class="booking-bar-bestrate">最佳价格保证</div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'

enum WEEK { '日', '一', '二', '三', '四', '五', '六' }

/**
 * 酒店预定条
 */
@Component({})
export default class HotelBookingBar extends Vue {
  isOpen: boolean = false
  get currentDate() {
    const date = new Date(),
        month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth(),
        day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return `${date.getFullYear()} / ${month} / ${day}   (${WEEK[date.getDay()]})`
  }
  openBooking() {
    this.isOpen = !this.isOpen
  }
}
</script>

<style scoped>
.booking-bar-container {
  box-sizing: border-box;
  width: 680px;
  height: 80px;
  padding: 18px 18px 0 18px;
  background-color: #e6e6e6;
  border-radius: 4px;
  margin: auto;

  display: flex;
  flex-wrap: nowrap;
}
.booking-date > div {
  float: left;
}

.booking-date {
  box-sizing: border-box;
  width: 320px;
  height: 46px;
  border: 1px solid rgb(199, 199, 199);
  border-radius: 2px;
  background-color: white;
  box-shadow: inset 0 1px 3px 0 rgb(4 0 0 / 20%);
  flex-shrink: 0;
}

.booking-date > div {
  height: 100%;
  line-height: 46px;
}

/* 入住日部分 */
.booking-date div:nth-child(1) {
  position: relative;
  width: 60px;
  font-size: 11px;
  letter-spacing: 4px;
  text-align: center;
}

.booking-date div:nth-child(1)::after {
  content: '';
  position: absolute;
  right: 0;
  width: 1px;
  top: 10px;
  bottom: 10px;
  background-color: #c7c7c7;
}
/* 日期部分 */
.booking-date div:nth-child(3) {
  margin-left: 10px;
  font-size: 19px;
  letter-spacing: .5px;
}

.booking-date > .calendar {
  margin-left: 10px;
}

.calendar {
  display: inline-block;
  width: 13px;
  height: 100%;
  background-image: url("~assets/svg/calendar-black.svg");

  background-position: center center;
  background-repeat: no-repeat;
}

.booking-button {
  box-sizing: border-box;
  width: 120px;
  height: 46px;
  margin-left: 8px;
  border-radius: 2px;

  background-color: rgb(102, 102, 102);

  font-size: 18px;
  letter-spacing: 1.5px;
  color: white;
  text-align: center;
  line-height: 46px;

  flex-shrink: 0;
}

.booking-button:hover {
  background-color: #444;
}

.booking-bar-bestrate {
  width: 100%;
  line-height: 46px;
  font-size: 15px;
  text-align: center;
  flex-shrink: 1;
}

@media screen and (max-width: 900px) {

}
</style>