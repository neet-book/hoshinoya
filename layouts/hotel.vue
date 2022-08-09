<template>
  <div class="container" @scroll="onScroll">
    <logo-svg />
    <hotel-booking></hotel-booking>
    <div class="booking-box-container" :class="{ show: !inTop }" @click="openCalendar">
      <booking-box></booking-box>
    </div>
    <div class="booking-bar-container" :class="{ show: inTop }" @click="openCalendar">
      <hotel-booking-bar></hotel-booking-bar>
    </div>
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LogoSvg from '/components/LogoSvg.vue'
import BookingBox from '/components/hotel/BookingBox'
import HotelBookingBar from '/components/hotel/HotelBookingBar'
import HotelBooking from '/components/HotelBooking/HotelBooking'

@Component({
  components: { HotelBooking, LogoSvg, BookingBox, HotelBookingBar,  }
})
export default class HotelLayout extends Vue {
  get inTop() {
    return this.$store.state.distance == 0
  }

  openCalendar() {

  }

  onScroll(event: Event) {
    const container: Element = event.target as Element
    // 优化scroll
    window.requestAnimationFrame(() => {
      this.$store.commit('updateDistance', container.scrollTop)
    })
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
  overflow: auto;
}

.booking-box-container, .booking-bar-container {
  z-index: 200;
}

.booking-box-container {
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 30px;

  transform: translate3d(-134px, 0, 0);
  transition: transform 800ms cubic-bezier(.77,0,.175,1);
}

.booking-box-container.show {
  transform: translate3d(0, 0, 0);
}

.booking-bar-container {
  height: 70px;
  width: 575px;
  position: fixed;
  left: 50%;

  bottom: 0;
  transform: translate3d(-50%, 100%, 0);
  transition: visibility 0s linear,transform 800ms cubic-bezier(.77,0,.175,1);
  cursor: pointer;
}

.booking-bar-container.show {
  transform: translate3d(-50%, 0, 0);
}
</style>
