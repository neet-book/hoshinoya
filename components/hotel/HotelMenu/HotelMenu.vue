<template>
  <div class="hotel-menu">
    <hotel-menu-bar :hotel-name="hotel.nameEn" class="menu-bar" @menu-click="isOpen = $event" />
    <hotel-menu-area
      v-show="isOpen"
      :hotel-name="hotel.name"
      :logo="hotel.logo"
      :rate-list="rateList"
      :page="page"
      :open="isOpen"
      class="menu-area" />
    <div class="menu-area-bar"><span>MENU</span></div>
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
  min-width: 920px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: scroll;
}

.menu-bar {
  position: fixed;
  left: 0;
}

.menu-area-bar {
  width: 110px;
  height: 100%;
  right: 0;
  position: fixed;
  font-family: BauerBodoni;
  writing-mode: vertical-rl;
  font-size: 11px;
  vertical-align: middle;
  letter-spacing: 1.8px;
  word-break: break-all;
  text-align: center;
}

.menu-area-bar > span {
  position: fixed;
  top: 50%;
  right: 55px;
  transform: translate(-50%, -50%);
  width: 1em;
}

</style>