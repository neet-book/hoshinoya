<template>
  <div class="booking-menu">
    <div class="menu-bar">
      <div class="menu-bar-icon"></div>
      <div class="nemu-bar-name">HOSHINOYA {{ hotel | nameFilter }}</div>
      <div class="calendar"></div><div>客房预订</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
@Component({
  filters: {
    nameFilter(name: string): string {
      return name.toUpperCase()
    }
  }
})
export default class HotelBookingMenu extends Vue {
  @Prop(String) hotel: string | undefined
}
</script>


<style scoped>
.menu-bar {
  width: 110px;
}

.nemu-bar-name {
  width: 1em;
  font-family: BauerBodoni;
  writing-mode: vertical-rl;
  font-size: 11px;
  letter-spacing: 1.8px;
  word-break: break-all;
  text-align: center;
}
</style>