<template>
  <div class="router-card">
    <nuxt-link calss='router-link' :to="'/hotel' + content.nameEN">
      <div class="router-card-container"
        ref="container"
        @mousemove="onMousemove"
        @mouseleave="onMouseleave"
      >
        <div class="router-bg" 
          :style="{ transform: 'translate(' + offsetX + '%, ' + offsetY + '%)' }"
        >
          <div 
          class="router-bg-img" 
          :class="{ active: mouseIn }"
          :style="{ backgroundImage: `url(${content.sourceSmall})`}"
        ></div>
        </div>
        <div class="router-info" :class="{ active: mouseIn }">
          <div class="router-info-container">
            <div class="router-name">{{ content.name }}</div>
            <svg class="router-logo">
              <use v-bind="{ 'xlink:href': '#' + content.logo }"></use>
            </svg>
            <p class="router-disc">{{ content.discription }}</p>
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class RouterCard extends Vue {
    @Prop(Object) content: any
    offsetX: number = 0
    offsetY: number = 0
    positionX: number = 0
    positionY: number = 0
    mouseIn: boolean = false
    displacementX: number = 0
    displacementY: number = 0

    onMousemove(event: MouseEvent):void {
      if (this.mouseIn === false) this.mouseIn = true
      const x = event.clientX
      const y = event.clientY
      // 鼠标第一次进入
      if (this.positionX === 0 && this.positionY === 0) {
        this.positionY = y
        this.positionX = x
        return
      }
      const container = this.$refs.container as HTMLElement
      const containerWidth = container.clientWidth
      const containerHeigh = container.clientHeight
      // 计算鼠标位移
      const displacementX = this.displacementX + (x - this.positionX)
      const displacementY = this.displacementY + (y - this.positionY)
      // 背景随鼠标偏移程度
      // leve = 10 表示鼠标在x或y轴反向移动距离占容器长或宽的 10% 则背景偏移0.1%的距离
      const level = 50
      // 计算偏移量
      this.offsetX = Math.round((displacementX / containerWidth) * 100) / level
      this.offsetY = Math.round((displacementY / containerHeigh) * 100) / level

      this.positionX = x
      this.positionY = y
      this.displacementX = displacementX
      this.displacementY = displacementY
    }

    onMouseleave():void {
      this.mouseIn = false
      // 坐标重新初始化
      this.positionY = 0
      this.positionX = 0
      this.offsetX = 0
      this.offsetY = 0
      this.displacementX = 0
      this.displacementY = 0
    }
}
</script>

<style scoped>
.router-card-container {
  width: 100%;
}

.router-link, .router-card-container {
  display: block;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.router-info {
  font-family: NotoSerifCJKsc-Regular;
  position: absolute;
  width: 100%;
  height: 100%;
  top:0;
  left: 0;
  text-align: center; 
  color: white;
  font-size: 28px;
}

.router-info-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.router-disc {
  font-size: 15px;
}

.router-logo {
  width: 15px;
  height: 15px;
  fill: white;
}

.router-bg {
  position: relative;
  top: 0;
  left: 0;
  transform: translate(0px, 0px);
}

.router-bg-img {
  width: 100%;
  padding-bottom: 60%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  transform: scale(1.05);
  transition: transform 3600ms cubic-bezier(.165,.84,.44,1)
}

.router-info.active  {
  background-color: rgb(0 0 0 / 57%);
}

.router-bg-img.active {
  transform: scale(1.1);
}

</style>