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
              :to="'/hotel/' + hotelNameEn" 
              class="link-list-item"
              :class="{ isCurrent: page == 'index' }"
            >特点</nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="'/hotel/' + hotelNameEn + '/rooms'"
              class="link-list-item"
              :class="{ isCurrent: page == 'room' }"
            >客房</nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="'/hotel/' + hotelNameEn + '/dining'"
              class="link-list-item"
              :class="{ isCurrent: page == 'dining' }"
            >餐饮</nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="'/hotel/' + hotelNameEn + '/experience'"
              class="link-list-item"
              :class="{ isCurrent: page == 'experience' }"
            >体验</nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="'/hotel/' + hotelNameEn + '/access'"
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
            <div class="booking-calendar"></div>客房预定
          </div>
        </div>
        <div class="hotel-hotline">
          预约<span class="phone-number">+81-50-3786-1144</span> <span class="time">( 10:00 - 18:00 / JPN TIME )</span>
        </div>
      </div>
      <!-- 价格列表 -->
      <div class="base-rate-list">
        <hotel-rate-list :current-hotel="hotelNameEn" :rate-infos="$store.state.rateInfoList"/>
      </div>
      <!-- 底部链接 -->
      <div class="footer-link">
        <div class="footer-links"><nuxt-link to="/about">关于我们</nuxt-link><div class="sparate"></div><nuxt-link to="/reservations">我的订单</nuxt-link></div>
        <ul class="languages"><li>日本語</li><li class="sparate"></li><li>English</li><li class="sparate"></li><li>繁體中文</li></ul>
      </div>
    </div>
    
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import HotelRateList from '~/components/hotel/RateList/HotelRateList.vue'


@Component({
  components: { HotelRateList }
})

export default class HotelMenuArea extends Vue {
  hotelName: string | undefined = this.$store.state.hotelName
  hotelNameEn: string | undefined = this.$store.state.hotelNameEn
  logo: string = 'hotel-logo-' + this.$store.state.hotelNameEn

  get page(): string {
    const arr = this.$route.path.split('/')
    const current = arr[arr.length - 1]
    return current === this.hotelNameEn ? 'index' : current
    
  }
}
</script>


<style scoped>
.hotel-menu-area {
  padding: 0 110px;
  position: relative;
  /* width: 100%; */
  height: 100%;
  overflow: auto;
}

.menu-content-container {
  box-sizing: border-box;
  padding: 0 10px 0 10px;
  width: 100%;
  max-width: 840px;
  margin: 114px auto;
}


.menu-title {
  margin: 0px auto 0;
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

.booking-calendar {
  display: inline-block;
  width: 13px;
  height: 13px !important;
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
  margin-bottom: 50px;
}


.footer-links > a {
  color: black;
  font-size: 15px;
  text-decoration: none;
  vertical-align:top;
}

.languages {
  margin-top: 82px;
  position: relative;
  display: flex;
  flex-wrap: nowrap;
}

.languages > li {
  cursor: pointer;
  font-size: 13px;
  color: black;
  transition: color 500ms cubic-bezier(0.165, 0.84, 0.44, 1);
}

.languages > li:hover,
.links > a:hover
{
  color: #bfbfbf;
}

/* 分隔符 */
.sparate
{
  height: 14px;
  width: 5px;
  margin: 0 15px;
  background-image: url('~assets/svg/slash-black.svg');
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.4;
  background-position: center center;
}

.footer-links > .sparate {
  height: 18px;
  display: inline-block;
  vertical-align:top;
}

@media screen and (max-width: 1280px) {
  .hotel-menu-area {
    padding: 0 0 0 60px;
  }
}
</style>