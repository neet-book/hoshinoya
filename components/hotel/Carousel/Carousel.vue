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
          :class="{ hidden : positions[index] ? positions[index].hidden: false, transition }"
        />
      </div>
      <div class="carousel-nav">
        <carousel-nav :num="center_index" :count="items.length" @toLift="toLeft" @toRight="toRight"></carousel-nav>
      </div>
      <div id="carousel-prev" @click="toLeft"></div>
      <div id="carousel-next" @click="toRight"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import CarouselItem, { CarouselItemInfo } from './CarouselItem.vue'
import CarouselNav from "./CarouselNav.vue";


enum DIRECTION { left = 1, right = -1}

@Component({
  components: { CarouselNav, CarouselItem },
  mounted() {
    // 设置组件容器高度为浏览器视图高度的0.66倍
    this.areaHeight = Math.floor(window.innerHeight * 0.66)
    this.itemWidth = Math.floor(this.areaHeight * 1.5)

    const positions = []
    /**
     * 初始化移动距离，每个item的位置, 起始位置
     */
    this.initialCarouseler = () => {
      // 移动距离 49是item title的宽度
      let moveSize = this.itemWidth - (window.innerWidth - this.itemWidth) / 2 + 49
      // 起始位置
      let positionZero = (this.itemWidth + moveSize) * -1
      for (let no in this.items) {
        positions.push({
          no: Number(no),
          position: positionZero + (no * this.itemWidth),
          hidden: false
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
    this.carouseler = (direction: DIRECTION = DIRECTION.left)=> {
      // 保存移动方向那一端的第一个元素和位置
      let endpointItem = direction === DIRECTION.left ?  positions[0] : positions[positions.length - 1],
          endpointPosition = endpointItem.position
      if (direction === DIRECTION.left) {
        positions[positions.length - 1].hidden = false
        positions[0].hidden = true
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
        positions[positions.length - 1].hidden = true
        positions[0].hidden = false
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

      this.timer = setTimeout(this.carouseler, this.delay)
    }

    /**
     * 当页面不显示时停止动画
     */
    this.onVisibilityChange = ()=> {
      if (document.visibilityState === 'visible') {
        this.start()
      } else {
        this.stop()
      }

      console.log('visibility')
    }

    this.onResize = () => {
      this.areaHeight = window.innerHeight * 0.66
      this.itemWidth = this.areaHeight * 1.5

      // 移动距离
      let moveSize = this.itemWidth * .5
      // 起始位置
      let positionZero = (this.itemWidth + moveSize) * -1
      this.transition = false
      for (let index in positions) {
        positions[index].position = positionZero + (index * this.itemWidth)
      }
      setTimeout(() => {
        this.transition = true
      }, 0)
    }

    window.addEventListener('resize', this.onResize)
    document.addEventListener('visibilitychange', this.onVisibilityChange)

    this.initialCarouseler()
    this.start()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
    document.removeEventListener('visibilitychange', this.onVisibilityChange)
    this.stop()
  }
})
export default class Carousel extends Vue
{
  @Prop(Array) items: CarouselItemInfo[] | undefined

  areaHeight: number = 0
  itemWidth: number = 0
  timer: number | NodeJS.Timeout | undefined
  delay: number = 3000
  center_index: number = 0
  positions: [] =[]
  moveSize: number = 0
  transition: boolean = true

  initialCarouseler: () => void
  carouseler: (direction: DIRECTION) => void
  onVisibilityChange: () => void
  onResize: () => void

  start() {
    if (this.timer === undefined) this.carouseler(DIRECTION.left)
  }
  stop() {
    if (this.timer !== undefined) clearTimeout(this.timer as NodeJS.Timeout)
    this.timer = undefined
  }

  toLeft() {
    if (this.timer) {
      this.stop()
    }
    this.carouseler(DIRECTION.left)
  }
  toRight() {
    if (this.timer) {
      this.stop()
    }
    this.carouseler(DIRECTION.right)
  }
}
</script>

<style scoped>
.carousel-area {
  position: relative;
}
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

.hidden {
  visibility: hidden;
}

.transition {
  transition: transform 2.8s ease;
}

#carousel-prev,
#carousel-next {
  width: 50%;
  height: inherit;
  position: absolute;
  top: 0;
}

#carousel-prev {
  left: 0;
  cursor: -webkit-image-set(url(/image/cursor-prev.png) 1x,url(/image/cursor-prev@2x.png) 2x) 43 56,pointer;
}

#carousel-next {
  right: 0;
  cursor: -webkit-image-set(url(/image/cursor-next.png) 1x,url(/image/cursor-next@2x.png) 2x) 43 56,pointer;
}
</style>