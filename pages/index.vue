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
        <div class="footer-nav-container">
          <nuxt-link to='/about'><span>关于我们</span></nuxt-link>
          <div class="footer-nav-booking"><div class="calendar"></div>客房预订</div>
        </div>
      </div>
      <div class="footer-links">
        <ul>
          <li><a href="#" class="footer-links-notice">个人信息保护方针</a></li>
          <li><a href="#" class="footer-links-notice">推荐使用环境</a></li>
          <li><a href="#" class="footer-links-notice">希望使用图像的宾客</a></li>
          <li><a href="#" class="footer-links-language">日本语</a></li>
          <li><a href="#" class="footer-links-language">English</a></li>
          <li><a href="#" class="footer-links-language">繁體中文</a></li>
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
  width: 60px;
}

.top-head-logo-text {
  margin: 10px 0;
}

.top-logoanime {
  height: 60px;
}

.logo-border, .top-head-logos > svg {
  width: 100%;
  height: 60px;
}

.logo-border {
  box-sizing: border-box;
  position: absolute;
  border: solid 6px white;
  border-radius: 50%;
}

.top-head-logos > svg{
  fill: #fff;
}

.top-head-pagetitle, .top-head-title {
  font-family: hsn-zhcn-sans-regular, serif;
}

.top-head-pagetitle {
  margin-top: 20px;
  color: #fff;
  width: 20px;
  font-size: 15px;
  font-weight: 400;
}

.top-head-title {
  letter-spacing: 0.1em;
  left: 50%;
  color: #fff;
  position: absolute;
  bottom: 150px;
  transform: translateX(-50%)
}

.hotel-router {
  background-color: #121212;
}

.hotel-router > ul > li {
  display: flex;
}

footer {
  padding: 50px 0;
  background-color: #000;
}

.footer-nav-container {
  display: flex;
  color: white;
  font-size: 18px;
  justify-content: center;
  margin-bottom: 60px;
}

.footer-nav-container > a {
  position: relative;
  color:white;
  text-decoration: none;
  padding-right: 20px;
  margin-right: 16px;
}

.footer-nav-booking, .calendar {
  vertical-align: top;
}

/* 分隔符 */
.footer-nav-container > a::after,
.footer-links > ul > li:nth-child(3)::after {
  content: "";
  position: absolute; 
  top: 0;
  right: 0;
  height: 100%;
  width: 5px;
  background-image: url('~assets/svg/slash-white.svg');
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.4;
  background-position: center center;
}

.calendar {
  display: inline-block;
  width: 13px;
  height: 100%;
  margin-right: 5px;
  background-image: url("~assets/svg/calendar.svg");
  background-position: center center;
  background-repeat: no-repeat;
}

.footer-links > ul {
  display: flex;
  justify-content: center;
}

.footer-links > ul > li > a {
  color: white;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-decoration: none;
}

.footer-nav-container > a > span:hover,
.footer-nav-booking:hover,
.footer-links > ul > li:hover {
  opacity: 0.3;
  cursor: pointer;
}

.footer-links-notice {
  opacity: 0.5;
  margin-right: 10px;
}

.footer-links > ul > li:nth-child(3) {
  position: relative;
  padding-right: 10px;
  margin-right: 15px;
}

.footer-links-language {
  margin-left: 10px;
}
</style>
