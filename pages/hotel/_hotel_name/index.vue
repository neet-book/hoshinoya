<template>
  <div class="hotel">
    <hotel-menu :hotel="hotelInfo"  page='index' /> 
    <div class="hotel-page-container">
      <header>
        <div class="hotel-header-container">
          <div class="hotel-header-fonts">
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
            <div class="hotel-header-title">
              <p>虹夕诺雅</p>
              <p>{{ hotelName }}</p>
              <h2> 
                <template v-for="(row, row_index) of topSection.title.split('\n')">
                  <span 
                    v-for="(char, char_index) of row"
                    :class="{'text-visible': vi}"
                    :style="`transition-delay: ${ delayTime(row_index, char_index, row.length, topSection.title) }ms`" 
                    :key="`lien-${row_index}-${char_index}`"
                  >{{ char }}</span>
                  <br :key="`-${row_index}`"> 
                </template>
              </h2>
            </div>
            <div class="hotel-header-disc" >
              <template v-for="(row, row_index) of topSection.content.split('\n')">
                <template v-for="(char, char_index) of row">
                  <span
                    :class="{ 'text-visible': vi}"
                    :style="`transition-delay: ${delayTime(row_index, char_index, row.length, topSection.content, 10)}ms`" 
                    :key="row_index + '-' + char_index"
                  >{{char}}</span>
                </template>
                <br :key="row_index">
              </template>
            </div>
          </div>
          <div class="hotel-header-bg" :style="`background-image: url(${topSection.backgroundImage.normal})`"></div>
        </div>
      </header>
      <main>
        <div class="first-content" style="height: 100px;">
          <button @click="vi = !vi" style="padding-left: 20px;">change</button>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import HotelMenu from '~/components/hotel/HotelMenu/HotelMenu.vue'
import { getHotelRateInfos, getHotelIntroduction } from '~/utils/network'

export interface ImageUrl {
  big?: string
  normal?: string
  square?: string
}

export interface TopSection {
  title: string,
  content: string,
  backgroundImage: ImageUrl
}

export interface LargeSection {
  title: string
  content: string
  circleImage: ImageUrl
  mapImage : ImageUrl
}

export interface OutlineFirstSection {
  title: string
  carrouselImtes: [
    {
      title: string,
      image: ImageUrl
    }
  ]
  disc: string
}

export interface OutlineSecondSection {
  title: string,
  grids: [
    {
      image: ImageUrl
    }
  ],
  disc: string,
  subDisc: {
    title: string,
    content: string
  }
}

 export interface OutlineThirdSection {
  title: string
  carrouselItems: [
    {
      title: string,
      image: ImageUrl
    }
  ]
  disc: string,
  subDisc: {
    title: string,
    content: string
  }
}

@Component({
  components: {
    HotelMenu
  },
  async fetch({ store }) {
    const data = await getHotelRateInfos()
    store.commit('updateHotelRateInfo', data)
  },
  async asyncData(ctx) {
    const hotel = ctx.params.hotel_name
    const data = await getHotelIntroduction(hotel)
    return data || {}
  },
  mounted() {
    const that: any = this
    setTimeout(() => {
      that.vi = true
    }, 200);
  }
})
export default class Hotel extends Vue {
  hotelNameEn: string = ''
  hoelName: string = ''
  topSection: TopSection | undefined 
  largeSection: LargeSection | undefined
  outlineFirstSection: OutlineFirstSection | undefined
  outlineSecondSection: OutlineSecondSection | undefined
  outlineTridSection: OutlineThirdSection | undefined  


  vi: boolean = false
  get hotelInfo() {
    return {
      name: this.hoelName,
      nameEn: this.hotelNameEn,
      logo: 'logo-hotel-' + this.hotelNameEn
    }
  }

  
  delayTime(rowIndex: number, charIndex: number, charCount: number, text: string, level=100): number {
    const rowCount = text.split('\n').length
    // 最后一行
    if (rowIndex + 1 === rowCount) {
      return level * (charCount - charIndex) + level
    }

    // 第一行
    if (rowIndex === 0) {
      if (charIndex === 0) return 0
      return 10 * charIndex + level
    }

    return level
  }

  
}
</script>

<style scoped>
.hotel {
  font-family: hsn-zhcn-serif-semibold, hsn-zhtw-serif-semibold, serif;
}


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
/* title */
.hotel-header-title > h2 {
  margin-top: 10px;
  font-family: inherit;
  font-size: 38px; 
  line-height: 32px;
  letter-spacing: 2px;
  text-shadow: rgba(4, 0, 0, 0.6) 0px 0px 80px;
}


.hotel-header-disc {
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
  transition: all 500ms cubic-bezier(.445,.05,.55,.95);
  /* transition: opacity 500ms cubic-bezier(.445,.05,.55,.95); */
  opacity: 0;
}


.text-visible {
  opacity: 1 !important;
}

</style>
