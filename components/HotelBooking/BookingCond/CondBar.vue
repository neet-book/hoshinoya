<template>
  <div class="cond-bar">
    显示
    <div class="cond-trigger" @click.self="showCustomerFloat = !showCustomerFloat">
      <span>{{adult}}</span>位成人/<span>{{child + infant + baby}}</span>位儿童（1房间）<i class="cond-select-icon"></i>
      <!-- 入住人数选择 -->
      <div class="cond-float-container" :class="{ visible: showCustomerFloat }">
        <div class="customer-cond-float">
          <form>
            <div class="cond-option">
              <label for="customer-adult">成人</label>
              <select name="adult" id="customer-adult" v-model.number="adult">
                <option
                    v-for="adultNum in range(peopleLimit.adultNumMin, peopleLimit.adultNumMax + 1)"
                    :value="adultNum"
                    :selected="adultNum === peopleLimit.adultNumDefault"
                >{{adultNum}}</option>
              </select>
            </div>
            <div class="cond-option">
              <label for="customer-child">11岁以下</label>
              <select name="child" id="customer-child" v-model.number="child">
                <option
                    v-for="childNum in range(peopleLimit.childNumMin, peopleLimit.childNumMax + 1)"
                    :value="childNum"
                    :selected="childNum === peopleLimit.childNumDefault"
                >{{childNum}}</option>
              </select>
            </div>
            <div class="cond-option">
              <label for="customer-baby">6岁以下</label>
              <select name="baby" id="customer-baby" v-model.number="baby">
                <option
                    v-for="babyNum in range(peopleLimit.babyNumMin, peopleLimit.babyNumMax + 1)"
                    :value="babyNum"
                    :selected="babyNum === peopleLimit.babyNumDefault"
                >{{babyNum}}</option>
              </select>
            </div>
            <div class="cond-option">
              <label for="customer-infant">3岁以下</label>
              <select name="infant" id="customer-infant" v-model.number="infant">
                <option
                    v-for="infantNum in range(peopleLimit.infantNumMin, peopleLimit.infantNumMax + 1)"
                    :value="infantNum"
                    :selected="infantNum === peopleLimit.infantNumDefault"
                >{{infantNum}}</option>
              </select>
            </div>
            <div class="cond-close-btn">
              <button @click.prevent="showCustomerFloat = false">确定</button>
            </div>
          </form>
          <div class="cond-customer-other-container">
            <div class="cond-customer-other">
              <div class="cond-tip-trigger">儿童可否与父母同睡？</div>
              <div class="cond-tip-float"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cond-trigger" @click.self="showNightFloat = !showNightFloat">
      入住<span>{{stayNight}}</span>晚<span v-if="stayNight > hotelNightMax">以上</span> <span class="night-discount">{{off}}</span><i class="cond-select-icon"></i>
      <!-- 入住夜晚选择 -->
      <div class="cond-float-container" :class="{ visible: showNightFloat }">
        <div class="night-cond-float">
          <ul>
            <li
                class="cond-night-select-item"
                v-for="d in discount"
                @click="stayNight = d.night , showNightFloat = false"
            >
              入住{{d.night}}晚<span class="night-discount">{{d.off}}</span>
            </li>
          </ul>
        </div>
      </div>
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
  showCustomerFloat = false
  showNightFloat = false
  adult = 1
  child = 0
  baby = 0
  infant = 0
  stayNight = 1
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

  hotelNightDefault = 2
  hotelNightMin = 0
  hotelNightMax = 7
  discount = [
    {
      night: 1,
      off: '0%off'
    },
    {
      night: 2,
      off: '25%off'
    },
    {
      night: 3,
      off: '25%off'
    },
    {
      night: 4,
      off: '25%off'
    },
    {
      night: 5,
      off: '25%off'
    },
    {
      night: 6,
      off: '25-26%off'
    },
    {
      night: 7,
      off: '25-26%off'
    },
    {
      night: 8,
      off: '25-26%off'
    }
  ]
  get off() {
    for (let d of this.discount) {
      if (d.night === this.stayNight) {
        return d.off
      }
    }
    return '0%off'
  }
  range(min: number, max: number): number[] {
    const list = []
    for (let n = min; n < max; n++)  {
      list.push(n)
    }
    return list
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
  /*line-height: 110px;*/
  padding-left: 30px;
  font-family: "Helvetica Neue LT W01_55 Roman", hsn-zhcn-sans-demilight, hsn-zhtw-sans-demilight, sans-serif;
  display: flex;
  align-items: center;

  user-select: none;
}

.cond-trigger {
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 50px;
  padding-left: 15px;
  margin: 0 8px;

  letter-spacing: 1.5px;
  font-size: 15px;
  vertical-align: baseline;

  border: solid 1px #ccc;
  border-radius: 2px;

  /* select icon */
  background-color: #f2f2f2;
  padding-right: 48px;
  background-image: url("~/assets/svg/select.svg");
  background-repeat: no-repeat;
  background-position: right 20px center;
  background-size: 8px 8px;
}

div:last-child.cond-trigger {
  width: 250px;
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

.cond-trigger > span:first-child {
  font-size: 24px;
}

.cond-trigger > .night-discount {
  width: 70px;
  font-size: 13px;
  margin-left: 5px;
}

/* 悬浮选择框 */
.cond-float-container {
  position: absolute;
  right: 0;
  top: 58px;
  border: solid 2px #666;
  background-color: white;

  transition: all 100ms cubic-bezier(.25,.46,.45,.94);
  transform: translate3d(0 ,10px, 0);
  opacity: 0;
  box-shadow: 0 5px 12px 0 rgb(4 0 0 / 30%);

  visibility: hidden;
}

.cond-float-container.visible {
  visibility: visible;
  opacity: 1;
  transform: translate3d(0, 0 , 0);
}

.cond-float-container::before {
  content: '';
  position: absolute;
  top: -9px;
  right: 0;
  border-right: 7px solid #0000;
  border-left: 7px solid #0000;
  border-bottom: 7px solid #666;
}

.customer-cond-float {
  width: 230px;
  box-sizing: border-box;
}

.customer-cond-float > form {
  padding: 0 14px;
}

.cond-option {
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 0;
  font-family: "Helvetica Neue LT W01_55 Roman", hsn-zhcn-sans-demilight, hsn-zhtw-sans-demilight, sans-serif;
  line-height: 0;
  padding-top: 8px;
}

.cond-option > label {
  font-size: 13px;
}

.cond-option > select {

  width: 80px;
  height: 30px;
  padding-left: 10px;
  cursor: pointer;
  border-color: #ccc;
  border-radius: 2px;
  font-size: 16px;

  background-color: #f2f2f2;
  background-image: url("~/assets/svg/select.svg");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 6px 6px;
}

.cond-option > select:hover {
  background-color: #e6e6e6;
}

.cond-close-btn {
  margin-top: 33px;
}
.cond-close-btn > button {
  width: 100%;
  height: 33px;
  padding: 0;
  border: none;
  border-radius: 2px;
  color: white;
  background-color: #666;
}

.cond-close-btn > button:hover {
  background-color: #333;
}

.cond-customer-other-container {
  margin-top: 18px;
  border-top: solid 1px #e6e6e6;
  padding: 16px 14px;
}

.cond-tip-trigger {
  font-size: 13px;
  cursor: help;
  padding-left: 16px;
  position: relative;
  height: auto;
}

.cond-tip-trigger::before {
  content: '?';
  position: absolute;
  left: -2px;
  top: 0;
  font-size: 10px;
  line-height: 13px;
  width: 13px;
  height: 13px;
  background-color: #d9d9d9;
  color: #666;
  text-align: center;

  border-radius: 999px;
}

/* 入住夜晚 */
.cond-night-select-item {
  width: 190px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 45px;
  border-top: 1px solid #e6e6e6;
  padding: 0 18px;
}

.cond-night-select-item > span {
  font-size: 13px;
}
</style>