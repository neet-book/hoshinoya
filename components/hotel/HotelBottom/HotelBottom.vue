<template>
  <div class="hotel-bottom">
    <vertical-logo class="footer-logo"></vertical-logo>
    <div class="booking-bar-container">
      <hotel-booking-bar></hotel-booking-bar>
    </div>
    <div class="booking-tell">
      <span>预约 </span> <span>+86-1234567-123</span><span>( 10:00 - 18:00 / CHINA TIME )</span>
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
  margin-bottom: 20px;
}

.booking-bar-container {
  margin-top: 40px;
}
.footer-logo {
  color: rgb(51, 51, 51);
}

.booking-tell {
  text-align: center;
  margin-top: 30px;
  letter-spacing: .4px;
  color: #666;
}

/* 预约 */
.booking-tell span:nth-child(1) {
  font-size: 11px;
  margin-left: 9px;
}

/* 电话号码 */
.booking-tell span:nth-child(2) {
  margin-right: 9px;
  font-size: 19px;
  vertical-align: middle;
  color: black;
}

/* 时间 */
.booking-tell span:nth-child(3) {
  font-size: 11px;
}

@media screen and (max-width: 900px)  {
  .booking-tell {
    border-bottom: solid 1px rgb(0, 0, 0, .1);
    padding-bottom: 15px;
  }

}
</style>
