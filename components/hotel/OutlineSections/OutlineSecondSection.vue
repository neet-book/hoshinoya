<template>
  <div class="outline-second-section">
    <outline-title class="outline-title" :title="content.title" :show="showTitle" ref="title"></outline-title>
    <hide-swiper :images="content.grids"></hide-swiper>
    <div class="disc-text">
      {{ content.disc }}
    </div>
    <div class="sub-disc">
      <h3 class="sub-title">
        {{ content.subDisc.title }}
      </h3>
      <div class="sub-content" >{{ content.subDisc.content }} </div>
      <div v-pre v-text="null"></div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator'
import OutlineTitle from '../OutlineTitle'
import HideSwiper from "../HideSwiper/HideSwiper.vue";

@Component({
  components: { HideSwiper, OutlineTitle }
})
export default class OutlineSecondSection extends Vue {
  @Prop(Object) content: Hotel.OutlineSecondSection | undefined
  visible = true
  isShowed: boolean = false
  get showTitle(): boolean {
    if (!this.isShowed) {
      const distance = this.$store.state.distance
      const title = this.$refs.title as Vue
      if (title) {
        this.isShowed = distance + window.innerHeight > title.$el.offsetTop
      }
    }
    return this.isShowed
  }
}
</script>

<style scoped>
.disc-text {
  padding-top: 50px;
  width: 480px;
  margin: 10px auto;
  font-family: 'hsn-zhcn-sans-light', 'sans-serif';
  font-size: 15px;
  text-align-last: center;
  line-height: 32px;
  letter-spacing: 2.4px;
  color: rgb(51, 51, 51);
}

.sub-disc {
  max-width: 480px;
  margin: 65px auto 0;
  letter-spacing: 2px;
  color: black;
}

.sub-title {
  letter-spacing: 2px;
  font-family: 'hsn-zhcn-serif-light', 'serif';
  font-size: 18px;
  font-weight: 400;
  line-height: 32px;
  text-align: center;
}

.sub-content {
  color: rgb(51,51,51);
  font-size: 15px;
  hyphens: auto;
  line-height: 32px;
  letter-spacing: 2.4px;
  margin-top: 34px;
  text-align-last: center;
  font-family: 'hsn-zhcn-sans-light', 'serif';
}
</style>