<template>
  <div class="container">
    <swiper :slider-list="sliderList" class="top-slider" />
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import Swiper from  '~/components/Swiper.vue'
@Component({
  components: {
    Swiper
  }
})
export default class Index extends Vue {
  sliderList = [
    {
      name: '富士',
      nameEN: 'fuji',
      number: 1,
      source: '/image/top_hero1_fuji.jpg'
    },
    {
      name: '京都',
      nameEN: 'kyouto',
      number: 2,
      source: '/image/top_hero2_kyoto.jpg'
    },
    {
      name: '轻泽',
      nameEN: 'karuizawa',
      number: 3,
      source: '/image/top_hero3_karuizawa.jpg'
    },
    {
      name: '东京',
      nameEN: 'tokyo',
      number: 4,
      source: '/image/top_hero4_tokyo.jpg'
    },
    {
      name: '嫩巴黎',
      nameEN: 'bali',
      number: 5,
      source: '/image/top_hero5_bali.jpg'
    },
    {
      name: '冲绳',
      nameEN: 'okinawa',
      number: 6,
      source: '/image/top_hero6_okinawa.jpg'
    }
  ]
}
</script>

<style>
.top-slider {
  height: 94vh;
}
</style>
