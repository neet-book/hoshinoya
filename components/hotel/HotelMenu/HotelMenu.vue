<template>
  <div class="hotem-menu">
    <hotel-menu-bar :hotel="hotel" />
    <hotel-menu-area :hotel="hotel" />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import HotelMenuBar from './HotelMenuBar.vue'
import HotelMenuArea from './HotelMenuArea.vue'

@Component({
  components: {
    HotelMenuBar,
    HotelMenuArea
  }
})
export default class HotelMenu extends Vue {
  @Prop(String) hotel: string | undefined
}
</script>

<style scoped>
</style>