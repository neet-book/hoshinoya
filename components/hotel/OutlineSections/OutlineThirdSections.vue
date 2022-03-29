<template>
  <div class="outline-third-section">
    <outline-title :title="content.title" :show="showTitle" ref="title"></outline-title>
    <carousel :items="items" class="carousel"></carousel>
    <div class="disc-text">
      {{ content.disc }}
    </div>
    <div class="sub-disc">
      <h3 class="sub-title">
        {{ content.subDisc.title }}
      </h3>
      <div class="sub-content" >{{ content.subDisc.content }} </div>
      <div v-pre v-text="null"></div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator'
import Carousel from '/components/hotel/Carousel/Carousel'
import OutlineTitle from '/components/hotel/OutlineTitle'

@Component({
  components: { Carousel, OutlineTitle },
})
export default class OutlineThirdSections extends Vue {
  @Prop(Object) content: Hotel.OutlineThirdSection
  isShowed:boolean = false

  get items() {
    const { carouselItems } = this.content;
    return carouselItems
  }

  get showTitle() {
    if (!this.isShowed) {
      const distance = this.$store.state.distance
      const title = this.$refs.title as Vue
      if (title) {
        this.isShowed = distance + window.innerHeight > title.$el.offsetTop
      }
    }
    return this.isShowed
  }

}
</script>

<style scoped>
.outline-third-section {
  margin-top: 90px;
}
.carousel {
  margin-top: 50px;
}

.disc-text {
  padding-top: 50px;
  width: 480px;
  margin: 10px auto;
  font-family: 'hsn-zhcn-sans-light', 'sans-serif';
  font-size: 15px;
  text-align-last: center;
  line-height: 32px;
  letter-spacing: 2.4px;
  color: rgb(51, 51, 51);
}

.sub-disc {
  max-width: 480px;
  margin: 65px auto 0;
  letter-spacing: 2px;
  color: black;
}

.sub-title {
  letter-spacing: 2px;
  font-family: 'hsn-zhcn-serif-light', 'serif';
  font-size: 18px;
  font-weight: 400;
  line-height: 32px;
  text-align: center;
}

.sub-content {
  color: rgb(51, 51, 51);
  font-size: 15px;
  hyphens: auto;
  line-height: 32px;
  letter-spacing: 2.4px;
  margin-top: 34px;
  text-align-last: center;
  font-family: 'hsn-zhcn-sans-light', 'serif';
}
</style>
