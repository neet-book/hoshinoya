<template>
  <div class="carousel-navi">
    <div class="navi-container">
      <ul>
        <li class="navi-item" v-for="n of count" :key="n" :class="{ active: n === activeIndex }">
          <span></span>
          <div></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { DIRECTION } from './carouseler'

@Component
export default class CarouselNav extends Vue {
  @Prop(Number) count: number | undefined
  @Prop({ type: Number, default: DIRECTION.LEFT }) direction: number | undefined
  @Prop(Number) interval: number | undefined

  activeIndex: number = 1 
}
</script>

<style scoped>
.carousel-navi, .navi-container {
  height: 20px;
}

.navi-container > ul {
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navi-item {
  height: 20px;
  width: 20px;
  text-align: center;
  vertical-align: middle;

  display: flex;
  align-items: center;

  position: relative;
}

.navi-item > span,
.navi-item > i {
  display: block;
  content: '';
}

.navi-item > span {
  width: 3px;
  height: 3px;
  border-radius: 99999px;
  background: black;
  opacity: 0.2;
}

.navi-item.active > span{
  width: 9px;
  height: 9px;
  opacity: 1;
}

.navi-item > div {
  /* border-bottom: solid 1px black; */
  font-style: normal;
  position: absolute;
  top: 10px;
  /* transform: translateY(-50%); */
}

.navi-item.active > div {
  width: 20px;
}
</style>