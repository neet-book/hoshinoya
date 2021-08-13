<template>
  <div class="carrousel-area">
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

interface image {
  title: string,
  image: Hotel.ImageUrl
}

@Component
export default class Carrousel extends Vue {
  @Prop(Array) images: image[] | undefined 
}
</script>


<style scoped>
</style>