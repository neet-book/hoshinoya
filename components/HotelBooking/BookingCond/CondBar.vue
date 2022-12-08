<template>
  <div class="cond-bar">
    显示
    <div class="cond-trigger" @click.self="showCustomerFloat = !showCustomerFloat" ref="customerFloat">
      <span
        @click.self="showCustomerFloat = !showCustomerFloat"
      >{{condition?.adult}}</span>位成人/<span
        @click.self="showCustomerFloat = !showCustomerFloat"
      >{{condition?.child + condition?.infant + condition?.baby}}</span>位儿童（1房间）<i class="cond-select-icon"></i>
      <!-- 入住人数选择 -->
      <dialog class="cond-float-container" :class="{ visible: showCustomerFloat }">
        <div class="customer-cond-float">
          <form>
            <div class="cond-option">
              <label for="customer-adult">成人</label>
              <select class="booking-select" name="adult" id="customer-adult"  @change="changeCondition('adult', Number($event.target.value))">
                <option
                    class="booking-select-option"
                    v-for="adultNum in range(condLimit?.adultNumMin, condLimit?.adultNumMax + 1)"
                    :value="adultNum"
                    :selected="adultNum === condLimit?.adultNumDefault"
                >{{adultNum}}</option>
              </select>
            </div>
            <div class="cond-option">
              <label for="customer-child">11岁以下</label>
              <select class="booking-select" name="child" id="customer-child" @change="changeCondition('child', Number($event.target.value))">
                <option
                    class="booking-select-option"
                    v-for="childNum in range(condLimit?.childNumMin, condLimit?.childNumMax + 1)"
                    :value="childNum"
                    :selected="childNum === condLimit?.childNumDefault"
                >{{childNum}}</option>
              </select>
            </div>
            <div class="cond-option">
              <label for="customer-baby">6岁以下</label>
              <select class="booking-select" name="baby" id="customer-baby" @change="changeCondition('baby', Number($event.target.value))">
                <option
                    class="booking-select-option"
                    v-for="babyNum in range(condLimit?.babyNumMin, condLimit?.babyNumMax + 1)"
                    :value="babyNum"
                    :selected="babyNum === condLimit?.babyNumDefault"
                >{{babyNum}}</option>
              </select>
            </div>
            <div class="cond-option">
              <label for="customer-infant">3岁以下</label>
              <select class="booking-select" name="infant" id="customer-infant"  @change="changeCondition('infant', Number($event.target.value))">
                <option
                    class="booking-select-option"
                    v-for="infantNum in range(condLimit?.infantNumMin, condLimit?.infantNumMax + 1)"
                    :value="infantNum"
                    :selected="infantNum === condLimit?.infantNumDefault"
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
      </dialog>
    </div>
    <div class="cond-trigger" @click.self="showNightFloat = !showNightFloat" ref="nightFloat">
      入住<span
        @click.self="showNightFloat = !showNightFloat"
      >{{condition?.stayNight}}</span>晚<span
        v-if="condition?.stayNight > condLimit?.hotelNightMax"
        @click.self="showNightFloat = !showNightFloat"
      >以上</span>
      <span
        class="night-discount"
        @click.self="showNightFloat = !showNightFloat"
      >{{off}}</span><i class="cond-select-icon"></i>
      <!-- 入住夜晚选择 -->
      <div class="cond-float-container" :class="{ visible: showNightFloat }">
        <div class="night-cond-float">
          <ul>
            <li
                class="cond-night-select-item"
                v-for="d in discount"
                @click="changeCondition('stayNight', d.night), showNightFloat = false"
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
import {Component, Vue, Prop } from 'nuxt-property-decorator'

export interface Condition {
  adult: number
  child: number
  baby: number
  infant: number
  stayNight: number
  hotel?: string
}

export interface CondLimit {
  infantNumMax: number
  infantNumDefault: number
  adultNumMin: number
  babyNumDefault: number
  babyNumMin: number
  childNumMin: number
  hotelNightDefault: number
  adultNumMax: number
  infantNumMin: number
  hotelNightMax: number
  hotelNightMin: number
  babyNumMax: number
  adultNumDefault: number
  childNumDefault: number
  childNumMax: number
}

export interface Discount {
  night: number
  off: string
}

/**
 * 入住人数，天数条件筛选组件
 * @property condition  赛选条件
 * @property condLimit [prop] 筛选条件限制
 * @property discount [prop] 优惠
 * @event change 筛选条件发生改变
 */
@Component({
  mounted() {
    document.body.addEventListener('click', this.onDocumentClick)
  },
  unmounted()  {
    document.body.removeEventListener('click', this.onDocumentClick)
  },
})
export default class CondBar extends Vue {
  showCustomerFloat = false
  showNightFloat = false

  condition: Condition = {
    adult: this.condLimit?.adultNumDefault || 2,
    child: this.condLimit?.childNumDefault || 0,
    infant: this.condLimit?.infantNumDefault || 0,
    baby: this.condLimit?.babyNumDefault || 0,
    stayNight: this.condLimit?.hotelNightDefault || 2
  }

  @Prop({ default: {} })
  condLimit: CondLimit
  @Prop({ default: {} })
  discount: Discount[]


  get off() {
    for (let d of this.discount) {
      if (d.night === this.condition?.stayNight) {
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

  /**
   * 筛选条件改变事件
   * @param key 改变的条件
   * @param value 值
   */
  changeCondition(key: string, value: any) {
    const copy = Object.assign({}, this.condition)
    copy[key] = value
    this.$emit('change', copy)
  }

  /**
   * 处理点击悬浮框外关闭悬浮框
   * @param event
   */
  onDocumentClick(event: Event) {
    const customerFloat = this.$refs.customerFloat as HTMLElement
    const nightFloat = this.$refs.nightFloat as HTMLElement
    if (!customerFloat?.contains(event.target as HTMLElement) && this.showCustomerFloat) {
      if (!customerFloat) return
      this.showCustomerFloat = false
    }
    if (!nightFloat?.contains(event.target as HTMLElement) && this.showNightFloat) {
      if (!nightFloat) return;
      this.showNightFloat = false
    }
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
  position: relative;
  top: -1px;

  font-size: 18px;
  /*line-height: 110px;*/
  padding-left: 30px;
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
  width: 80px;
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

  font-size: 16px;
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