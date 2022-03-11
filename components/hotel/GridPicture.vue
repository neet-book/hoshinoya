<template>
  <div class="grid-picture">
    <div class="grid-container" :class="{ visible }">
      <div class="grid-cell grid-cell1">
        <slot name="cell1"></slot>
      </div>
      <div class="grid-cell grid-cell2">
        <slot name="cell2"></slot>
      </div>
      <div class="grid-cell grid-cell3">
        <slot name="cell3"></slot>
      </div>
      <div class="grid-cell grid-cell4">
        <slot name="cell4"></slot>
      </div>
      <div class="grid-line"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class GridPicture extends Vue {
  @Prop(Boolean) visible: boolean | undefined
  @Prop(Number) width: number | undefined
}
</script>

<style scoped>
.grid-container {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 4px;
  overflow: hidden;

  display: flex;
}

.grid-cell {
  width: 50%;
  height: 50%;
  border-radius: 4px;
}

.grid-line {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}

.grid-line::before {
  content: '';
  width: 100%;
  height: 20px;
  background: #fff;

  position: absolute;
  top: 50%;
  transform: translate3d(0, -50%, 0);
}

.grid-line::after {
  content: '';
  height: 100%;
  width: 20px;
  background: #fff;

  position: absolute;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}
</style>
