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
        <div class="prev" @click="prevSlider">prev</div>
        <ul>
          <li>{{ current | numFilter }}</li>
          <li>{{ next | numFilter }}</li>
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
  },
  mounted(): void {
    // @ts-ignore
    this.timer = setTimeout(() => {
      // @ts-ignore
      console.log(this.activity)
    }, 5)
  }
})
export default class Swiper extends Vue {
  @Prop(Array) sliderList: Slider[] | undefined
  activity:number = 2
  timer: number | undefined
  indicatStyle = {
    transform: 'translateY(0px)',
    opacity: 1,
    transition: 'none'
  }

  get currentHotel(): string {
    const currentSlid =  (this.sliderList as Slider [])[this.activity - 1]
    return currentSlid.nameEN
  }

  get current(): number {
    return this.activity
  }

  get next(): number {
    return this.activity
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
  bottom: 125px;
  transform: translateX(-50%);

  width: 100%;
  text-align: center;
  font-size: 10px;
  font-weight: 400;
  color: white;
  /* text-shadow: 0px 0px 2px #0008; */
}

.current-hotel {
  letter-spacing: 2px;
  height: 10px;
  text-transform: capitalize;
  margin-bottom: 10px;
  position: relative;
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
  font-size: inherit;
  display: inline-block;
  vertical-align: top;
  transition: transform 500ms;
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

.activited {
  opacity: 1 !important;
}

</style>