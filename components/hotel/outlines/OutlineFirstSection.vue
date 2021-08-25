<template>
  <div class="outline-frist-section">
    <outline-title class="outline-title" :title="content.title" :show="outlineTitleShowed"></outline-title>
    <carousel :images="content.carouselItems"></carousel>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import OutlineTitle from '~/components/hotel/OutlineTitle.vue'
import Carousel from '~/components/hotel/carousel/Carousel.vue'

@Component({
  components: {
    OutlineTitle,
    Carousel 
  }
})
export default class OutlineFristSection extends Vue {
  @Prop(Object) content: Hotel.OutlineFirstSection | undefined
  outlineTitleShowed = false
}
</script>

<style scoped>
.outline-title {
  margin-bottom: 50px;
}
</style>