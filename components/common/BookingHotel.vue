<template>
  <div class="hotel-booking"></div>
</template>
<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'

@Component
export default class BookingHotel extends Vue {

}
</script>

<style scoped>
.booking-hotel {
  width: 100vw;
  height: 100vh;
  position: fixed;

  z-index: 100;
}
</style>