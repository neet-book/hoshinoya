<template>
  <header>
    <div class="hotel-header-container" ref="container">
      <!-- 背景 -->
      <div 
        class="hotel-header-bg" 
        :class="{ visible }" 
        :style="{ backgroundImage: `url(${content.backgroundImage.normal})`, transform: `translate3d(0px, ${ move }px, 0px)`}"
        
        ></div>
      <div class="hotel-header-fonts" :class="{ visible }">
        <vertical-logo class="header-logo"></vertical-logo>
        <div class="hotel-header-title" :class="{ visible }">
          <h2> 
            <template v-for="(row, row_index) of content.title.split('\n')">
              {{ row }}
              <br :key="row_index"> 
            </template>
          </h2>
        </div>
        <div class="hotel-header-disc" >
          <p 
            v-for="(row, row_index) of content.content.split('\n')" 
            :key="row_index" 
            :class="{ visible }"
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
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import VerticalLogo from "../VerticalLogo.vue";

@Component({
  components: { VerticalLogo },
  mounted() {
    const that: any = this
    // 加载完成后延迟显示文字内容
    setTimeout(() => {
      that.visible = true
    }, 200);
  }
})
export default class HotelHeader extends Vue {
  @Prop(Object) content: Hotel.TopSection | undefined
  visible: boolean = false
  get hotelNameEn(): string {
    return this.$store.state.hotelNameEn
  }

  get hotelName(): string {
    return this.$store.state.hotelName
  }

  get move(): number {
    const container = this.$refs.container as Element
    const distance = this.$store.state.distance
    if ( container && distance > container.clientHeight ) {
      return container.clientHeight
    } else {
      return distance / 3 
    }
  }  
}

</script>


<style scoped>
.hotel-header-container {
  height: 1000px;
  position: relative;
  color: white;
  border-bottom: 1px solid;
  overflow: hidden;

  font-family: hsn-zhcn-serif-regular, serif;
}

.hotel-header-fonts {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 736px;
  text-align: center;
  margin: auto;
  transition-delay: 500ms;
  text-shadow: 0 0 80px rgb(4 0 0 / 60%);
}

.header-logo {
  font-size: 21px;
  fill: white;
  letter-spacing: 1.2px;
  font-family: hsn-zhcn-serif-semibold, serif;
}

/* title */
.hotel-header-title {
  position: absolute;
  top: 400px;
  left: 0; 
  right: 0;
  transform: translateY(-50%);
}

.hotel-header-title > h2 {
  font-family: inherit;
  font-size: 42px; 
  line-height: 60px;
  font-weight: 400;
  letter-spacing: 2px;
  text-shadow: rgba(4, 0, 0, 0.6) 0px 0px 80px;
}


.hotel-header-disc {
  margin: auto;
  font-size: 18px;
  letter-spacing: 1.8px;
  line-height: 32px;
  text-shadow: 0 0 80px rgb(4 0 0 / 60%);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.hotel-header-disc > p {
  margin: 0;
}

.hotel-header-bg {
  width: 100%;
  height: 100%;
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

/* 显示过度 */
.hotel-header-fonts,
.hotel-header-title,
.hotel-header-bg,
.hotel-header-disc > p {
  transition: opacity 1500ms cubic-bezier(.445,.05,.55,.95);
  opacity: 0;
}

.visible {
  opacity: 1 !important;
}

</style>