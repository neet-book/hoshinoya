<template>
  <div class="carousel">
    <div class="carousel-area" :style="{ height: areaHeight + 'px' }">
      <div class="carousel-items-container">
        <carousel-item
          class="carousel-item"
          v-for="itemInfo of items.slice(0, 1)"
          :key="itemInfo.title"
          :info="itemInfo"
          :style="{ width: areaHeight * 1.5 + 'px', height: areaHeight + 'px' }"
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
    that.areaHeight = window.innerHeight * 0.66
  }
})
export default class Carousel extends Vue
{
  @Prop(Array) items: CarouselItemInfo[] | undefined
  areaHeight: number = 0
  itemWidth: number = 0
}
</script>

<style scoped>
.carousel-items-container {
  position: relative;
  height: inherit;

  display: flex;
  flex-wrap: nowrap;
}

</style>