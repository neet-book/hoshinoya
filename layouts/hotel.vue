<template>
  <div class="container" @scroll="onScroll">
  <logo-svg />
    <div class="booking-box-container" :class="{ show: !showBookingBar }">
      <booking-box></booking-box>
    </div>
    <div class="booking-bar-container" :class="{ show: showBookingBar }">
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

@Component({
  components: { LogoSvg, BookingBox, HotelBookingBar}
})
export default class HotelLayout extends Vue {
  get showBookingBar() {
    return this.$store.state.distance == 0
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
  z-index: 999;
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
  position: fixed;
  bottom: 0;
  display: none;
}
</style>
