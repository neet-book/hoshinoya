<template>
  <div class="hotel-booking-bar">
    <div class="booking-date">{{ currentDate }}</div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'

enum WEEK { '日', '一', '二', '三', '四', '五', '六' }
@Component({})
export default class HotelBookingBar extends Vue {
  get currentDate() {
    const date = new Date(),
        month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth(),
        day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return `${date.getFullYear()}/${month}/${day}  (${WEEK[date.getDay()]})`
  }
}
</script>

<style scoped>
.calendar {
}
</style>