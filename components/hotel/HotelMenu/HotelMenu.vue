<template>
  <div class="hotel-menu">
    <hotel-menu-bar class="menu-bar"  @menu-click="isOpen = $event" />
    <div class="menu-content-container" :class="{ 'content-open': isOpen }">
      <!-- 菜单内容区域 -->
      <hotel-menu-area
        class="menu-area"
        :class="{ 
          'area-visible': isOpen,
          'area-hidden': !isOpen
        }" 
      />
      <div
        class="menu-text-bar"
        :class="{ 'menu-text-bar-hidden': !isOpen }"
      ><span>MENU</span></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import HotelMenuBar from './HotelMenuBar.vue'
import HotelMenuArea from './HotelMenuArea.vue'

interface Hotel {
  name: string
  nameEn: string
  logo: string
}

@Component({
  components: {
    HotelMenuBar,
    HotelMenuArea
  }
})
export default class HotelMenu extends Vue {
  isOpen : boolean = false
}
</script>

<style scoped>
.hotel-menu {
  font-family: "Helvetica Neue LT W01_55 Roman", hsn-zhcn-sans-demilight, hsn-zhtw-sans-demilight, sans-serif;

  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 100;
}

.menu-content-container {
  width: 100vw;
  height: 100%;
  display: inline-block;
  overflow-y: hidden;
  position: absolute;
  top: 0;
  left: -100vw;
  transition: left 400ms cubic-bezier(.165,.84,.44,1);
  transition-delay: 100ms;
}

.area-visible {
  opacity: 100;
  transition: opacity 800ms cubic-bezier(.455,.03,.515,.955) 200ms;
}

.area-hidden {
  opacity: 0;

  transition: opacity 300ms cubic-bezier(.25,.46,.45,.94);
}

.content-open {
  left: 0;
  width: 100vw;
  background: white;
}

.menu-bar {
  position: absolute; 
  left: 0;
  z-index: 100;
}

.menu-text-bar {
  width: 110px;
  height: 100vh;
  top: 0;
  right: 17px;
  position: fixed;
  font-family: BauerBodoni;
  writing-mode: vertical-rl;
  font-size: 11px;
  vertical-align: middle;
  letter-spacing: 1.8px;
  word-break: break-all;
  text-align: center;

  transition: opacity 400ms cubic-bezier(.165,.84,.44,1) 200ms;
}

.menu-text-bar > span {
  position: absolute;
  top: 50%;
  right: 55px;
  transform: translate(-50%, -50%);
  width: 1em;
  cursor: default;
}

.menu-text-bar-hidden{
  opacity: 0;
  transition: opacity 200ms cubic-bezier(.165,.84,.44,1);
}


@media screen and (max-width: 950px) {
  .menu-text-bar,
  .menu-text-bar > span {
    opacity: 0;
  }
}

</style>