<template>
  <div class="container">
    <!-- <hotel-booking-menu :hotel="$route.params.hotel_name" /> -->
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// import HotelBookingMenu from  '~/components/hotel/HotelBookingMenu.vue'
@Component
export default class HotelLayout extends Vue {
  
}
</script>

<style scoped>

</style>
