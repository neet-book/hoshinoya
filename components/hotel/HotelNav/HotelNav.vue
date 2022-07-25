<template>
  <div class="hotel-nav">
    <div class="hotel-name" :class="{ vertical }">
      虹夕诺雅 {{ hotelName }}
    </div>
      <ul class="link-list" :class="{ vertical }">
        <li>
          <nuxt-link
              :to="'/hotel/' + hotelNameEn"
              class="link-list-item"
              :class="{ isCurrent: page === 'index' }"
          >特点</nuxt-link>
        </li>
        <li>
          <nuxt-link
              :to="'/hotel/' + hotelNameEn + '/rooms'"
              class="link-list-item"
              :class="{ isCurrent: page === 'rooms' }"
          >客房</nuxt-link>
        </li>
        <li>
          <nuxt-link
              :to="'/hotel/' + hotelNameEn + '/dining'"
              class="link-list-item"
              :class="{ isCurrent: page === 'dining' }"
          >餐饮</nuxt-link>
        </li>
        <li>
          <nuxt-link
              :to="'/hotel/' + hotelNameEn + '/experience'"
              class="link-list-item"
              :class="{ isCurrent: page === 'experience' }"
          >体验</nuxt-link>
        </li>
        <li>
          <nuxt-link
              :to="'/hotel/' + hotelNameEn + '/access'"
              class="link-list-item"
              :class="{ isCurrent: page === 'access' }"
          >交通</nuxt-link>
        </li>
      </ul>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator'

@Component
export default class HotelNav extends Vue {
  nav = ['room', 'dining', 'experience', 'access']
  @Prop({type: Boolean, default: false}) vertical: boolean | undefined
  get hotelName() {
    return this.$store.state.hotelName
  }
  get hotelNameEn() {
    return this.$store.state.hotelNameEn
  }

  get page() {
    const arr = this.$route.path.split('/')
    const last = arr[arr.length - 1]
    return last in this.nav ? last : 'index'
  }
}
</script>

<style scoped>
.hotel-nav {
  display: flex;
}

.hotel-nav.vertical {
  display: block;
}

.hotel-name {
  box-sizing: border-box;
  height: 30px;
  font-size: 18px;
  flex-shrink: 0;
  flex-grow: 0;
}

.hotel-name {
  border-top: 1px solid #999;
  padding-top: 30px;
}

.hotel-name.vertical {
  border-bottom:1px solid #999;
}

.link-list {
  padding-bottom: 50px;
  flex-grow: 1;
}

.link-list {
  display: flex;
  justify-content: right;

  padding-top: 30px;
  border-top: 1px solid #ededed;
}

.link-list.vertical {
  display: block;
}

.link-list > li {
  height: 45px;
}

.link-list-item {
  -webkit-font-smoothing: subpixel-antialiased;
  text-decoration: none;
  color: black;
  font-size: 18px;
  position: relative;
  padding-left: 20px;
  margin-left: 20px;
}

.vertical >li > .link-list-item {
  margin-left: 0;
}

/* point */
.link-list-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 13px;
  height: 13px;
  background-image: url("~assets/svg/blt.svg");
  background-repeat: no-repeat;
  background-position: center center;
  opacity: inherit;
}

.link-list-item:hover {
  opacity: 0.5;
}

.link-list-item.isCurrent {
  opacity: 0.5;
}

</style>