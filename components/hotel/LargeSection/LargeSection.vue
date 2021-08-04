<template>
  <div class="large-section">
    
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
@Component
export default class LaroogeSection extends Vue {
  @Prop() lageSection: Hotel.LargeSection | undefined 
}
</script>


<style scoped>
</style>