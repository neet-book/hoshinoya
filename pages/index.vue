<template>
  <div class="container">
    <div class="top-head">
      <swiper :slider-list="hotels" class="top-slider" v-on:slider-change="currentSlider = $event" />
      <!-- logo -->
      <div class="top-head-logo-container">
        <div class="top-head-logos">
          <div class="top-logoanime">
            <div class="logo-border"></div>
            <logo-anime :logos="hotels" :current="currentSlider" />
          </div>
          <!-- 文字logo -->
          <svg class="top-head-logo-text"><use xlink:href="#logo-hoshinoya-text"></use></svg>
          <!-- logo -->
          <svg><use xlink:href="#logo-hoshinoya-mark"></use></svg>
        </div>
        <div class="top-head-pagetitle">虹夕诺雅</div>
      </div>
      <div class="top-head-title">探索精髓之旅</div>
    </div>
    <div class="hotel-router">

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
  currentSlider: number = 1
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
  position: relative;
}

.top-head-logo-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}

.top-head-logos, .top-head-pagetitle, .top-head-title {
  position: relative;
  left: 50%;
  transform: translateX(-50%)
}

.top-head-logos {
  width: 70px;
}

.top-head-logo-text {
  margin: 10px 0;
}

.top-logoanime {
  height: 70px;
}

.logo-border, .top-head-logos > svg {
  width: 100%;
  height: 70px;
}

.logo-border {
  box-sizing: border-box;
  position: absolute;
  border: solid 8px white;
  border-radius: 50%;
}

.top-head-logos > svg{
  fill: #fff;
}

.top-head-pagetitle {
  margin-top: 20px;
  color: #fff;
  width: 20px;
  font-size: 15px;
  font-weight: 400;
}

.top-head-title {
  letter-spacing: 5px;
  left: 50%;
  color: #fff;
  position: absolute;
  bottom: 170px;
  transform: translateX(-50%)
}
</style>
