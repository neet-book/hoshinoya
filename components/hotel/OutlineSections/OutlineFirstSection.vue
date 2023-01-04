<template>
  <div class="outline-first-section" >
    <outline-title class="outline-title" :title="content.title" :show="showTitle" ref="title"></outline-title>
    <carousel :items="content.carouselItems"></carousel>
    <div class="disc-text">
      {{ content.disc }}
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import OutlineTitle from '~/components/hotel/OutlineTitle.vue'
import Carousel from '~/components/hotel/Carousel/Carousel.vue'
import Dining from "../../../pages/hotel/_hotel_name/dining.vue";

@Component({
  components: {
    Dining,
    OutlineTitle,
    Carousel
  }
})
export default class OutlineFirstSection extends Vue {
  @Prop(Object) content: Hotel.OutlineFirstSection | undefined
  isShowed: boolean = false
  get showTitle(): boolean {
    if (!this.isShowed) {
      const distance = this.$store.state.distance
      const title = this.$refs.title as Vue
      if (title) {
        const el = title.$el as Element
        this.isShowed = distance + window.innerHeight > el.offsetTop
      }
    }
    return this.isShowed
  }
}
</script>

<style scoped>
.outline-first-section {
  padding-bottom: 115px;
}
.outline-title {
  margin-bottom: 50px;
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
</style>