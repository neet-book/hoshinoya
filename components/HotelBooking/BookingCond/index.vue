<template>
  <div class="booking-cond">
    <div class="booking-hotel-tab">
    <div class="title">空房情况</div>
      <ul class="hotel-tab" @click="onClick">
        <li class="tab-item" :class="{ chose: currentHotel === 'all' }" data-hotel-name="all">
          ALL
          <div class="table-item-bk"></div
          ></li>
        <li class="tab-item" :class="{ chose: currentHotel === 'karuizawa' }" data-hotel-name="karuizawa">
          轻井泽
          <div class="table-item-bk"></div
          ></li>
        <li class="tab-item" :class="{ chose: currentHotel === 'kyoto' }" data-hotel-name="kyoto"
        >
          京都
          <div class="table-item-bk"></div>
        </li>
        <li class="tab-item" :class="{ chose: currentHotel === 'fuji' }" data-hotel-name="fuji"
        >
          富士
          <div class="table-item-bk"></div>
        </li>
        <li class="tab-item" :class="{ chose: currentHotel === 'taketomi_island' }" data-hotel-name="taketomi_island">
          竹富岛
          <div class="table-item-bk"></div
          ></li>
        <li class="tab-item" :class="{ chose: currentHotel === 'okinawa' }" data-hotel-name="okinawa"
        >
          冲绳
          <div class="table-item-bk"></div>
        </li>
        <li class="tab-item" :class="{ chose: currentHotel === 'tokyo' }" data-hotel-name="tokyo"
        >
          东京
          <div class="table-item-bk"></div>
        </li>
        <li class="tab-item" :class="{ chose: currentHotel === 'bali' }" data-hotel-name="bali">

          巴厘岛
          <div class="table-item-bk"></div
          ></li>
        <li class="tab-item table-item-last" :class="{ chose: currentHotel === 'guguan' }" data-hotel-name="guguan"
        >
          谷关
          <div class="table-item-bk"></div>
        </li>
      </ul>
    </div>
    <div class="cond-container">
      <cond-bar
        :limit="limit"
        :discount="discount"
        @change="onCondChange"
        :class="{ lastChose: currentHotel === 'guguan' }"
      ></cond-bar>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator'
import CondBar,{ Condition, CondLimit, Discount }  from './CondBar'
// export { Condition, CondLimit, Discount }

/**
 * 酒店预定条件赛选组件
 * @property discount [prop]优惠
 * @property limit [prop]入住人数，时间限制
 * @property currentHotel 当前选择的酒店
 * @event cond-change 赛选条件改变
 */
@Component({
  components: { CondBar },
  mounted() {
    this.condition =  {
      adult: this.limit?.adultNumDefault || 0,
      child: this.limit?.childNumDefault || 0,
      baby: this.limit?.babyNumDefault || 0,
      infant: this.limit?.infantNumDefault || 0,
      stayNight: this.limit?.hotelNightDefault || 0
    }
  }
})
export default class BookingCond extends Vue {

  @Prop({ default() { return [] } })
  discount: Discount[]
  @Prop({ default() { return {} } })
  limit: CondLimit

  currentHotel: string = this.$route.params.hotel_name
  condition: Condition | undefined
  onClick(event) {
    this.currentHotel = event.target.getAttribute('data-hotel-name')

    this.$emit('cond-change', {
      hotel: this.currentHotel,
      condition: this.condition
    })
  }

  onCondChange(cond: Condition) {
    this.condition = cond

    this.$emit('cond-change', {
      hotel: this.currentHotel,
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
  user-select: none;
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

li:first-child {
  border-top-left-radius: 4px;
}

li:last-child {
  border-top-right-radius: 4px;
}


/* 选中后样式 */
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
li:first-child.tab-item > .table-item-bk::before,
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

/* 第一项未选择时底部 */
li:first-child.tab-item > .table-item-bk::before {
  background-image: -webkit-radial-gradient(0 0, circle,rgba(51,51,51,0) 3px,#4d4d4d 4px);
  left: -4px;
  bottom: 0;
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

li:first-child.chose,
li:last-child.chose {
  border-radius: 0;
}

.cond-container {
  position: relative;
}

li:last-child.chose {
  border-top-right-radius: 0;
}
</style>