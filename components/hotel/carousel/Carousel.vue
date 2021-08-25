<template>
  <div class="carousel">
    <div class="carousel-area">
      <div class="carousel-container" ref="container">
        <div 
          v-for="(item, index) of images"
          class="carousel-item" :key="index"
          :style="{ width: itemWidth + 'px' }"
          ref="carr-item"
          @resize="onItemSizeChange"
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
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

interface image {
  title: string,
  image: Hotel.ImageUrl
}


@Component({
  mounted() {
    const that: any = this
    that.itemWidth = that.$refs.container.clientHeight * 1.5
  }
})
export default class Carousel extends Vue {
  @Prop(Array) images: image[] | undefined 
  itemWidth: number = 0
  onItemSizeChange(event: Event) {
    const el = event.target as Element
    this.itemWidth = el.clientHeight * 1.5
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