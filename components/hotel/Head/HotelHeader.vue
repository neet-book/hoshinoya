<template>
  <header>
    <div class="hotel-header-container">
      <!-- 背景 -->
      <div class="hotel-header-bg" :class="{ visible: vi }" :style="`background-image: url(${topSection.backgroundImage.normal})`"></div>
      <div class="hotel-header-fonts" :class="{ 'visible': vi }">
        <!-- logo -->
        <div class="hotel-header-logos">
          <svg viewBox="0 0 114 114">
            <use v-bind="{ 'xlink:href': '#logo-hotel-' + hotelNameEn }"></use>
          </svg>
          <svg viewBox="0 0 114 114">
            <use xlink:href="#logo-hoshinoya-text"></use>
          </svg>
          <svg viewBox="0 0 114 114">
            <use xlink:href="#logo-hoshinoya-mark"></use>
          </svg>
        </div>
        <div class="hotel-header-page-title">
          <p>虹夕诺雅</p>
          <p>{{ hotelName }}</p>
        </div>
        <div class="hotel-header-title" :class="{ 'visible': vi }">
          <h2> 
            <template v-for="(row, row_index) of topSection.title.split('\n')">
              {{ row }}
              <br :key="row_index"> 
            </template>
          </h2>
        </div>
        <div class="hotel-header-disc" >
          <p 
            v-for="(row, row_index) of topSection.content.split('\n')" 
            :key="row_index" 
            :class="{ 'visible': vi }"
            :style="{ transitionDelay: row_index * 200  + 1000 + 'ms' }"
          >
            {{ row }}
          </p>
        </div>
      </div>
    </div>
  </header>
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