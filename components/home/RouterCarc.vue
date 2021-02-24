<template>
  <div class="router-card">
    <nuxt-link calss='router-link' :to="'/hotel' + content.nameEN">
      <div class="router-card-container"
        @mousemove="onMousemove"
        @mouseleave="onMouseleave"
      >
        <div class="router-bg" 
          :style="{ transform: 'translate(' + offsetX + 'px, ' + offsetY + 'px)' }"
        >
          <div 
          class="router-bg-img" 
          :class="{ active: mouseIn }"
          :style="{ backgroundImage: `url(${content.sourceSmall})`}"
        ></div>
        </div>
        <div class="router-info" :class="{ active: mouseIn }">
          <div class="router-name">{{ content.name }}</div>
          <svg class="router-logo">
            <use v-bind="{ 'xlink:href': '#' + content.logo }"></use>
          </svg>
          <p class="router-disc">{{ content.discription }}</p>
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

    onMousemove(event: MouseEvent):void {
      const x = event.clientX
      const y = event.clientY
      // 鼠标进入坐标
      this.mouseIn = true
      if (this.positionX === 0 && this.positionY === 0) {
        this.positionY = y
        this.positionX = x
        return
      }
      this.offsetX = (this.positionX - x)
      this.offsetY = (this.positionY - y)

      
    }

    onMouseleave():void {
      this.mouseIn = false
      // 坐标重新初始化， 坐标复位
      this.positionY = 0
      this.positionX = 0
      this.offsetX = 0
      this.offsetY = 0
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

.router-logo {
  width: 15px;
  height: 15px;
  fill: white;
}

.router-info {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
}

.router-info.active  {
  background-color: rgb(0 0 0 / 57%);
}
.router-bg {
  position: relative;
  top: 0;
  left: 0;
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


.router-bg-img.active {
  transform: scale(1.1);
  background-color: rgb(0 0 0 / 57%);
}


.router-info {
  color: white;
}
</style>