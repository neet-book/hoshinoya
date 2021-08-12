<template>
  <div class="carrousel-area">
    <outline-title class="outline-title" :title="content.title" ></outline-title>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
@Component
export default class Carrousel extends Vue {
    @Prop(Object) content: Hotel.OutlineFirstSection | undefined 
}
</script>


<style scoped>
</style>