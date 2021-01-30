<template>
  <div class="swiper">
    <ul>
      <li 
        class="slider"
        :class="{ activited: slider.number == activity, isReady: slider.number == activity }"
        v-for="slider in sliderList" 
        :key="slider.number"
      >
        <div class="slider-img">
          <div class="img-body" :style="{ backgroundImage: `url(${slider.source})` }"></div>
        </div>
      </li>
    </ul>
    <div class="indicator">
      <ul 
        class="current-hotel"
      >
        <li
          v-for="hotel in sliderList" :key="hotel.number"
          :class="{ activited: hotel.number == activity }"
        >HOSHINOYA {{ hotel.nameEN }}</li>
      </ul>
      <div class="controler">
        <div class="prev-btn" @click="toPrev">prev</div>
        <ul>
          <li
            class="ctl-num"
            v-for="num in indicatorNums"
            :key="num.n"
            :class="num.calss"
          >
            {{ num.number | numFilter }}
          </li>
        </ul>
        <span class="delimit">/</span>
        <span class="total">{{ sliderList.length }}</span>
        <div class="next-btn" @click="toNext">next</div>
      </div>
    </div>
    <logo-anime class="hotel_logos" :current="activity" :logos="sliderList" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import LogoAnime from './LogoAnime.vue'

interface indicNum {
  n: number
  number: number,
  calss: string[]
}

interface Slider {
  name: string
  nameEN:string
  logoname: string
  number: number
  source: string
}

@Component({
  components: {
    LogoAnime
  },
  mounted(): void {
    // @ts-ignore
    this.timer = setTimeout(() => {
      // @ts-ignore
      console.log(this.activity)
    }, 5)
  },
  filters: {
    numFilter(n: number): string {
      if (n < 10) {
        return '0' + n
      } else {
        return n.toString()
      }
    }
  }
})
export default class Swiper extends Vue {
  @Prop(Array) sliderList: Slider[] | undefined
  activity:number = 1
  timer: number | undefined
  indicatorNums: indicNum[] = [
    { n: 1, number: 0, calss: ['ctl-num-pre'] },
    { n: 2, number: 1, calss: ['ctl-num-current'] },
    { n: 3, number: 2, calss: ['ctl-num-next'] },
  ]

  get currentHotel(): string {
    const currentSlid =  (this.sliderList as Slider [])[this.activity - 1]
    return currentSlid.nameEN
  }


  changeSlider(): void {
    const list = this.sliderList as Slider[]
    const el = this.$refs.indicator
    if (this.activity !== list.length) {
      this.activity += 1
      this.$refs 
    } else {
      this.activity = 1
      
    }
  }

  changeIndicNum(): void {
    const [pre, current, next] = this.indicatorNums
    pre.calss = ['ctl-num-next']
    next.number = this.activity
    next.calss = ['ctl-num-current']
    current.calss = ['ctl-num-pre']
    this.indicatorNums = [current, next, pre]
  }

  toNext(): void {
    console.log(this.activity)
    const list = this.sliderList as Slider[]
    if (this.activity !== list.length) {
      this.activity += 1
    } else {
      this.activity = 1
    }
    console.log(this.activity)
    this.changeIndicNum()
  }

  toPrev(): void {
    if (this.activity !== 1) {
      this.activity -= 1
    } else {
      const list = this.sliderList as Slider[]
      this.activity = list.length
    }
    this.changeIndicNum()
  }
}
</script>

<style scoped>
.swiper,
.swiper > ul,
.slider-img，
.current-hotel,
.controler > ul,
.prev-btn, .next-btn
{
  position: relative;
}

.swiper > ul, .swiper > ul > li {
  height: inherit;
}

.slider {
  width: 100%;
  position: absolute;
  top: 0;
  opacity: 0;
  transition: opacity 2000ms cubic-bezier(.445,.05,.55,.95);
}

.slider-img {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.img-body {
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  transition:  12s;
  transition-property: transform;
  transition-delay: 900ms;
}

.activited > .slider-img > .img-body {
  transform: scale(1.2);
} 

/* 控制器 */
.indicator {
  position: absolute;
  left: 50%;
  bottom: 100px;
  transform: translateX(-50%);

  width: 100%;
  text-align: center;
  font-size: 10px;
  font-weight: 400;
  color: white;
}

.current-hotel {
  letter-spacing: 1px;
  height: 10px;
  text-transform: capitalize;
  margin-bottom: 10px;
}

.current-hotel > li {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  opacity: 0;
  transition: opacity 500ms;
}

.current-hotel > .activited {
  transition: opacity 1500ms cubic-bezier(.445,.05,.55,.95);
}

.delimit {
  margin: 0 3px
}

.controler {
  height: 13px;
  overflow: hidden;
}

.controler > ul {
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

.activited {
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