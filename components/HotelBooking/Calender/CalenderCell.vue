<template>
  <div class="calender-cell">
    <div class="calender-cell-container" v-if="vacancy !== undefined"
      :class="{ available, closed, few, full, active }"
    >
      <div class="cell-inner">
        <div class="calender-day">{{ day }}</div>
        <div class="cell-price" v-if="available || few">
          <span >￥</span>
          <span>{{price}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue, Prop} from 'nuxt-property-decorator'
import {VacancyState} from "./Calender.vue";

@Component()
export default class CalenderCell extends Vue {
  @Prop() vacancy: VacancyState | undefined

  get date() {
    if (this.vacancy) {
      return new Date(this.vacancy.date)
    }
    return null
  }

  get active():boolean {
     if (this.vacancy) {
       const currentDate = new Date()
       return currentDate.getFullYear() === this.date.getFullYear() &&
           currentDate.getMonth() === this.date.getMonth() &&
           currentDate.getDate() === this.date.getDate()
     }
     return false
  }

  get day() {
    return new Date(this.vacancy?.date).getDate()
  }

  get closed(): boolean {
    if (this.vacancy) {
      return this.vacancy.closeDay || this.vacancy.holiday
    }
    return false
  }
  // 剩余很少
  get few() {
    if (this.vacancy) {
      return !this.vacancy.closeDay &&
          !this.vacancy.holiday &&
          this.vacancy.vacancy < 10 &&
          this.vacancy.vacancy > 0
    }
    return false
  }
  // 可预约
  get available(): boolean {
    if (this.vacancy) {
      return !this.vacancy.closeDay && !this.vacancy.holiday && this.vacancy.vacancy >= 10
    }
    return false
  }

  get full(): boolean {
    if (this.vacancy) {
      return !this.vacancy.closeDay && !this.vacancy.holiday && this.vacancy.vacancy === 0
    }
    return false
  }

  get price(): string {
    const a = this.vacancy?.price.toFixed(2).toString().split('.')
    a[0] = a[0].replace(/(?!^)(?=(\d{3})+$)/g, ',')
    return a.join('.')
  }
}
</script>

<style scoped>
.calender-cell {
  width: 64px;
  height: 63px;
  background: #b3b3b3;
  border-radius: 2px;
  /*overflow: hidden;*/
}

.calender-cell-container {
  box-sizing: border-box;
  border: 1px solid #ccc;
  padding: 3px 5px 0;
  width: 100%;
  height: 100%;
  background: white;
}

.calender-day {
  position: relative;
  font-size: 13px;
  text-align: right;
  margin-bottom: 8px;

  background-repeat: no-repeat;
  background-size: 10px 10px;
  background-position: 0 center;
}

.calender-cell-container.active {
  border: 2px black solid;
}

.calender-cell-container.closed,
.calender-cell-container.full {
  background: #d9d9d9;
}

.available .cell-inner .calender-day {
  background-image: url("~/assets/svg/legend/available.svg");
}

.closed .cell-inner .calender-day {
  background-image: url("~/assets/svg/legend/closed.svg");
}

.full .cell-inner .calender-day {
  background-image: url("~/assets/svg/legend/full.svg");
}

.few .cell-inner .calender-day {
  background-image: url("~/assets/svg/legend/few.svg");
}


.cell-price span {
  display: block;
  font-size: 13px;
  width: 100%;
  text-align: right;
  line-height: 1em;
  white-space: nowrap;
  text-overflow: ellipsis;
}

</style>