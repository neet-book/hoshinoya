<template>
  <div class="carousel">
    <div class="carousel-area">
      <div 
        class="carousel-container" 
      >
        <div 
          v-for="(item, index) of images"
          class="carousel-item" 
          :class="{ visible: positionList[index] ? positionList[index].visible : false }"
          :key="index"
          ref="carItem"
          :style="{ width: imageWidth + 'px', transform: `translate3d(${positionList[index] ? positionList[index].x : 0}px, 0px, 0px)` }"
        >
          <div class="item-text">#{{ index > 9 ? index : index.toString().padStart('0') }} _ {{ item.title }}</div>
          <div class="item-image"
            :style="{ backgroundImage: `url(${item.image.normal})` }"
          ></div>
        </div>
      </div>
    </div>
    <div class="navi">
      <div class="navi-container">
        <ul>
          <li class="navi-item" v-for="n of images.length" :key="n" :data-num="n">
            <span></span>
            <i></i>
          </li>
        </ul>
      </div>
      <div style="text-align: center;">
      <button @click="carouseler.start()">start</button>
      <button @click="carouseler.stop()">stop</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { DIRECTION, Carouseler, Position } from './carouseler'
interface image {
  title: string,
  image: Hotel.ImageUrl
}

@Component({
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
    })
    // 监听页面尺寸变化
    window.addEventListener('resize', that.onViewResize)
  },
  beforeDestroy() {
    const that: any = this
    that.carouseler!.stop()
    window.removeEventListener('resize', that.onViewResize)
  }
})
export default class Carousel extends Vue {
  @Prop(Array) images: image[] | undefined 
  @Prop(Number) interval: number | undefined
  imageWidth: number = 0
  viewWidth: number = 0
  positionList: Position[] = []
  carouseler: Carouseler | null = null
  get carouselItems(): image[] {
    // if (this.images) {
    //   const first = this.images[0]
    //   const last = this.images[this.images.length - 1]
    //   return [first, ...this.images, last]
    // }

    // return []
    return this.images as image[]
  }

  onViewResize(event: Event) {
    const el = event.target as Element
    this.imageWidth = el.clientHeight * 1.5
    this.viewWidth = document.documentElement.clientWidth
    let items = this.$refs.carItem as Element[]
    let itemWidth = items[0].clientWidth
    console.log(`onViewResize: itemWidht = ${itemWidth}`)
    this.$nextTick(() => {
      this.carouseler!.reset(itemWidth)
    })
  }
}
</script>


<style scoped>
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

  transition: transform 600ms ;
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

.carousel-item.move {
  transition: transform 5000ms;
}
</style>