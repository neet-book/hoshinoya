<template>
  <div class="large-section">
    
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
@Component
export default class LaroogeSection extends Vue {
  @Prop() content: Hotel.LargeSection | undefined 
  get hoteNameEn(): string {
    return this.$store.state.hoteName
  }
}
</script>

<style scoped>
.large-section {
  padding-top: 170px;
}
</style>