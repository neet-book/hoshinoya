<template>
  <div class="container">
    <logo-svg />
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LogoSvg from '/components/LogoSvg.vue'
@Component({
  components: { LogoSvg }
})
export default class HotelLayout extends Vue {
  
}
</script>

<style scoped>

</style>
