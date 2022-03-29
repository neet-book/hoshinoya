<template>
  <div class="hide-swiper">
    <div class="swiper-container">
      <!-- 图片1 -->
      <div class="swiper-item" :class="{ visible: this.no === 0, next: this.nextItem === 0 }">
        <div class="image-body" :style="{ backgroundImage: `url(${images[0].image.big})` }"></div>
      </div>
      <!-- 图片2 -->
      <div class="swiper-item" :class="{ visible: this.no === 1, next: this.nextItem === 1 }">
        <grid-picture-group :images="imageSlice(1, 1 + 7)" :visible="this.no === 1"></grid-picture-group>
      </div>
      <!-- 图片3 -->
      <div class="swiper-item" :class="{ visible: this.no === 2, next: this.nextItem === 2 }">
        <div class="image-body" :style="{ backgroundImage: `url(${images[8].image.big})` }"></div>
      </div>
      <!-- 图片4 -->
      <div class="swiper-item" :class="{ visible: this.no === 3, next: this.nextItem === 3 }">
        <grid-picture-group :images="imageSlice(9, 9 + 7)" :visible="this.no === 3"></grid-picture-group>
      </div>
      <div class="swiper-prev" @click="onPrev"></div>
      <div class="swiper-next" @click="onNext"></div>
    </div>
    <div class="nav-container">
      <carousel-nav :count="4" :num="no"></carousel-nav>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator'
import GridPictureGroup from "./GridPictureGroup.vue";
import Swiper from "../../home/Swiper.vue";
import CarouselNav from "/components/hotel/Carousel/CarouselNav"

enum DIRECTION { left = 1, right = -1 }

@Component({
  components: {Swiper, GridPictureGroup, CarouselNav },
  mounted() {
    this.swiper = (direction: DIRECTION = DIRECTION.left) => {
      this.nextItem = direction
      this.no += direction
      if (this.no >= 4) {
        this.no = 0
      }
      if (this.no < 0) {
        this.no = 3
      }
      this.timer = setTimeout(this.swiper, this.delay)
    }

    this.onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        this.start()
      } else {
        this.stop()
      }
    }

    document.addEventListener('visibilitychange', this.onVisibilityChange)
    this.start()
  },
  beforeDestroy() {
    document.removeEventListener('visibilitychange', this.onVisibilityChange)
  }
})
export default class HideSwiper extends Vue {
  v = false
  @Prop({ type: Array, default: []}) images
  // 当前显示的item
  no: number = 1
  timer: number | null = null
  delay: number = 2000
  private _nextItem: number = 1
  swiper: (direction: DIRECTION) => void
  onVisibilityChange: () => void
  visible = true

  get nextItem(): number {
    return this._nextItem
  }

  set nextItem(direction: number) {
    const next = this.no + (direction * 2)
    if (next >= 4) {
      this._nextItem = next - 4
    }
    if (next < 0) {
      this._nextItem = 4 + next
    }
  }

  start() {
    if (this.timer === null) this.swiper(DIRECTION.left)
  }

  stop() {
    if (this.timer !== null) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  onPrev() {
    this.stop()
    this.swiper(DIRECTION.right)
  }

  onNext() {
    this.stop()
    this.swiper(DIRECTION.left)
  }

  imageSlice(start, end) {
    return this.images.slice(start, end)
  }
}
</script>

<style scoped>
.hide-swiper {
  width: 620px;
  height: 620px;
  margin: auto;
}

.swiper-container,
.swiper-item,
.image-body {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}

.swiper-container {
  position: relative;
  box-shadow: 0 1px 4px 0 rgb(4 0 0 / 10%) inset;
}

.swiper-item {
  position: absolute;
  top: 0;
  z-index: 3;
}

.image-body {
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0;
  transition: opacity 900ms cubic-bezier(.445,.05,.55,.95);
  transition-delay: 400ms;
}

.visible>.image-body {
  opacity: 1;
  transition: opacity 700ms cubic-bezier(.445,.05,.55,.95);
  transition-delay: 200ms;
}

.next {
  z-index: 1;
}

.swiper-prev,
.swiper-next {
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 5;
}

.swiper-prev {
  left: 0;
  cursor: -webkit-image-set(url(/image/cursor-prev.png) 1x,url(/image/cursor-prev@2x.png) 2x) 43 56,pointer;
}

.swiper-next {
  right: 0;
  cursor: -webkit-image-set(url(/image/cursor-next.png) 1x,url(/image/cursor-next@2x.png) 2x) 43 56,pointer;
}

.nav-container {
  padding-top: 20px;
}
</style>