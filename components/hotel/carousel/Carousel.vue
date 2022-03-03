<template>
  <div class="carousel">
    <div class="carousel-area" :style="{ height: areaHeight + 'px' }">
      <div class="carousel-items-container">
        <carousel-item
          class="carousel-item"
          v-for="(itemInfo, index) of items"
          :key="itemInfo.title"
          :info="itemInfo"
          :style="{ width: itemWidth + 'px', height: areaHeight + 'px', transform: 'translate3d(' + (positions[index] ? positions[index].position : 0 ) + 'px, 0, 0)' }"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import CarouselItem, { CarouselItemInfo } from './CarouselItem.vue'


@Component({
  components: { CarouselItem },
  mounted() {
    const that: Carousel = this as Carousel
    // 设置组件容器高度为浏览器视图高度的0.66倍
    that.areaHeight = Math.floor(window.innerHeight * 0.66)
    that.itemWidth = that.areaHeight * 1.5
    that.initialCarouseler()
    that.start()
  }
})
export default class Carousel extends Vue
{
  @Prop(Array) items: CarouselItemInfo[] | undefined
  areaHeight: number = 0
  itemWidth: number = 0
  timer: number | NodeJS.Timeout | undefined
  delay: number = 0
  center_index: number = 0
  positions: [] =[]
  moveSize: number = 0
  carouseler(): number | NodeJS.Timeout {
    return  setTimeout(this.carouseler, this.delay)
  }

  initialCarouseler() {
    // 移动距离
    let moveSize = this.itemWidth * .5
    // 起始位置
    let positionZero = (this.itemWidth + moveSize) * -1
    const positions = []
    for (let no in this.items) {
      positions.push({
        no,
        position: positionZero + (no * this.itemWidth)
      })
    }

    this.moveSize = moveSize
    for (let position of positions) {
      this.positions.push(position)
    }
  }

  onResize() {
    this.areaHeight = window.innerHeight * 0.66
    this.itemWidth = this.areaHeight * 1.5

    this.initialCarouseler()
  }

  start() {
    if (this.timer === undefined) this.carouseler()
  }
  stop() {
    if (this.timer !== undefined) clearTimeout(this.timer as NodeJS.Timeout)
  }
}
</script>

<style scoped>
.carousel-items-container {
  position: relative;
  height: inherit;
}
.carousel-item {
  position: absolute;
  top: 0;
  left: 0;
}
</style>