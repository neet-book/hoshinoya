<template>
  <div class="menu-bar" @click="onClick" :class="{ visible }"> 
    <div class="site-name-en" :class="{ visible: $store.state.distance > 1000 }">HOSHINOYA {{ $store.state.hotelNameEn.toUpperCase() }}</div>
    <div class="menu-bar-icon">
      <div class="menu-bar-icon-menu" :class="{ opened }">
        <div class="icon-line"></div>
        <div class="icon-line"></div>
        <div class="icon-line"></div>
      </div>
      <div class="menu-bar-icon-close" :class="{ opened }">
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  mounted() {
    setTimeout(() => {
      (this as any).visible = true
    }, 200);
  }
})
export default class HotelBookingMenu extends Vue {
  opened: boolean = false
  visible: boolean = false
  onClick(): void {
    this.opened= !this.opened
    this.$emit('menu-click', this.opened)
  }
}
</script>


<style scoped>
.menu-bar {
  position: relative;
  /* height: 100%; */
  height: 0;
  width: 110px;
  cursor: pointer;
  will-change: height;
  background-color: #e6e6e6;
  overflow: hidden;
  z-index: 999;
}

.menu-bar.visible {
  height: 100%;
  background-color: #0000;
  transition: background-color 2000ms cubic-bezier(0.165, 0.84, 0.44, 1),
    height 2000ms cubic-bezier(0.165, 0.84, 0.44, 1);
  
}

.menu-bar:hover {
  background-color: #e6e6e6;
  transition: background-color 200ms cubic-bezier(0.165, 0.84, 0.44, 1);
}

.menu-bar::before {
  content: ' ';
  width: 1px;
  height: 32px;
  background-color: #ccc;

  position: absolute;
  right: 0;
}

.site-name-en {
  width: 110px;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 10;
  
  user-select: none;

  font-family: "Bauer Bodoni Pro_1 W01 Roman";
  color: black;
  font-size: 11px;
  line-height: 110px;
  letter-spacing: 1.8px;
  word-break: break-all;
  text-align: center;
  writing-mode: vertical-rl;

  opacity: 0;
  transition: opacity 900ms cubic-bezier(.445,.05,.55,.95) 200ms;
}

.site-name-en.visible {
  opacity: 1;
}

.menu-bar-icon {
  position: absolute;
  width: 38px;
  height: 38px;
  top: 36px;
  left: 50%;
  transform: translateX(-50%);
}

.menu-bar-icon-menu {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transform: scale(1, 1);
  transition: transform 400ms cubic-bezier(.165,.84,.44,1) 100ms;
}

.menu-bar-icon-menu.opened {
  transform: scale(0, 1);
  transition: transform 400ms cubic-bezier(.165,.84,.44,1);
}

.icon-line {
  width: 100%;
  height: 1px;
  background: white;
  border-bottom: 1px solid white;
}

.menu-bar-icon-close {
  width: 100%;
  height: 100%;
  background: url('~assets/svg/close.svg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  transform: scale(0, 0); 
  transition: transform 100ms cubic-bezier(.165,.84,.44,1);
}

.menu-bar-icon-close.opened {
  transform: scale(1, 1);
  transition: transform 400ms cubic-bezier(.165,.84,.44,1) 100ms
}

@media screen and (max-width: 950px) {
  .menu-bar,
  .site-name-ene
  {
    width: 60px;
  }

  .menu-bar-icon {
    top: 26px;
    width: 25px;
    height: 25px;
  }

  .menu-bar::before {
    height: 22px;
  }
}
</style>