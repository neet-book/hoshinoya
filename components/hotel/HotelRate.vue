<template>
  <div class="hotel-rate">
    <div class="rate-left">
        <svg><use v-bind="{ 'xlink:href': `logo-hotel-${ rageInfo.nameEn }-small` }"></use></svg>
        <div>{{ RateInfo.name }}</div>
        <div>{{ RateInfo.price }}
    </div>
    <div class="hotel-picure">
        <div class="img-body" :style="{ backgroundImage: `url(${rateInfo.picture}` }"></div>
    </div>
  </div>
</template>
<script lang="ts">
interface RateInfo {
  hotel_id: number
  name: string
  nameEn: string
  copy: string
  price: number | string
  unit?: string
  type?: string
}

import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component
export default class HotelRate extends Vue {
    @Prop({ type: Object, required: true }) rageInfo: RateInfo | undefined
}
</script>


<style scoped>
</style>