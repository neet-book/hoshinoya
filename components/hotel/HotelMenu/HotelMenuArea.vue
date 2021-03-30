<template>
  <div class="hotel-menu-area">
    <div class="menu-content-container">
      <!-- 标题 -->
      <div class="menu-title">
        <div class="title-hotel-name">
          虹夕诺雅 {{ hotelName }}
        </div>
        <div class="title-logo">
          <svg><use xlink:href="#logo-hoshinoya-text"></use></svg>
          <svg><use xlink:href="#logo-hoshinoya-mark"></use></svg>
          <svg><use v-bind="{ 'xlink:href': '#' + logo }"></use></svg>
        </div>
      </div>
      <!-- 导航链接列表 -->
      <div class="link-list">
        <ul>
          <li>
            <nuxt-link
              :to="'/hotel/' + nameEn + '/'"
              class="link-list-item"
              :class="{ isCurrent: page == 'index' }"
            >特点</nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="'/hotel/' + nameEn + '/rooms/'"
              class="link-list-item"
              :class="{ isCurrent: page == 'room' }"
            >客房</nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="'/hotel/' + nameEn + '/dining/'"
              class="link-list-item"
              :class="{ isCurrent: page == 'dining' }"
            >餐饮</nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="'/hotel/' + nameEn + '/experience/'"
              class="link-list-item"
              :class="{ isCurrent: page == 'experience' }"
            >体验</nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="'/hotel/' + nameEn + '/access/'"
              class="link-list-item"
              :class="{ isCurrent: page == 'access' }"
            >交通</nuxt-link>
          </li>
        </ul>
      </div>
      <!-- 预定 -->
      <div class="room-booking">
        <div class="booking-button">
          <div class="booking-button-cont">
            <div class="catalen"></div>客房预定
          </div>
        </div>
        <div class="hotel-hotline">
          预约<span>+81-50-3786-1144</span> <span>( 10:00 - 18:00 / JPN TIME )</span>
        </div>
      </div>
      
      <div class="base-rate-list"></div>
    </div>
    <div class="menu-area-bar"><span>MENU</span></div>
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
  @Prop(String) page: string | undefined

  get nameEn(): string {
    if (this.$route?.params.hotel_name) {
      return this.$route.params.hotel_name
    } else {
      return ''
    }
  }
}
</script>


<style scoped>
.hotel-menu-area {
  position: absolute;
  left: 110px;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex; 
}

.menu-content-container {
  width: 100%;
  height: 100%;
  max-width: 840px;
  margin: 0 auto;
}

.menu-area-bar {
  width: 110px;
  height: 100%;
  position: relative;
  font-family: BauerBodoni;
  writing-mode: vertical-rl;
  font-size: 11px;
  vertical-align: middle;
  letter-spacing: 1.8px;
  word-break: break-all;
  text-align: center;
}

.menu-area-bar > span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1em;
}

.menu-title {
  margin: 114px auto 0;
  padding-bottom: 50px;
  display: flex;
  justify-content: space-between;

}

.title-hotel-name {
  box-sizing: border-box;
  height: 30px;
  font-size: 18px;
  border-bottom:1px solid #999 ;
}

.title-logo > svg {
  width: 36px;
  height: 36px;
}

.link-list > ul > li {
  height: 45px;
}

.link-list-item {
  -webkit-font-smoothing: subpixel-antialiased;
  text-decoration: none;
  display: block;
  color: black;
  font-size: 18px;
  position: relative;
  padding-left: 20px;
}

.link-list-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 13px;
  height: 13px;
  background-image: url("~assets/svg/blt.svg");
  background-repeat: no-repeat;
  background-position: center center;
  opacity: inherit;
}

.link-list-item:hover {
  opacity: 0.5;
}

.link-list-item.isCurrent {
  opacity: 0.5;
}

.booking-button {
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  vertical-align: baseline;
  font-size: 18px;
  letter-spacing: 1.2px;
  height: 110px;
  border-width: 1px;
  border-style: solid;
  border-color: #fff0;
  background-color: rgb(230, 230, 230);
  transition: border-color 200ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s, 
    background-color 200ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
}

.booking-button:hover {
  background-color: white;
  border-color: black;
  transition-duration: 0s;
}

.booking-button-cont {
  height: 100%;
  padding-left: 50px;
  line-height: 108px;
}

</style>