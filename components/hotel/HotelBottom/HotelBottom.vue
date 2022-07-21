<template>
  <div class="hotel-bottom">
    <vertical-logo class="footer-logo"></vertical-logo>
    <div class="booking-bar-container">
      <hotel-booking-bar></hotel-booking-bar>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'
import VerticalLogo from '/components/hotel/VerticalLogo'
import HotelBookingBar from "../HotelBookingBar.vue";

/**
 * 酒店介绍的底部内容
 */
@Component({
  components: { HotelBookingBar, VerticalLogo }
})
export default class HotelBottom extends Vue {

}
</script>

<style scoped>
.hotel-bottom {
  padding-top: 115px;
}

.booking-bar-container {
  margin-top: 40px;
}
.footer-logo {
  color: rgb(51, 51, 51);
}
</style>