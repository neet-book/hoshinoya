<template>
  <div class="grid-picture-group">
    <grid-picture class="group-grid-picture" :visible="visible">
      <template v-slot:cell1>
        <div class="cell-picture" :class="{ visible }" :style="{ backgroundImage: `url(${images[0]?.image.normal})` }"></div>
      </template>
      <template v-slot:cell2>
        <div class="cell-picture" :class="{ visible }" :style="{ backgroundImage: `url(${images[1]?.image.normal})` }"></div>
      </template>
      <template v-slot:cell3>
        <div class="cell-picture" :class="{ visible }" :style="{ backgroundImage: `url(${images[2]?.image.normal})` }"></div>
      </template>
      <template v-slot:cell4>
        <grid-picture :visible="visible">
          <template v-slot:cell1>
            <div class="cell-picture" :class="{ visible }" :style="{ backgroundImage: `url(${images[3]?.image.normal})` }"></div>
          </template>
          <template v-slot:cell2>
            <div class="cell-picture" :class="{ visible }" :style="{ backgroundImage: `url(${images[4]?.image.normal})` }"></div>
          </template>
          <template v-slot:cell3>
            <div class="cell-picture" :class="{ visible }" :style="{ backgroundImage: `url(${images[5]?.image.normal})` }"></div>
          </template>
          <template v-slot:cell4>
            <div class="cell-picture" :class="{ visible }" :style="{ backgroundImage: `url(${images[6]?.image.normal})` }"></div>
          </template>
        </grid-picture>
      </template>
    </grid-picture>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import GridPicture from './GridPicture'
@Component({ components: { GridPicture } })
export default class GridPictureGroup extends Vue {
  @Prop({ type: Array, default: [] }) images
  @Prop(Boolean) visible: boolean
}
</script>

<style scoped>
.grid-picture-group,
.group-grid-picture {
  width: 100%;
  height: 100%;
}

.cell-picture {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 4px;

  opacity: 1;
  transition: opacity 900ms cubic-bezier(.445,.05,.55,.95);
  transition-delay: 400ms;
}

.visible {
  opacity: 1;
  transition: opacity 700ms cubic-bezier(.445,.05,.55,.95);
  transition-delay: 200ms;
}
</style>