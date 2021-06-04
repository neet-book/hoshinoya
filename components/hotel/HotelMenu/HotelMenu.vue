<template>
  <div class="hotel-menu">
    <hotel-menu-bar class="menu-bar" :hotel-name="hotel.nameEn"  @menu-click="isOpen = $event" />
    <div class="menu-content-container" :class="{ 'content-open': isOpen }">
      <hotel-menu-area
        class="menu-area"
        :hotel-name="hotel.name"
        :logo="hotel.logo"
        :rate-list="rateList"
        :page="page"
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
  @Prop({ type: Object, required: true }) hotel: Hotel | undefined
  @Prop({ type: Array, required: true }) rateList: any[] | undefined
  // 当前位于哪个介绍页面
  @Prop({ type: String, required: true }) page: string | undefined
  isOpen : boolean = false
}
</script>

<style scoped>
.hotel-menu {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
}

.menu-content-container {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  background: white;
  position: absolute;
  left: -100%;
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
  /* transition: opacity 100ms cubic-bezier(.455,.03,.515,.955) 200ms; */
}

.content-open {
  left: 0;
}

.menu-bar {
  position: absolute; 
  left: 0;
}

.menu-text-bar {
  width: 110px;
  height: 100vh;
  top: 0;
  right: 0;
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