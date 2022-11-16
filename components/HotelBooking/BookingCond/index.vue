<template>
  <div class="booking-cond">
    <div class="booking-hotel-tab">
      <div class="title">空房情况</div>
      <ul class="hotel-tab" @click="onClick">
        <li class="tab-item" :class="{ chose: currentCity === 'all' }" data-hotel-name="all">

          ALL
          <div class="table-item-bk"></div
          ></li>
        <li class="tab-item" :class="{ chose: currentCity === 'karuizawa' }" data-hotel-name="karuizawa">

          轻井泽
          <div class="table-item-bk"></div
          ></li>
        <li class="tab-item" :class="{ chose: currentCity === 'kyoto' }" data-hotel-name="kyoto"
        >
          京都
          <div class="table-item-bk"></div>
        </li>
        <li class="tab-item" :class="{ chose: currentCity === 'fuji' }" data-hotel-name="fuji"
        >
          富士
          <div class="table-item-bk"></div>
        </li>
        <li class="tab-item" :class="{ chose: currentCity === 'taketomi_island' }" data-hotel-name="taketomi_island">

          竹富岛
          <div class="table-item-bk"></div
          ></li>
        <li class="tab-item" :class="{ chose: currentCity === 'okinawa' }" data-hotel-name="okinawa"
        >
          冲绳
          <div class="table-item-bk"></div>
        </li>
        <li class="tab-item" :class="{ chose: currentCity === 'tokyo' }" data-hotel-name="tokyo"
        >
          东京
          <div class="table-item-bk"></div>
        </li>
        <li class="tab-item" :class="{ chose: currentCity === 'bali' }" data-hotel-name="bali">

          巴厘岛
          <div class="table-item-bk"></div
          ></li>
        <li class="tab-item table-item-last" :class="{ chose: currentCity === 'guguan' }" data-hotel-name="guguan"
        >
          谷关
          <div class="table-item-bk"></div>
        </li>
      </ul>
    </div>
    <div class="cond-container">
      <cond-bar
          :condList="condList"
          @cond-change="onCondChange"></cond-bar>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'
import CondBar from './CondBar'

@Component({
  components: { CondBar }
  
})
export default class BookingCond extends Vue {
  currentCity: string = this.$store.state.hotelNameEn
  condList = []
  roomState = []
  onCondList(cond) {

  }

  onClick(event) {
    this.currentCity = event.target.getAttribute('data-hotel-name')
  }
  onCondChange(cond) {
    this.$emit('cond-change', {
      city: this.currentCity,
      condition: cond
    })
  }
}
</script>

<style scoped>
.hotel-tab {
  display: flex;
  justify-content: right;
  position: relative;
}

.title {
  position: absolute;
  font-size: 28px;
  line-height: 44px;
  font-family: "hsn-zhcn-serif-light" , "hsn-zhtw-serif-light", serif;
}

.tab-item {
  box-sizing: border-box;
  width: 80px;
  height: 59px;
  position: relative;

  color: white;
  line-height: 59px;
  text-align: center;
  letter-spacing: 1.6px;
  font-family: "Helvetica Neue LT W01_55 Roman", hsn-zhcn-sans-demilight, hsn-zhtw-sans-demilight, sans-serif;

  background-color: #4d4d4d;

  cursor: pointer;

  transition: background-color 200ms cubic-bezier(0.165, 0.84, 0.44, 1),
    color 200ms cubic-bezier(0.165, 0.84, 0.44, 1);
}

.tab-item:hover {
  background-color: #333;
}

.chose {
  background: white;
  border-left: solid 1px;
  border-right: solid 1px;
  color: black;
}

.chose::before {
  content: '';
  display: block;
  position: absolute;
  top: -2px;

  height: 4px;
  width: 100%;
  background-color: black;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.tab-item.chose:hover {
  background-color: white;
}

.chose > .table-item-bk {
  width: 100%;
  height: 1px;
  background: white;

  position: absolute;
  bottom: 0;
  z-index: 9999;
}

.table-item-bk::after {
  content: '';
  display: block;
  position: absolute;
  bottom: 0;
  right: -1px;
  width: 1px;
  height: 8px;
  background-color: #999;
  z-index: 9999;
}

.chose > .table-item-bk::after,
.chose > .table-item-bk::before,
li:first-child.chose > .table-item-bk::before,
li:first-child.chose::after
{
  content: '';
  display: block;
  width: 4px;
  height: 4px;
  background-size: 100%, 100%;
  position: absolute;
  z-index: 9999;
}

.chose > .table-item-bk::after {
  background-image: -webkit-radial-gradient(100% 0, circle,rgba(51,51,51,0) 3px,#fff 4px);
  background-color: #0000;
  right: -4px;
  bottom: 0;
}

.chose > .table-item-bk::before {
  background-image: -webkit-radial-gradient(0 0, circle,rgba(51,51,51,0) 3px,#fff 4px);
  left: -4px;
  bottom: 0;
}

li:last-child.chose > .table-item-bk::after,
li:last-child > .table-item-bk::after {
  display: none;
}

li:first-child.chose > .table-item-bk::before {
  background-image: -webkit-radial-gradient(0 0, circle,rgba(51,51,51,0) 3px,#000 4px);
  left: -5px;
  bottom: 0;
}

li:first-child.chose::after {
  background-image: -webkit-radial-gradient(0 0, circle,rgba(51,51,51,0) 3px,#fff 4px);
  left: -4px;
  bottom: 0;
}

</style>