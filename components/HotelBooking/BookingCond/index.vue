<template>
  <div class="booking-cond">
    <div class="booking-hotel-tab">
      <div class="title">空房情况</div>
      <ul class="hotel-tab" @click="onClick">
        <li class="tab-item" data-hotel-name="all">ALL</li>
        <li class="tab-item" data-hotel-name="karuizawa">轻井泽</li>
        <li class="tab-item" data-hotel-name="kyoto">京都</li>
        <li class="tab-item" data-hotel-name="fuji">富士</li>
        <li class="tab-item" data-hotel-name="taketomi_island">竹富岛</li>
        <li class="tab-item" data-hotel-name="okinawa">冲绳</li>
        <li class="tab-item" data-hotel-name="tokyo">东京</li>
        <li class="tab-item" data-hotel-name="bali">巴厘岛</li>
        <li class="tab-item" data-hotel-name="guguan">谷关</li>
      </ul>
    </div>
    <div class="cond-container">
      <cond-bar :hotel="tab" v-model:cond></cond-bar>
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
  tab = this.$store.state.hotelNameEn
  cond = null
  onClick(event) {
    this.tab = event.target.getAttribute('data-hotel-name')
    this.$emit('tab-change', this.tab)
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

  border-radius: 4px;

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

</style>