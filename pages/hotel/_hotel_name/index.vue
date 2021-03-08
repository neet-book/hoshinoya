<template>
  <div class="hotel">
    <header>
        <div class="hotel-header-container">
            <div class="hotel-header-logo"></div>
            <div class="hotel-header-title"></div>
            <div class="hotel-header-disc"></div>
        </div>
    </header>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
    layout: 'hotel'
})
export default class Hotel extends Vue {
  
}
</script>

<style scoped>

</style>
