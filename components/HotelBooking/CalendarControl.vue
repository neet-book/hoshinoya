<template>
  <div class="calendar-control">
    <!-- 日历符号说明 -->
    <div class="calendar-legend-container">
      <div class="calendar-legend calendar-legend-available">可预约</div>
      <div class="calendar-legend calendar-legend-few">剩很少</div>
      <div class="calendar-legend calendar-legend-full">满房</div>
      <div class="calendar-legend calendar-legend-closed">休馆</div>
    </div>
    <div class="calendar-ctl-container">
      <div class="ctl-plan-month">
        <select class="booking-select" >
          <option class="booking-select-option" value="none" selected>选择入住日期</option>
          <option
            class="booking-select-option"
            v-for="item in dateIterator()"
            :value="item.value"
            :key="item.value"
            @click.prevent="chose(item.value)"
          >{{ item.date }}</option>
        </select>

      </div>
      <div class="plan-nav">
        <button class="prev-month" @click="$emit('prev')"><</button>
        <button class="next-month" @click="$emit('next')">></button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'

interface PlanMonth{
  date: string
  value: number
}

@Component()
export default class CalendarControl extends Vue {
  month: number | 'none' = 'none'

  onChange()  {
    console.log(1)
  }

  chose(month: number) {
    this.$emit('change', month)
  }

  dateIterator():PlanMonth[] {
    const currentDate = new Date()
    const list = []
    let year = currentDate.getFullYear()
    let month = currentDate.getMonth() + 1
    for (let i = 1; i <= 15; i ++) {
      if (month > 12) {
        month = 1
        year += 1
      }

      list.push({ date: `${year}年${month}月`, value: i })
      month += 1
    }

    return list
  }
}
</script>

<style scoped>
.calendar-control {
  display: flex;
  justify-content: space-between;
}

.calendar-legend-container,
.calendar-ctl-container
{
  display: flex;
  align-items: center;
}

.calendar-legend {
  padding-left: 15px;
  margin-right: 16px;

  font-size: 15px;
  vertical-align: center;

  background-position: 0 center;
  background-repeat: no-repeat;
}

.calendar-legend-available {
   background-image: url("~/assets/svg/legend/available.svg");
}
.calendar-legend-few {
  background-image: url("~/assets/svg/legend/few.svg");
}
.calendar-legend-full {
  background-image: url("~/assets/svg/legend/full.svg");
}
.calendar-legend-closed {
background-image: url("~/assets/svg/legend/closed.svg");
}

.ctl-plan-month > select {
  height: 30px;
  width: 150px;
  padding-left: 17px;
  font-size: 16px;
}

.plan-nav {
  display: flex;
  padding-left: 20px;
}

.plan-nav > button {
  width: 30px;
  height: 30px;

  border: 1px solid #ccc;
  background-color: #f2f2f2;
  color: #0000;
}

.plan-nav > button::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 8px auto;
  background-image: url("~/assets/svg/select.svg");
}

.plan-nav > .prev-month{
  border-right: none;
}

.plan-nav > .prev-month::before {
  transform: rotate(90deg);
}

.plan-nav > .next-month::before {
  transform: rotate(-90deg);
}

.prev-month:hover,
.next-month:hover,
.ctl-plan-month > select:hover {
  background-color: #e6e6e6;
}
</style>