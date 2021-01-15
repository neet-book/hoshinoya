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
    <div class="controler">
      <ul 
        class="current-hotel"

      >
        <li v-for="hotel in sliderList" :key="hotel.number">HOSHINOYA {{ currentHotel }}</li>
      </ul>
      <div class="tips">
        <div class="prev" @click="prevSlider">prev</div>
        <ul>
          <li v-for="n in sliderList.length" :key="n">
            {{ n | numFilter }}
          </li>
        </ul>
        <span class="delimit">/</span>
        <span class="total">{{ sliderList.length }}</span>
        <div class="next" @click="nextSlider">next</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

interface Slider {
  name: string
  nameEN:string
  number: number
  source: string
}

@Component({
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
  activity:number = 2
  timer: number | undefined

  get currentHotel(): string {
    const currentSlid =  (this.sliderList as Slider [])[this.activity - 1]
    return currentSlid.nameEN
  }

  nextSlider(): void {
    const list = this.sliderList as Slider[]
    if (this.activity !== list.length) {
      this.activity += 1
    } else {
      this.activity = 1
    }
  }

  prevSlider(): void {
    if (this.activity !== 1) {
      this.activity -= 1
    } else {
      const list = this.sliderList as Slider[]
      this.activity = list.length
    }
  }
}
</script>

<style scoped>
.swiper > ul, .swiper > ul > li {
  height: inherit;
}

.swiper > ul {
  position: relative;
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
  position: relative;
}

.img-body {
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  transition:  3s;
  transition-property: transform;
  transition-delay: 900ms;
}

.activited {
  opacity: 1;
}

.activited > .slider-img > .img-body {
  
  transform: scale(1.2);
} 

/* 控制器 */
.controler {
  position: absolute;
  left: 50%;
  bottom: 125px;
  transform: translateX(-50%);

  width: 100%;
  text-align: center;
  font-size: 10px;
  font-weight: 400;
  color: white;
  text-shadow: 0px 0px 2px #000;
}

.current-hotel {
  letter-spacing: 2px;
  text-transform: capitalize;
  margin-bottom: 10px;
  /* opacity: 0; */
  transition: opacity 2000ms cubic-bezier(.445,.05,.55,.95);
}

.delimit {
  margin: 0 3px
}

.tips {
  height: 10px;
  /* border: solid 1px; */
  /* overflow: hidden; */
}

.tips > ul {
  font-size: inherit;
  display: inline-block;
  vertical-align: top;
  /* transform: translateY(-1em); */
}

.prev, .next {
  height: 10px;
  display: inline-block;
  position: relative;
  visibility: hidden;
}

.prev::before, .next::before {
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

.prev::before {
  content: "<";
  right: 5px;
  text-align: right;
}
.next::before {
  content: ">";
  left: 5px;
  text-align: left;
}
</style>