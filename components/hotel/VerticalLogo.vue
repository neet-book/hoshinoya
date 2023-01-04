<template>
  <div class="vertical-logo">
    <div class="logo-container">
      <svg viewBox="0 0 114 114">
        <use v-bind="{ 'xlink:href': logo }"></use>
      </svg>
      <svg viewBox="0 0 114 114">
        <use xlink:href="#logo-hoshinoya-text"></use>
      </svg>
      <svg viewBox="0 0 114 114">
        <use xlink:href="#logo-hoshinoya-mark"></use>
      </svg>
    </div>
    <div class="hotel-name">
      <p>虹夕诺雅</p>
      <p>{{ hotelName }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'

/**
 * 垂直展示logo和酒店名
 */
@Component
export default class VerticalLogo extends Vue {
  get logo() {
    return '#logo-hotel-' + this.$store.state.hotelNameEn
  }
  get hotelName() {
    return this.$store.state.hotelName || ' '
  }
}
</script>

<style scoped>
.vertical-logo {
  text-align: center;
  color: inherit;
  font-size: inherit;
}

.logo-container {
  max-width: 100px;
  width: 2.5em;
  margin: 0 auto;
  /*fill: black;*/
}
.logo-container > svg {
  margin-top: 5px;
}

.hotel-name {
  margin-top: 18px;
}

.hotel-name > p {
  margin: 0 0 5px;
}

.hotel-name p:last-child {
  font-size: 0.84em;
}
</style>