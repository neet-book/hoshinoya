<template>
  <div class="logo-anime">
    <ul>
      <li 
        v-for="logo in logos" :key="logo.number" 
        v-show="current == logo.number"
        :class="{ hidden: current !== logo.number }">
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
}
</script>

<style scoped>
.logo-anime > ul {
  position: relative;
}

.logo-anime > ul > li {
  position: absolute;
  top: 0;
  left: 0;
}

svg {
  width: 60px;
  height: 60px;
  fill: white;
  clip-path:circle(30px at 30px 30px);
}

.hidden svg {
  clip-path:circle(26px at -52px 26px);
  transition:all 240ms cubic-bezier(.55,.085,.68,.53) !important;
}
</style>
