<template>
  <div class="tail-picture">
    <div class="tail-container">
        <div class="cover" :style="crossCover"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class TailPicture extends Vue {
  get crossCover() {
  let clearance = 2
  let half = Math.round(clearance / 2)
  let unit = '%'
  let main = [
    [[0, 50 - half], [50 - half, 50 - half], [50 + half, 50 - half], [100, 50 - half]],
    [[0, 50 + half], [50 - half, 50 + half], [50 + half, 50 + half], [100, 50 + half]],
  ]

  let cross = [
    [[50 - half, 0], [50 - half, 100]],
    [[50 + half, 0], [50 + half, 100]],
  ]

    let [[mainTop1, mainTop2, mainTop3, mainTop4], [mainBootem1, mainBootem2, mainBootem3, mainBootem4]] = main
    let [[crossLeft1 ,crossLeft2], [closeRight1, closeRight2]] = cross

    let clipPath = `
        polygon(
        ${mainTop1[0]}${unit} ${mainTop1[1]}${unit},
        ${mainTop2[0]}${unit} ${mainTop2[1]}${unit},
        ${crossLeft1[0]}${unit} ${crossLeft1[1]}${unit}, 
        ${closeRight1[0]}${unit} ${closeRight1[1]}${unit},
        ${mainTop3[0]}${unit} ${mainTop3[1]}${unit}, 
        ${mainTop4[0]}${unit} ${mainTop4[1]}${unit},
        ${mainBootem4[0]}${unit} ${mainBootem4[1]}${unit}, 
        ${mainBootem3[0]}${unit} ${mainBootem3[1]}${unit},
        ${closeRight2[0]}${unit} ${closeRight2[1]}${unit}, 
        ${crossLeft2[0]}${unit} ${crossLeft2[1]}${unit},
        ${mainBootem2[0]}${unit} ${mainBootem2[1]}${unit}, 
        ${mainBootem1[0]}${unit} ${mainBootem1[1]}${unit});
      `
    clipPath = clipPath.split('\n').join('').replace(/ */sm, '')
    console.log(clipPath)
    return {
      clipPath
    }
  }
}
</script>

<style scoped>
.container {
    width: 300px;
    height: 300px;
    background-color: black;
}
.cover {
  width: 300px;
  height: 300px;
  background-color: rgb(82, 82, 82);
  
}
</style>
