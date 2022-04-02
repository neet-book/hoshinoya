<template>
  <div class="hotel-footer">
    <vertical-logo class="footer-logo"></vertical-logo>
    <div class="nav-container">
      <hotel-booking-bar></hotel-booking-bar>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'
import VerticalLogo from '/components/hotel/VerticalLogo'
import HotelBookingBar from "../HotelBookingBar.vue";

@Component({
  components: {HotelBookingBar, VerticalLogo }
})
export default class HotelFooter extends Vue {

}
</script>

<style scoped>
.hotel-footer {
  padding-top: 115px;
}

.footer-logo {
  color: rgb(51, 51, 51);
}
</style>