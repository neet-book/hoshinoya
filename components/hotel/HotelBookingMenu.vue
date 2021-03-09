<template>
  <div class="booking-menu">
    <div class="menu-bar">
      <div class="menu-bar-icon">
        <div class="menu-bar-icon-menu"></div>
        <div class="menu-bar-icon-close"></div>
      </div>
      <div class="nemu-bar-name">HOSHINOYA {{ hotel | nameFilter }}</div>
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
  position: absolute;
  height: 100%;
  width: 110px;
}

.menu-bar:hover {
  background-color: #e6e6e6;
}

.menu-bar::before {
  content: ' ';
  width: 1px;
  height: 32px;
  background-color: #ccc;

  position: absolute;
  right: 0;
}

.nemu-bar-name {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1em;

  font-family: BauerBodoni;
  writing-mode: vertical-rl;
  font-size: 11px;
  letter-spacing: 1.8px;
  word-break: break-all;
  text-align: center;
}

.menu-bar-icon {
  position: absolute;
  width: 38px;
  height: 38px;
  left: 50%;
  transform: translateY(-50%);
}

.menu-bar-icon-nemu {
  background-image: url('');
}
</style>