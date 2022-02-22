<template>
  <div class="carousel">
    <div class="carousel-area">
      <div 
        class="carousel-container" 
      >
        <div 
          v-for="(item, index) of images"
          class="carousel-item" 
          :class="{ visible: positionList[index] ? positionList[index].visible : false, 'is-ready': isReady }"
          :key="index"
          ref="carItem"
          :style="{ width: imageWidth + 'px', transform: `translate3d(${positionList[index] ? positionList[index].x : 0}px, 0px, 0px)` }"
        >
          <div class="item-text">#{{ index > 9 ? index : index.toString().padStart(2, '0') }} _ {{ item.title }}</div>
          <div class="item-image"
            :style="{ backgroundImage: `url(${item.image.normal})` }"
          ></div>
        </div>
      </div>
    </div>
    <div class="navi">
      <carousel-nav :count="images.length" :direction="-1" :interval="5000"></carousel-nav>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import CarouselNav from './carousel_nav.vue'
import { DIRECTION, Carouseler, Position } from './carouseler'
interface image {
  title: string,
  image: Hotel.ImageUrl
}

@Component({
  components: {
    CarouselNav
  },
  mounted() {
    const that: any = this
    const items: Element[] = that.$refs.carItem
    const el = items[0]
    // item长度为高的1.5倍
    that.imageWidth = el ? el.clientHeight * 1.5 : 0
    that.$nextTick(() => {
      that.carouseler = new Carouseler(el.clientWidth, that.images.length)
      // 创建positions数组副本给组件的positionList
      that.positionList = [...that.carouseler.positions]
      that.carouseler.start()
      setTimeout(() => that.isReady = true, 0)
    })
    // 监听页面尺寸变化
    window.addEventListener('resize', that.onViewResize)
    // 监听页面显示变化
    document.addEventListener("visibilitychange", that.onPageVisibilityChange)
  },
  beforeDestroy() {
    const that: any = this
    that.carouseler!.stop()
    window.removeEventListener('resize', that.onViewResize)
    window.removeEventListener('visibilitychange', that.onPageVisibilityChange)
  }
})

export default class Carousel extends Vue {
  @Prop(Array) images: image[] | undefined 
  @Prop(Number) interval: number | undefined
  isReady: boolean = false
  imageWidth: number = 0
  viewWidth: number = 0
  positionList: Position[] = []
  carouseler: Carouseler | null = null
  get carouselItems(): image[] {
    return this.images as image[]
  }

  onViewResize(event: Event) {
    const el = event.target as Element
    this.imageWidth = el.clientHeight * 1.5
    this.viewWidth = document.documentElement.clientWidth
    let items = this.$refs.carItem as Element[]
    let itemWidth = items[0].clientWidth
    this.$nextTick(() => {
      this.carouseler!.reset(itemWidth)
    })
  }

  onPageVisibilityChange() {
    /** 页面隐藏时停止动画 */

    if (document.hidden !== undefined) {
      document.hidden ? this.carouseler?.stop() : this.carouseler?.start()
    } else {
      document.visibilityState === 'hidden' ? this.carouseler?.stop() : this.carouseler?.start()
    }
  }
}
</script>

<style scoped>
.carousel {
  overflow: hidden;
}
.carousel-area {
  position: relative;
}

.carousel-container {
  position: relative;
  height: 66vh;
}

.carousel-item {
  position: absolute;
  height: 100%;
  max-height: 700px;
  padding-left: 50px;
  opacity: 0;

}

.carousel-item.is-ready {
  transition: transform 5000ms ;
}
.carousel-item.visible {
  opacity: 1;
}

.item-text {
  font-size: 11px;
  letter-spacing: 1px;
  position: absolute;

  transform: rotate(90deg);
  transform-origin: left bottom;
  top: -11px;
  left: 32px;
}

.item-image {
  height: 100%;
  border-radius: 5px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.navi-container {
  padding-top: 23px;
  height: 20px;  
}

.navi-container > ul {
  display: flex;
  justify-content: center;
}

.navi-item {
  position: relative;
  height: 21px;
  width: 21px;
}

.navi-item > span {
  width: 9px;
  height: 9px;
  background-color: black;
  border-radius: 50%;

  position: absolute;
  top: 6px;
  left: 6px;
}
</style>