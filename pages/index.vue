<template>
  <div class="container">
    <header>
      <div class="top-head">
        <swiper :slider-list="hotels" class="top-slider" v-on:slider-change="topSlider = $event" />
        <!-- logo -->
        <div class="top-head-logo-container">
          <div class="top-head-logos">
            <div class="top-logoanime">
              <div class="logo-border"></div>
              <logo-anime :logos="hotels" :current="topSlider" />
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
    </header>
    <main>
      <div class="hotel-router">
        <ul>
          <li v-for="(cards, n) of cardList" :key="n">
            <template v-for="card of cards">
              <router-card :content="card" :key="card.name" />
            </template>
          </li>
        </ul>
      </div>
    </main>
    <footer>
      <div class="footer-nav">
        <nuxt-link to='/about'>关于我们</nuxt-link>
        <div to='/booking'><div class="calendar"></div>客房预订</div>
      </div>
      <div class="footer-links">
        <ul>
          <li><a href="#" class="footer-link-notice">个人信息保护方针</a></li>
          <li><a href="#" class="footer-link-notice">推荐使用环境</a></li>
          <li><a href="#" class="footer-link-notice">希望使用图像的宾客</a></li>
          <li><a href="#" class="footer-link-language">日本语</a></li>
          <li><a href="#" class="footer-link-language">English</a></li>
          <li><a href="#" class="footer-link-language">繁體中文</a></li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Swiper from  '~/components/home/Swiper.vue'
import LogoAnime from '~/components/home/LogoAnime.vue'
import RouterCard from '~/components/home/RouterCarc.vue'

@Component({
  components: {
    Swiper,
    LogoAnime,
    RouterCard
  }
})
export default class Index extends Vue {
  topSlider: number = 1
  hotels = [
    {
      name: '富士',
      nameEN: 'fuji',
      logo: 'logo-hotel-fuji',
      number: 1,
      source: '/image/top_hero1_fuji.jpg',
      sourceSmall: '/image/card-3-fuji.jpg',
      discription: '于丘陵高地\n体验时尚豪华露营的梦幻乐趣'
    },
    {
      name: '京都',
      nameEN: 'kyoto',
      logo: 'logo-hotel-kyoto',
      number: 2,
      source: '/image/top_hero2_kyoto.jpg',
      sourceSmall: '/image/card-3-fuji.jpg',
      discription: '于丘陵高地\n体验时尚豪华露营的梦幻乐趣'
    },
    {
      name: '轻泽',
      nameEN: 'karuizawa',
      logo: 'logo-hotel-karuizawa',
      number: 3,
      source: '/image/top_hero3_karuizawa.jpg',
      sourceSmall: '/image/card-3-fuji.jpg',
      discription: '于丘陵高地\n体验时尚豪华露营的梦幻乐趣'
    },
    {
      name: '东京',
      nameEN: 'tokyo',
      logo: 'logo-hotel-tokyo',
      number: 4,
      source: '/image/top_hero4_tokyo.jpg',
      sourceSmall: '/image/card-3-fuji.jpg',
      discription: '于丘陵高地\n体验时尚豪华露营的梦幻乐趣'
    },
    {
      name: '嫩巴黎',
      nameEN: 'bali',
      logo: 'logo-hotel-bali',
      number: 5,
      source: '/image/top_hero5_bali.jpg',
      sourceSmall: '/image/card-3-fuji.jpg',
      discription: '于丘陵高地\n体验时尚豪华露营的梦幻乐趣'
    },
    {
      name: 'ko',
      nameEN: 'okinawa',
      logo: 'logo-hotel-okinawa',
      number: 7,
      source: '/image/top_hero6_okinawa.jpg',
      sourceSmall: '/image/card-3-fuji.jpg',
      discription: '于丘陵高地\n体验时尚豪华露营的梦幻乐趣'
    },
    {
      name: 'fe',
      nameEN: 'okinawa',
      logo: 'logo-hotel-okinawa',
      number: 8,
      source: '/image/top_hero6_okinawa.jpg',
      sourceSmall: '/image/card-3-fuji.jpg',
      discription: '于丘陵高地\n体验时尚豪华露营的梦幻乐趣'
    }
  ]

  get cardList() {
    const hotels = this.hotels.reverse()
    const len = 3;
    const cardList = []
    for (let index = 0; hotels.length > index;) {
      cardList.push(hotels.slice(index, index + len))
      index += len
    }
    const lastList = cardList[cardList.length - 1]
    if (lastList.length < len) {
      for(;lastList.length < len;) {
        // @ts-ignore
        lastList.push({})
      }
    }

    return cardList
  }
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

.hotel-router {
  background-color: #121212;
}

.hotel-router > ul > li {
  display: flex;
}

footer {
  background-color: #000;
}

</style>
