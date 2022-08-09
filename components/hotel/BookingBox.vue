<template>
  <div class="booking-box" >
    <div class="booking-box-container"
         :class="{ display: opened }"
         @mouseleave="opened = false"
    >
      <div class="booking-button"
           @mouseenter.self="onMouseEnter"
      >
        <div>
          <div class="side-caption" :class="{ display: !opened }">最佳价格保证</div>
          客房预订
        </div>
      </div>

      <div class="booking-active-box" ref="actBox" :class="{ display: opened }">
        <div class="booking-bar-container">
          <hotel-booking-bar :box="true"></hotel-booking-bar>
        </div>
      </div>
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
  opened = false
  onMouseEnter(event) {
    const box = this.$refs.actBox as Element
    if (box.clientWidth === 0 ) this.opened = true
  }
}
</script>

<style scoped>
.booking-box {
  background-color: #e6e6e6;
}

.booking-box-container {
  cursor: pointer;
  display: flex;
  border-right: 1px solid #000;
  box-shadow: 0 1px 0 0 rgb(4 0 0 / 15%);
}

.booking-button {
  box-sizing: border-box;
  flex-shrink: 1;
  width: 110px;
  height: 142px;


  font-size: 18px;
  letter-spacing: 1.8px;
  line-height: 110px;
  writing-mode: vertical-lr;
  text-align: center;
  font-family: "Helvetica Neue LT W01_55 Roman", sans-serif;

  position: relative;

  transition: opacity 300ms cubic-bezier(.25,.46,.45,.94);
}

.display > .booking-button:before, .display > .booking-button:after {
  content: '';
  width: 1px;
  height: 18px;
  background-color: #cfcfcf;
}

.display > .booking-button:before {
  position: absolute;
  top: 0;
  right: -1px;
}

.display > .booking-button:after{
  position: absolute;
  bottom: 0;
  right: -1px;
}



.display > .booking-button > div {
  opacity: .4;
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
  opacity: 0;
  transition: background-color 300ms cubic-bezier(.25,.46,.45,.94),
    color 300ms cubic-bezier(.25,.46,.45,.94),
    opacity 300ms cubic-bezier(.25,.46,.45,.94);
}

.side-caption.display {
  opacity: 1;
}

.booking-active-box {
  cursor: pointer;
  width: 0;
  transition: width 500ms cubic-bezier(.77,0,.175,1);
}

.display.booking-active-box {
  width: 470px;
  height: 142px;
  overflow: hidden;
}

.booking-bar-container {
  width: 470px;
  height: 142px;
  transition: opacity 300ms cubic-bezier(.25,.46,.45,.94);

  opacity: 0;
  display: none;
}

.display > .booking-bar-container {
  opacity: 1;
  display: block;
}
</style>