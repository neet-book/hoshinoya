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
      <div style="text-align: center">
        <button @click="carouseler(1)">l</button>
        <button @click="carouseler(-1)">r</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import CarouselItem, { CarouselItemInfo } from './CarouselItem.vue'

enum DIRECTION { left = 1, right = -1}

@Component({
  components: { CarouselItem },
  mounted() {
    const that: Carousel = this as Carousel
    // 设置组件容器高度为浏览器视图高度的0.66倍
    that.areaHeight = Math.floor(window.innerHeight * 0.66)
    that.itemWidth = that.areaHeight * 1.5

    const positions = []
    /**
     * 初始化移动距离，每个item的位置, 起始位置
     */
    this.initialCarouseler = () => {

      // 移动距离
      let moveSize = this.itemWidth * .5
      // 起始位置
      let positionZero = (this.itemWidth + moveSize) * -1
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
    /**
     * 滚动carousel
     * @param direction: 滚动方向
     */
    this.carouseler = (direction: DIRECTION)=> {
      // 保存移动方向那一端的第一个元素和位置
      let endpointItem = direction === DIRECTION.left ?  positions[0] : positions[positions.length - 1],
          endpointPosition = endpointItem.position
      if (direction === DIRECTION.left) {
        // positions所有元素向左移1位
        for (let index = 0; index < positions.length - 1; index++) {
          positions[index] = positions[index + 1]
        }
        positions[positions.length - 1] = endpointItem

        // 调整位置
        for (let index = 0; index < positions.length; index++) {
          positions[index].position = endpointPosition + this.itemWidth * index
        }
      } else {
        // positions 所有元素向右移1位
        for (let index = positions.length - 1; index > 0; index--) {
          positions[index] = positions[index - 1]
        }
        positions[0] = endpointItem

        // 调整位置
        for (let index = 0; index < positions.length; index++) {
          positions[(positions.length - 1) - index].position = endpointPosition - (index * this.itemWidth)
        }
      }

      // 页面中心显示的是元素第2项
      this.center_index = positions[2].no
      // this.timer = setTimeout(this.carouseler, this.delay)
    }

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
  delay: number = 500
  center_index: number = 0
  positions: [] =[]
  moveSize: number = 0
  initialCarouseler: () => void
  carouseler: (number: number) => void

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
  width: 100%;
  overflow: hidden;
}
.carousel-item {
  position: absolute;
  top: 0;
  left: 0;
}
</style>