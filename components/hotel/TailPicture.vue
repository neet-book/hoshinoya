<template>
  <div class="tail-picture">
    <div class="tail-container">
        <div class="cover" :style="{ clipPath: crossCover }">
          <div class="image-body" :style="{ backgroundImage: `url(${picture})` }"></div>
        </div>
    </div>
    <div style="text-align: center">
      <button @click="opp === 50 ? opp = 3 : opp = 50">exchange</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class TailPicture extends Vue {
  @Prop(String) picture: string | undefined
  @Prop(Number) width: number | undefined
  opp = 2
  get crossCovers() {
    // 网格间隙站整体宽度的百分比
    let clearance = this.opp
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

    let [[mainTop1, mainTop2, mainTop3, mainTop4], [mainBottom1, mainBottom2, mainBottom3, mainBottom4]] = main
    let [[crossLeft1 ,crossLeft2], [closeRight1, closeRight2]] = cross

    let clipPath = `
        polygon(
        ${mainTop1[0]}${unit} ${mainTop1[1]}${unit},
        ${mainTop2[0]}${unit} ${mainTop2[1]}${unit},
        ${crossLeft1[0]}${unit} ${crossLeft1[1]}${unit},
        ${closeRight1[0]}${unit} ${closeRight1[1]}${unit},
        ${mainTop3[0]}${unit} ${mainTop3[1]}${unit},
        ${mainTop4[0]}${unit} ${mainTop4[1]}${unit},
        ${mainBottom4[0]}${unit} ${mainBottom4[1]}${unit},
        ${mainBottom3[0]}${unit} ${mainBottom3[1]}${unit},
        ${closeRight2[0]}${unit} ${closeRight2[1]}${unit},
        ${crossLeft2[0]}${unit} ${crossLeft2[1]}${unit},
        ${mainBottom2[0]}${unit} ${mainBottom2[1]}${unit},
        ${mainBottom1[0]}${unit} ${mainBottom1[1]}${unit});
      `
    clipPath = clipPath.split(/[\n\r]/).join('').replace(/\s{2}/sm, '')
    console.log(clipPath)
    return clipPath
  }

  get crossCover() {
    // const halfWidth = this.width / 2 || 0
    const halfWidth = this.opp
    // 十字剪切路径矩阵, 数组每个元素对于十字型的对应位置的顶点坐标
    const crossMatrix = [
      [[50 - halfWidth, 0], [50 + halfWidth, 0]],
      [[0, 50 - halfWidth], [50 - halfWidth, 50 - halfWidth], [50 + halfWidth, 50 - halfWidth], [100, 50 - halfWidth]],
      [[0, 50 + halfWidth], [50 - halfWidth, 50 + halfWidth], [50 + halfWidth, 50 + halfWidth], [100, 50 + halfWidth]],
      [[50 - halfWidth, 100], [50 + halfWidth, 100]]
    ]
    // css clipPath每个点对应crossMatrix的点
    const pointOrder = [[1, 0], [1, 1], [0, 0], [0, 1], [1, 2], [1, 3], [2, 3], [2, 2], [3, 1], [3, 0], [2, 1], [2, 0]]

    let path = ''
    // 将crossMatrix中每个点按pointOrder中定义的顺序拼接成clipPath
    for (let [i, x] of pointOrder) {
      path += `${crossMatrix[i][x][0]}% ${crossMatrix[i][x][1]}%, `
    }
    // 去掉最后逗号和空格
    path = path.slice(0, -2)
    return 'polygon(' + path + ')'
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
  background-color: white;
}
.image-body {
  width: 100%;
  height: 100%;
}
</style>
