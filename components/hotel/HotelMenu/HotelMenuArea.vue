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
            <div class="calendar"></div>客房预定
          </div>
        </div>
        <div class="hotel-hotline">
          预约<span class="phone-number">+81-50-3786-1144</span> <span class="time">( 10:00 - 18:00 / JPN TIME )</span>
        </div>
      </div>
      <!-- 价格列表 -->
      <div class="base-rate-list">
        <hotel-rate-list />
      </div>
      <!-- 底部链接 -->
      <div class="footer-link">
        <div><nuxt-link to="/about">关于我们</nuxt-link> <nuxt-link to="/reservations">我的订单</nuxt-link></div>
        <div><nuxt-link to="#">日本语</nuxt-link> <nuxt-link to="#">English</nuxt-link> <nuxt-link to="#">繁體中文</nuxt-link></div>
      </div>
    </div>
    
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import HotelRateList from '../HotelRateList.vue'

interface RateInfo {
  hotel_id: number
  name: string
  name_en: string
  copy: string
  price: number | string
  unit?: string
  type?: string
}


@Component({
  components: { HotelRateList }
})
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
  left: 0;
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

.link-list {
  padding-bottom: 50px;
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

/* 预定按钮 */
.booking-button {
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  height: 110px;
  cursor: pointer;

  vertical-align: baseline;
  font-size: 18px;
  letter-spacing: 1.2px;
  
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

.calendar {
  display: inline-block;
  width: 13px;
  height: 13px;
  margin-right: 5px;
  background-image: url("~assets/svg/calendar-black.svg");
  background-position: center center;
  background-repeat: no-repeat;
}

.hotel-hotline {
  font-size: 13px;
  padding-top: 20px;
}
.hotel-hotline > .phone-number {
  font-size: 19px;
  margin: 0 10px
}

.hotel-hotline > .time {
  font-size: 12px;
  color: rgb(102, 102, 102);
  letter-spacing: .4px;
}

.base-rate-list {
  margin-top: 110px;
}

/* 分隔符 */
.sparate
{
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


@media screen and (max-width: 1280px) {
  .menu-content-container {
    width: 680px;
    min-width: 680px;
  }
}
</style>