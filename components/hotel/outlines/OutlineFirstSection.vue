<template>
  <div class="outline-frist-section">
    <outline-title class="outline-title" :title="content.title" :show="outlineTitleShowed"></outline-title>
    <carrousel images="content.carrouselItems"></carrousel>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import OutlineTitle from '~/components/hotel/OutlineTitle.vue'
import Carrousel from '~/components/hotel/Carrousel.vue'

@Component({
  components: {
    OutlineTitle,
    Carrousel 
  }
})
export default class OutlineFristSection extends Vue {
  @Prop(Object) content: Hotel.OutlineFirstSection | undefined 
}
</script>

<style scoped>
.outline-title {
  margin-bottom: 50px;
}
</style>