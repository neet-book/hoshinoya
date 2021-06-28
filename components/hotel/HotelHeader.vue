<template>
    <div class="hotel-header-container">
        <div class="hotel-header-fonts">
            <div class="hotel-header-logos">
                <svg viewBox="0 0 114 114">
                <use v-bind="{ 'xlink:href': '#' + headerContent.logo }"></use>
                </svg>
                <svg viewBox="0 0 114 114">
                <use xlink:href="#logo-hoshinoya-text"></use>
                </svg>
                <svg viewBox="0 0 114 114">
                <use xlink:href="#logo-hoshinoya-mark"></use>
                </svg>
            </div>
            <div class="hotel-header-title">
                <p>虹夕诺雅</p>
                <p>{{ pageData.name }}</p>
                <p class="hotel-header-title-line" v-for="(row, row_index) of headerContent.copy.split('\n')" :key="`title-${row_index}`">
                <span 
                    v-for="(char, char_index) of row"
                    :class="{'text-visible': vi}"
                    :style="`transition-delay: ${ delayTime(row_index, char_index, row.length, headerContent.copy) }ms`" 
                    :key="`lien-${row_index}-${char_index}`"
                >{{char}}</span>
                </p>
            </div>
            <div class="hotel-header-disc" >
                <template v-for="(row, row_index) of pageData.discription.split('\n')">
                <template v-for="(char, char_index) of row">
                    <span
                    :class="{ 'text-visible': vi}"
                    :style="`transition-delay: ${delayTime(row_index, char_index, row.length, headerContent.discription, 10)}ms`" 
                    :key="row_index + '-' + char_index"
                    >{{char}}</span>
                </template>
                <br :key="row_index">
                </template>
            </div>
        </div>
        <div class="hotel-header-bg" :style="`background-image: url(/image/${headerContent.nameEn}/hotel_page_top_background.jpg)`"></div>
    </div>

</template>
<script lang="ts">
export interface HeaderData {
    logo: string
    name: string
    nameEn: string
    copy: string
    discription: string
}

import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({
    mounted() {
        const that: any = this
        // 加载完成后延迟显示文字内容
        setTimeout(() => {
            that.visible = true
        }, 200);
    }
})
export default class  extends Vue {
    @Prop(Object) headerContent: HeaderData | undefined

    visible: boolean = false
}

</script>


<style scoped>
.hotel-header-container {
  height: 1000px;
  position: relative;
  color: white;
  border-bottom: 1px solid;
  overflow: hidden;
}

.hotel-header-fonts {
  margin-top: 132px;
  text-align: center;
}

.hotel-header-logos {
  width: 48px;
  margin: 0 auto;
}

.hotel-header-logos > svg {
  fill: white;
  margin-top: 4px;
}

.hotel-header-title {
  margin-top: 12px;
}
.hotel-header-title > p{
  padding: 0;
  margin: 0;
}
/* page name */
.hotel-header-title p:nth-child(1) {
  font-size: 21px;
  line-height: 21px;
  letter-spacing: 1.2px;
  font-weight: 400; 
  padding-top: 10px;
}

/* hotel name */
.hotel-header-title p:nth-child(2) {
  margin-top: 10px;
}
/* title */
.hotel-header-title-line {
  margin-top: 10px;
  font-family: inherit;
  font-size: 42px; 
  line-height: 60px;
  letter-spacing: 2px;
  text-shadow: rgba(4, 0, 0, 0.6) 0px 0px 80px;
}


.hotel-header-disc {
  margin-top: 50px;
  font-size: 18px;
  letter-spacing: 1.8px;
  line-height: 32px;
  text-shadow: 0 0 80px rgb(4 0 0 / 60%);
}

.hotel-header-bg {
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.hotel-header-title > h2 > span,
.hotel-header-disc > span {
  /* transition: all 500ms cubic-bezier(.445,.05,.55,.95); */
  transition: opacity 500ms cubic-bezier(.445,.05,.55,.95);
  opacity: 0;
}

.text-visible {
  opacity: 1 !important;
}

</style>