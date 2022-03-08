<template>
  <div class="outline-first-section" >
    <outline-title class="outline-title" :title="content.title" :show="showTitle" ref="firstTitle"></outline-title>
    <transition-text :content="content.title" :show="showTitle"></transition-text>
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
      const firstTitle = this.$refs.firstTitle as Vue
      if (firstTitle) {
        this.isShowed = distance + window.innerHeight > firstTitle.$el.offsetTop
      }
    }
    return this.isShowed
  }
}
</script>

<style scoped>
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