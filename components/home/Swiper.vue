<template>
  <div class="swiper">
    <!-- 图片 -->
    <ul>
      <li 
        class="slider"
        :class="{ activity: slider.hotelID === activity}"
        v-for="slider in sliderList" 
        :key="slider.hotelNameEn"
      >
        <div class="slider-img">
          <div class="img-body" :style="{ backgroundImage: ` url(${slider.image.normal})` }"></div>
        </div>
      </li>
    </ul>
    <!-- 轮播图控制 -->
    <div class="indicator">
      <ul 
        class="current-hotel"
      >
        <li
          v-for="slider in sliderList" :key="slider.hotelID"
          :class="{ activity: slider.hotelID === activity }"
        >HOSHINOYA {{ slider.hotelNameEn }}</li>
      </ul>
      <div class="controller">
        <div class="prev-btn" @click="toPrev">prev</div>
        <ul>
          <li
            class="ctl-num"
            v-for="num in indicatorNums"
            :key="num.n"
            :class="num.class"
          >
            {{ num.number + 1 | numFilter }}
          </li>
        </ul>
        <span class="delimit">/</span>
        <span class="total">{{ sliderList.length }}</span>
        <div class="next-btn" @click="toNext">next</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import LogoAnime from './LogoAnime.vue'

interface indicNum {
  n: number
  number: number,
  class: string[]
}

export interface SliderImage {
  hoteName: string
  hotelNameEn:string
  hotelID: number | string
  image: {
    normal: string,
    big: string,
    square: string
  }
}

@Component({
  components: {
    LogoAnime
  },
  mounted(): void {
    const that: any = this
    that.start()
  },
  filters: {
    numFilter(n: number): string {
      return n.toString().padStart(2, '0')
    }
  }
})
export default class Swiper extends Vue {
  @Prop(Array) sliderList: SliderImage[] | undefined
  // 活动的slider
  activity:number = 0
  timer: any = 0
  // 节流延迟时间
  delay = 1300
  // 轮播图间隔时间
  interval = 4000
  prevTimestamp: number = 0
  nextTimestamp: number = 0
  indicatorNums: indicNum[] = [
    { n: 1, number: 0, class: ['ctl-num-pre'] },
    { n: 2, number: 1, class: ['ctl-num-current'] },
    { n: 3, number: 2, class: ['ctl-num-next'] },
  ]

  get currentHotel(): string {
    const currentSlid =  (this.sliderList as SliderImage [])[this.activity]
    return currentSlid.hotelNameEn
  }

  start() {
    if (this.timer !== null) {
      this.changeSlider(1)
    }
  }

  changeSlider(toN: number): void {
    const count = (this.sliderList as SliderImage[]).length
    const current = this.activity
    
    if (current + toN <= 0) {
      // toN 为负数，下一张是最后一张
      this.activity = count - Math.abs(current + toN)
    } else if (current + toN >= count) {
      // 当前为最后一张
      this.activity = (current + toN) - count
    } else {
      this.activity += toN
    }
    this.$emit('slider-change', this.activity)
    this.changeIndicNum()
    this.timer = setTimeout(() => this.changeSlider(1), this.interval)
  }

  changeIndicNum(): void {
    const [pre, current, next] = this.indicatorNums
    pre.class = ['ctl-num-next']
    next.number = this.activity
    next.class = ['ctl-num-current']
    current.class = ['ctl-num-pre']
    this.indicatorNums = [current, next, pre]
  }

  toNext(): void {
    if (Date.now() - this.nextTimestamp >= this.delay) {
      this.nextTimestamp = Date.now()
      clearTimeout(this.timer)
      this.changeSlider(1)
    }
  }

  toPrev(): void {
    if (Date.now() - this.prevTimestamp >= this.delay) {
      this.prevTimestamp = Date.now()
      clearTimeout(this.timer)
      this.changeSlider(-1)
    }
  }
}
</script>

<style scoped>
.swiper,
.swiper > ul,
.slider-img，
.current-hotel,
.controller > ul,
.prev-btn, .next-btn
{
  position: relative;
}

.slider-img, .img-body {
  height: 100%;
  width: 100%;
}

.swiper {
  height: inherit;
}

.swiper > ul, .swiper > ul > li {
  height: inherit;
}
/* 滑块透明效果 */
.slider {
  width: 100%;
  position: absolute;
  top: 0;
  opacity: 0;
  transition: opacity 2000ms cubic-bezier(.445,.05,.55,.95);
}

.slider-img {
  overflow: hidden;
}

/* 滑块缩放效果 */
.img-body {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  transition:  20s;
  transition-property: transform;
  transition-delay: 900ms;
}

.activity > .slider-img > .img-body {
  transform: scale(1.1);
} 

/* 控制器 */
.indicator {
  position: absolute;
  left: 50%;
  bottom: 50px;
  transform: translateX(-50%);

  width: 100%;
  text-align: center;
  font-size: 5px;
  font-weight: 400;
  color: white;
}

.current-hotel {
  letter-spacing: 1px;
  height: 10px;
  text-transform: capitalize;
  margin-bottom: 15px;
}

.current-hotel > li {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  opacity: 0;
  transition: opacity 500ms;

  font-family: "Helvetica Neue LT W01_55 Roman",serif;
}

.current-hotel > .activity {
  transition: opacity 1500ms cubic-bezier(.445,.05,.55,.95);
}

.delimit {
  margin: 0 3px
}

.controller {
  height: 13px;
  overflow: hidden;
}

.controller > ul {
  width: 13px;
  height: 13px;
  font-size: inherit;
  display: inline-block;
  vertical-align: top;
  transition: transform 500ms;
}

.ctl-num {
  position: absolute;
  transition: transform 500ms,
    opacity 500ms;
}

.ctl-num-pre {
  transform: translateY(-13px);
}

.ctl-num-current {
  transform: translateY(0);
  opacity: 1;
}

.ctl-num-next {
  transition: none;
  transform: translateY(13px);
  opacity: 0;
}

.prev-btn, .next-btn {
  height: 10px;
  display: inline-block;
  visibility: hidden;
}

.prev-btn::before, .next-btn::before {
  visibility: visible;
  display: block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.prev-btn::before {
  content: "<";
  right: 5px;
  text-align: right;
}

.next-btn::before {
  content: ">";
  left: 5px;
  text-align: left;
}

.activity {
  opacity: 1 !important;
}

.hotel_logos {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>