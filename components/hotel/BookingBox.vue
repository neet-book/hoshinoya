<template>
  <div class="booking-box">
    <div class="booking-button">
      <div class="side-caption">最佳价格保证</div>
      客房预订
    </div>

    <div class="booking-active-box" v-show="false">
      <hotel-booking-bar :box="true"></hotel-booking-bar>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'
import HotelBookingBar from '/components/hotel/HotelBookingBar'

@Component({
  components: { HotelBookingBar }
})
export default class BookingBox extends Vue {

}
</script>

<style scoped>
.booking-box {
  display: flex;
  background-color: #e6e6e6;

  cursor: pointer;
}


.booking-button {
  box-sizing: border-box;
  flex-shrink: 1;
  width: 110px;
  height: 142px;

  border-right: 1px solid #000;

  font-size: 18px;
  letter-spacing: 1.8px;
  line-height: 110px;
  writing-mode: vertical-lr;
  text-align: center;
  font-family: "Helvetica Neue LT W01_55 Roman", sans-serif;

  position: relative;
}

.side-caption {
  width: 24px;
  height: 100px;

  font-size: 11px;
  color: white;
  text-align: center;
  line-height: 24px;

  background-color: #666;

  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;

  position: absolute;
  right: -1px;
  top: 0;
  transform: translateX(100%);

  transition-delay: 300ms;

  transition: background-color 300ms cubic-bezier(.25,.46,.45,.94),
    color 300ms cubic-bezier(.25,.46,.45,.94),
    opacity 300ms cubic-bezier(.25,.46,.45,.94);
}

.booking-active-box {
  width: 470px;
  height: 142px;
}
</style>