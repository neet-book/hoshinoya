<template>
  <div class="large-section">
    <div class="outline-fonts" ref=outline>
      <outline-title class="outline-title" :title="content.title" :show="outline_showed" ></outline-title> 
      <div class="outline-content">
        {{ content.content }}
      </div>
    </div> 
    <!-- 圆形图 -->
    <div class="switch-area" >
      <div class="circle-container" :class="{ show: circle_showed }" ref="circle">
        <div class="circle-image"> 
          <div
            ref="circleImg"
            class="circle-image-body"
            :style="{ backgroundImage: `url(${content.circleImage.normal})`, transform: `translateY(-${distance}px)` }"
          ></div>
        </div>
      </div> 
    </div>
    <div class="map-image">
        <div 
          class="map-image-body"
          :style="{ backgroundImage: `url(${content.mapImage.normal})` }"
        ></div>
      </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import OutlineTitle from '~/components/hotel/OutlineTitle.vue'

@Component({
  components:{
    OutlineTitle
  },
  mounted() {
    const that: any = this
    that.document = document
  }
})
export default class LaroogeSection extends Vue {
  @Prop() content: Hotel.LargeSection | undefined 
  circle_showed: boolean = false
  outline_showed: boolean = false
  document: any = null
  get hotelNameEn(): string {
    return this.$store.state.hotelNameEn
  }

  get distance(): number { 
    var distance = this.$store.state.distance
    var viewHeight = this.document?.documentElement.clientHeight || 0
    if (!this.circle_showed) {
      var outline : any = this.$refs.outline
      if (outline && distance > outline.offsetTop - viewHeight) this.outline_showed= true
    }

    var circle : any = this.$refs.circle
    if (!this.circle_showed) {
      // @ts-ignore
      if (circle && distance > circle.offsetTop - viewHeight) this.circle_showed = true
    }
    if (circle) {
      if (circle.offsetTop + circle.offsetHeight > distance) {
        return distance * 0.025
      }
    }
    return 0
  }


}
</script>

<style scoped>
.large-section {
  padding-top: 170px;
  font-family: "hsn-zhcn-serif-light" , serif;
}

.outline-title {
  margin-bottom: 50px;
}

.outline-content {
  max-width: 480px;
  margin: auto;
  
  font-family: 'hsn-zhcn-sans-light', 'sans-serif';
  color: rgb(51, 51, 51);
  font-size: 15px;
  line-height: 32px;
  letter-spacing: 2.4px;
  text-align: justify;
  text-align-last: center;
}

.switch-area {
  padding: 50px 0;
}

.circle-container {
  width: 80vh;
  height: 80vh;
  max-width: 720px;
  max-height: 720px;
  margin: auto;
  opacity: 0;
  clip-path: circle(35% at center);
  transition: all 2400ms cubic-bezier(.165,.84,.44,1);
}

.circle-image {
  height: 100%;
  width: 100%;
  margin: auto;
  border-radius: 50%;
  box-shadow: 0 1px 4px 0 rgba(4,0,0,0.1) inset;

  position: relative;
}     

.circle-container.show {
  opacity: 1;
  clip-path: circle(50% at center);
}

.circle-image-body {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: -50px;
  background-size: cover;
  background-position: center;

  will-change: transfrom;
}

.map-image {
  height: 480px;
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;

  padding-bottom: 114px;
}

.map-image-body {
  height: 100%;
  width: 100%;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>