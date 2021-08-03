<template>
  <div>
    <logo-svg />
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LogoSvg from '~/components/LogoSvg.vue'

@Component({
  components: {
    LogoSvg
  }
})
export default class DefaultLayout extends Vue {}

</script>

<style>
</style>
