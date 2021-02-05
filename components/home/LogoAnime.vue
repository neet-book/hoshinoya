<template>
  <div class="logo-anime">
    <ul>
      <li 
        v-for="logo in logos" :key="logo.number" 
        class="logo"
        :class="{ hidden: logo.number === hiddenLogo, visible: logo.number == current}">
        <svg>
          <use v-bind="{ 'xlink:href': '#' + logo.logoname }"></use>
        </svg>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

interface Logo {
  number: number
  logoname: string
}

@Component
export default class LogoAnime extends Vue {
  @Prop(Array) logos: Logo[] | undefined
  @Prop(Number) current: number | undefined
  prevLogo:number = 1

  get hiddenLogo() {
    const prevLogo = this.prevLogo
    this.prevLogo = this.current
    return prevLogo
  }
}
</script>

<style scoped>
.logo-anime, .logo-anime > ul, .logo-anime > ul > li, svg {
  width: 100%;
  height: 100%;
}

.logo-anime > ul {
  position: relative;
}

.logo-anime > ul > li {
  position: absolute;
  top: 0;
  left: 0;
}

svg {
  width: 100%;
  height: 100%;
  fill: white;
}

.logo svg {
  clip-path: circle(50% at 150% 50%);
}

.visible svg {
  /* opacity: 1; */
  clip-path: circle(50% at 50% 50%);
  transition: clip-path;
  transition-duration: 350ms;
  transition-delay: 240ms;
  transition-timing-function: cubic-bezier(.55,.085,.68,.53) !important;
}

.hidden svg {
  clip-path: circle(50% at -150% 50%);
  transition:clip-path 350ms cubic-bezier(.55,.085,.68,.53) !important;
 
}

</style>
