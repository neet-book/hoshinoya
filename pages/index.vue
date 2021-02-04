<template>
  <div class="container">
    <div class="top-head">
      <swiper :slider-list="hotels" class="top-slider" @slider-change="currentSlider" />
    </div>
    <div class="top-head-logo">
      <logo-anime :logos="hotels" :current="currentSlider" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Swiper from  '~/components/home/Swiper.vue'
import LogoAnime from '~/components/home/LogoAnime.vue'

@Component({
  components: {
    Swiper,
    LogoAnime
  }
})
export default class Index extends Vue {
  currentSlider: number = 0
  hotels = [
    {
      name: '富士',
      nameEN: 'fuji',
      logoname: 'logo-hotel-fuji',
      number: 1,
      source: '/image/top_hero1_fuji.jpg'
    },
    {
      name: '京都',
      nameEN: 'kyoto',
      logoname: 'logo-hotel-kyoto',
      number: 2,
      source: '/image/top_hero2_kyoto.jpg'
    },
    {
      name: '轻泽',
      nameEN: 'karuizawa',
      logoname: 'logo-hotel-karuizawa',
      number: 3,
      source: '/image/top_hero3_karuizawa.jpg'
    },
    {
      name: '东京',
      nameEN: 'tokyo',
      logoname: 'logo-hotel-tokyo',
      number: 4,
      source: '/image/top_hero4_tokyo.jpg'
    },
    {
      name: '嫩巴黎',
      nameEN: 'bali',
      logoname: 'logo-hotel-bali',
      number: 5,
      source: '/image/top_hero5_bali.jpg'
    },
    {
      name: '冲绳',
      nameEN: 'okinawa',
      logoname: 'logo-hotel-okinawa',
      number: 6,
      source: '/image/top_hero6_okinawa.jpg'
    }
  ]
}
</script>

<style>
.top-head {
  height: 94vh;
}
</style>
