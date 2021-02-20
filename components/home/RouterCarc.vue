<template>
  <div class="router-card">
      <div class="card-container">
          <div class="card-name"></div>
          <div class="card-logo"></div>
          <p class="disc"></p>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class RouterCard extends Vue {
    @Prop(Object) content: any
}
</script>

<style >

</style>