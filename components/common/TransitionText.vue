<template>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator'
import { randomInt } from "../../utils/tools";

@Component({

})
export default class TransitionText extends Vue {
  @Prop(String) content: string | undefined
  @Prop(Boolean) show: boolean | undefined
  render(createElement) {
    const children = [],
      numList = []
    for (let i in this.content) numList.push(i)

    for (let char of this.content) {
      if (char !== '\n') {
        const num = numList.splice(randomInt(numList.length - 1), 1)[0]
        children.push(createElement('span', {
          style: { transitionDelay:  num + '00ms'},
          class: { show: this.show },
          innerText: char
        }))
      } else {
        children.push(createElement('br'))
      }

    }
    return createElement(
      this.type,
      { class: 'transition-text' }, children),
      children
  }
}

</script>

<style scoped>
.transition-text > span {
  transition: opacity 900ms cubic-bezier(.445,.05,.55,.95);
  opacity: 0;
}

.show {
  opacity: 1;
}
</style>