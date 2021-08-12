<template>
  <h2 class="outline-title" :class="{ show }">
    <span 
      v-for="(text, index) in title.split('\n')"
      :style="{ 'transition-delay': index * 100 + 'ms' }"
      :key="index">{{ text }}<br :key="'br' + index">
    </span>
    <svg viewBox="0 0 35 35">
      <use v-bind="{ 'xlink:href': `#logo-hotel-${hotelNameEn}-small` }"></use>
    </svg>
  </h2>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component
export default class  extends Vue {
  @Prop(String) title: string | undefined
  @Prop(Boolean) show: boolean | undefined
  get hotelNameEn(): string {
    return this.$store.state.hotelNameEn
  }
}
</script>


<style scoped>
.outline-title {
  position: relative;


  text-align: center;
  vertical-align: baseline;
  letter-spacing: 3px;
  font-size: 28px;
  line-height: 44px;
  font-weight: 400;
  
}

.outline-title > span {
  opacity: 0;
  transition: opacity 900ms cubic-bezier(.445,.05,.55,.95);
}

.outline-title.show > span {
  opacity: 1;
}

.outline-title > svg {
  width: 16px;
  height: 16px;
  fill: black;
  stroke: black;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
}

</style>