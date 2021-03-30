<template>
  <div class="hotel-menu">
    <hotel-menu-bar :hotel-name="hotel.nameEn" class="menu-bar" @menu-click="inOpen = $event" />
    <hotel-menu-area
      :hotel-name="hotel.name"
      :logo="hotel.logo"
      :rate-list="rateList"
      :page="page"
      :open="isOpen"
      class="menu-area" />
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
  right: 0;
}


</style>