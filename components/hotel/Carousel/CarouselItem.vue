<template>
  <div class="carousel-item">
    <span class="carousel-title">{{ info.title }}</span>
    <div class="carousel-body">
      <div
        class="carousel-image"
        :class="{ click }"
        :style='{ backgroundImage: `url("${info.image.normal}")` }'
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
export interface ImageSource {
  big?: string,
  normal?: string
  small?: string
  square?: string

}
export interface CarouselItemInfo {
  image: ImageSource
  title: string
}

import {Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class CarouselItem extends Vue {
  @Prop(Object) info: CarouselItemInfo  | undefined
  click: boolean = true
}
</script>

<style scoped>
.carousel-item {
  box-sizing: border-box;
  height: 100%;
  padding-left: 49px;
  position: relative;
}
.carousel-title {
  position: absolute;
  left: 31px;
  font-weight: 399;
  letter-spacing: 0;
  color: rgb(101, 102, 102);
  font-size: 11px;

  /* 标题旋转89度 */
  transform: rotate(89deg);
  transform-origin: left bottom;
}
.carousel-body {
  height: 99%;
}
.carousel-image {
  width: inherit;
  height: inherit;
  border-radius: 3px;
}
.carousel-image {
  background-size: 103% 104%;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>