<template>
  <div class="hotel">
    {{ $route.params.hotel_name }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class LogoAnime extends Vue {
  
}
</script>

<style scoped>

</style>
