<template>
  <div class="cond-bar">
    显示
    <div class="cond-trigger" @click="showPeopleFloat = !showPeopleFloat">
      <span>{{adult}}</span>位成人/<span>{{child}}</span>位儿童（1房间）<i class="cond-select-icon"></i>
    </div>
    <div class="cond-trigger" @click>
      入住<span>{{stayNight}}</span>晚 <span class="night-discount">入住{{stayNight}}晚{{discount}}%off</span><i class="cond-select-icon"></i>
    </div>
    时，1位第1晚的房价
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'
import BookingPlan from "./BookingPlan/BookingPlan.vue";

@Component({
  components: {BookingPlan}
})
export default class CondBar extends Vue {
  showPeopleFloat = false
  showNightFloat = false
  adult = 1
  child = 0
  stayNight = 2
  discount = '25-26'
  peopleLimit = {
    // 成人数量限制
    adultNumDefault: 2,
    adultNumMax: 4,
    adultNumMin: 1,
    // 幼儿数量限制 0-3岁
    infantNumDefault: 0,
    infantNumMax: 4,
    infantNumMin: 0,
    // 婴儿数量限制 3-6岁
    babyNumDefault: 0,
    babyNumMax: 4,
    babyNumMin: 0,
    // 儿童数量限制 6岁以下
    childNumDefault: 0,
    childNumMin: 0,
    childNumMax: 4

  }
  nightPlan ={
    hotelNightDefault: 2,
    hotelNightMin: 0,
    hotelNightMax: 7
  }
  peoplePlan={

  }
}
</script>

<style scoped>
.cond-bar {
  box-sizing: border-box;
  width: 950px;
  height: 110px;
  border: 1px solid;
  border-radius: 4px;
  position: absolute;
  top: -1px;

  font-size: 18px;
  line-height: 110px;
  padding-left: 30px;
}

.cond-trigger {
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  height: 50px;
  padding-left: 15px;
  margin-right: 8px;

  font-family: "Helvetica Neue LT W01_55 Roman", hsn-zhcn-sans-demilight, hsn-zhtw-sans-demilight, sans-serif;
  letter-spacing: 1.5px;
  font-size: 15px;
  line-height: 50px;

  border: solid 1px #ccc;
  border-radius: 2px;

  background-color: #f2f2f2;
  padding-right: 48px;
  background-image: url("~/assets/svg/select.svg");
  background-repeat: no-repeat;
  background-position: right 20px center;
  background-size: 8px 8px;
}

.cond-trigger:hover {
  background-color: #e5e5e5;
}

.cond-trigger::after {
  content: '';
  display: block;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 45px;
  height: 1px;
  background-color: #333;
}



.cond-trigger > span {
  font-size: 24px;
}

.cond-trigger > .night-discount {
  font-size: 13px;
  /*margin-right: 40px;*/
}

</style>