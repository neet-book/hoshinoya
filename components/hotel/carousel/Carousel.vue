<template>
  <div class="carousel">
    <div class="carousel-area">
      <div 
        class="carousel-container" 
        ref="container"
      >
        <div 
          v-for="(item, index) of images"
          class="carousel-item" 
          :class="{ visible: carouseler ? carouseler.itemPositions[index].visible : true, move: carouseler ? carouseler.status == 'moved' : false }"
          :key="index"
          ref="carrItem"
          :style="{ width: imageWidth + 'px', transform: `translateX(${carouseler ? carouseler.itemPositions[index].x : -11}px)` }"
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
import Carouseler from './carouseler'
import { Component, Vue, Prop } from 'nuxt-property-decorator'

interface image {
  title: string,
  image: Hotel.ImageUrl
}

@Component({
  mounted() {
    const that: any = this
    const items: Element[] = that.$refs.carrItem
    const el = items[0]
    that.imageWidth = el ? el.clientHeight * 1.5 : 0
    if (items) { 
      that.carouseler = new Carouseler(that.imageWidth + 50, items.length)
    }
    that.resizeHandle = () => that.onViewResize() 
    window.addEventListener('resize', that.resizeHandle)
  },
  beforeDestroy() {
    const that: any = this
    that.carouseler.stop()
    window.removeEventListener('resize', that.onViewResize)
  }
})
export default class Carousel extends Vue {
  @Prop(Array) images: image[] | undefined 
  carouseler: Carouseler | null = null
  imageWidth: number = 0
  onViewResize(event: Event) {
    const el = event.target as Element
    this.imageWidth = el.clientHeight * 1.5
    if (this.carouseler) this.carouseler.resize(this.imageWidth)
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

  transition: transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms;
  opacity: 0;
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