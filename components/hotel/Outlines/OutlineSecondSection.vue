<template>
  <div class="outline-second-section">
    <outline-title class="outline-title" :title="content.title" :show="showTitle" ref="title"></outline-title>
    <grid-picture class="grid-picture">
      <template v-slot:cell1>
        <div class="cell-picture" :style="{ backgroundImage: `url(${content.grids[0].image.normal})` }"></div>
      </template>
      <template v-slot:cell2>
        <div class="cell-picture" :style="{ backgroundImage: `url(${content.grids[1].image.normal})` }"></div>
      </template>
      <template v-slot:cell3>
        <div class="cell-picture" :style="{ backgroundImage: `url(${content.grids[2].image.normal})` }"></div>
      </template>
      <template v-slot:cell4>
        <div class="cell-picture" :style="{ backgroundImage: `url(${content.grids[3].image.normal})` }"></div>
      </template>
    </grid-picture>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator'
import OutlineTitle from '../OutlineTitle'
import GridPicture from '../GridPicture.vue'

@Component({
  components: { OutlineTitle, GridPicture }
})
export default class OutlineSecondSection extends Vue {
  @Prop(Object) content: Hotel.OutlineSecondSection | undefined
  isShowed: boolean = false
  get showTitle(): boolean {
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
.grid-picture {
  width: 620px;
  height: 620px;
}

.cell-picture {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}

</style>