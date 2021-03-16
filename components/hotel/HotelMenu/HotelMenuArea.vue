<template>
  <div class="hotel-menu-area">
    <div class="nemu-title">
      <div class="title-hotel-name">
        虹夕诺雅 {{ hotelName }}
      </div>
      <div class="title-logo">
        <svg><use xlink:href="#logo-hoshinoya-text"></use></svg>
        <svg><use xlink:href="#logo-hoshinoya-mark"></use></svg>
        <svg><use v-bind="{ 'xlink:href': '#' + logo }"></use></svg>
      </div>
    </div>
    <div class="link-list">
      <ul>
        <li></li>
      </ul>
    </div>
    <div class="room-booking"></div>
    <div class="hotel-hotline"></div>
    <div class="base-rate-list"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
interface RateInfo {
  hotel_id: number
  name: string
  name_en: string
  copy: string
  price: number | string
  unit?: string
  type?: string
}


@Component
export default class HotelMenuArea extends Vue {
  @Prop(String) hotelName: string | undefined
  @Prop(Boolean) open: boolean | undefined
  @Prop(String) logo: string | undefined
  @Prop(Array) rateList: RateInfo[] | undefined
}
</script>


<style scoped>
.hotel-menu-area {
  position: absolute;
  left: 110px;
  right: 0;
  top: 0;
  bottom: 0;
}

.title-logo > svg {
  width: 36px;
  height: 36px;
}
</style>