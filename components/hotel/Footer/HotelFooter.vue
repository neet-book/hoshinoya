<template>
  <div>
   <vertical-logo></vertical-logo>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'
import VerticalLogo from '/components/hotel/VerticalLogo'

@Component({
  components: { VerticalLogo }
})
export default class HotelFooter extends Vue {

}
</script>

<style scoped>

</style>