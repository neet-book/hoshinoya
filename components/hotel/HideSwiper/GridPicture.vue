<template>
  <div class="grid-picture">
    <div class="grid-container" :class="{ visible }">
      <!-- 左上角 图片1 -->
      <div class="grid-cell grid-cell1">
        <slot name="cell1"></slot>
      </div>
      <!-- 右上角 图片2 -->
      <div class="grid-cell grid-cell2">
        <slot name="cell2"></slot>
      </div>
      <!-- 左下角 图片3 -->
      <div class="grid-cell grid-cell3">
        <slot name="cell3"></slot>
      </div>
      <!-- 右下角 图片4 -->
      <div class="grid-cell grid-cell4">
        <slot name="cell4"></slot>
      </div>
      <!-- 十字遮罩 -->
      <div class="grid-line"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class GridPicture extends Vue {
  @Prop(Boolean) visible: boolean | undefined
}
</script>

<style scoped>
.grid-picture,
.grid-container {
  width: 100%;
  height: 100%;
}
.grid-container {

  position: relative;
  border-radius: 4px;
  overflow: hidden;

  display: flex;
  flex-wrap: wrap;
}

.grid-cell {
  flex-shrink: 0;
  width: 50%;
  height: 50%;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 900ms cubic-bezier(.445,.05,.55,.95);
  transition-delay: 400ms;
  box-shadow: 0 1px 4px 0 rgb(4 0 0 / 10%) inset;
}

.visible>.grid-cell {
  opacity: 1;
  transition: opacity 700ms cubic-bezier(.445,.05,.55,.95);
  transition-delay: 200ms;
}

.grid-line {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}

.grid-line::after,
.grid-line::before {
  transform-origin: center center;
  transition: transform 600ms cubic-bezier(.455,.03,.515,.955);
  transition-delay: 500ms;
}

/* 横 */
.grid-line::before {
  content: '';
  width: 100%;
  height: 20px;
  margin-top: -10px;

  background: #fff;

  position: absolute;
  top: 50%;
  transform: scale(1, 0);
}

/* 竖 */
.grid-line::after {
  content: '';
  height: 100%;
  width: 20px;
  margin-left: -10px;
  background: #fff;

  position: absolute;
  left: 50%;
  transform: scale(0, 1);
}

.visible>.grid-line::after,
.visible>.grid-line::before {
  transform: scale(1);
  transition: transform 600ms cubic-bezier(.455,.03,.515,.955);
  transition-delay: 0ms;
}
</style>
