<template>
  <div class="large-section">
    <h2 class="outline-title">
      <template v-for="(text, index) in content.title.split('\n')">{{ text }}<br :key="index">
      </template>
      <svg viewBox="0 0 35 35">
        <use v-bind="{ 'xlink:href': `#logo-hotel-${hotelNameEn}-small` }"></use>
      </svg>
    </h2>
    <div class="outline-content">
      {{ content.content }}
    </div>
    <!-- 圆形图 -->
    <div class="switch-area">
      <div class="circle-image">
        <div
          class="circle-image-body"
          :style="{ backgroundImage: `url(${content.circleImage.normal})` }"
        ></div>
      </div>
    </div>
    <div class="map-image">
        <div 
          class="map-image-body"
          :style="{ backgroundImage: `url(${content.mapImage.normal})` }"
        ></div>
      </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
@Component
export default class LaroogeSection extends Vue {
  @Prop() content: Hotel.LargeSection | undefined 
  get hotelNameEn(): string {
    return this.$store.state.hotelNameEn
  }
}
</script>

<style scoped>
.large-section {
  padding-top: 170px;
  font-family: "hsn-zhcn-serif-light" , serif;
}

.outline-title {
  position: relative;
  margin-bottom: 50px;
  padding-bottom: 48px;

  text-align: center;
  vertical-align: baseline;
  letter-spacing: 3px;
  font-size: 28px;
  line-height: 44px;
  font-weight: 400;
}

.outline-title > svg {
  width: 16px;
  height: 16px;
  fill: black;
  stroke: black;

  position: absolute;
  bottom: 0;
}

.outline-content {
  max-width: 480px;
  margin: auto;
  
  font-family: 'hsn-zhcn-sans-light', 'sans-serif';
  color: rgb(51, 51, 51);
  font-size: 15px;
  line-height: 32px;
  letter-spacing: 2.4px;
  text-align: justify;
  text-align-last: center;
}

.switch-area {
  width: 80vh;
  height: 80vh;
  padding: 50px 0;
  margin: auto;
}

.circle-image {
  height: 100%;
  width: 100%;
  margin: auto;
  border-radius: 9999px;
  overflow: hidden;
}

.circle-image-body {
  height: 100%;
  width: 100%;

  background-size: cover;
  background-position: center;
}

.map-image {
  height: 480px;
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
}

.map-image-body {
  height: 100%;
  width: 100%;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>