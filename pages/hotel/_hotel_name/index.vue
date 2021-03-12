<template>
  <div class="hotel">
    <hotel-menu :hotel="hotelName" />
    <header>
        <div class="hotel-header-container">
            <div class="hotel-header-logo"></div>
            <div class="hotel-header-title"></div>
            <div class="hotel-header-disc"></div>
        </div>
    </header>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import HotelMenu from '~/components/hotel/HotelMenu/HotelMenu.vue'


@Component({
  components: {
    HotelMenu
  }
})
export default class Hotel extends Vue {
  get hotelName (): string {
    return this.$route.params?.hotel_name
  }
}
</script>

<style scoped>

</style>
