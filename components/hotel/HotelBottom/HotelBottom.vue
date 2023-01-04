<template>
  <div class="hotel-bottom">
    <vertical-logo class="footer-logo"></vertical-logo>
    <div class="booking-bar-container">
      <hotel-booking-bar></hotel-booking-bar>
    </div>
    <div class="bottom-nav-container">
      <hotel-nav class="bottom-nav"></hotel-nav>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'
import VerticalLogo from '/components/hotel/VerticalLogo'
import HotelBookingBar from '/components/hotel/HotelBookingBar'
import HotelNav from '/components/hotel/HotelNav/HotelNav'

/**
 * 酒店介绍的底部内容
 */
@Component({
  components: { HotelBookingBar, VerticalLogo, HotelNav }
})
export default class HotelBottom extends Vue {

}
</script>

<style scoped>
.hotel-bottom {
  width: 600px;
  margin: auto;
  padding-top: 115px;
}

.booking-bar-container {
  margin-top: 40px;
  height: 80px;
}
.footer-logo {
  color: rgb(51, 51, 51);
}

.bottom-nav-container {
  margin-top: 114px;
}

.bottom-nav {
  width: 100%;
}
</style>