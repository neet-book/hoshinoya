<template>
  <div class="menu-bar" @click="onClick" :class="{ visible }">
    <div class="menu-bar-icon">
      <div class="menu-bar-icon-menu" :class="{ active: !active }">
        <div class="icon-line"></div>
        <div class="icon-line"></div>
        <div class="icon-line"></div>
      </div>
      <div class="menu-bar-icon-close" :class="{ active: active }">
      </div>
    </div>
    <div class="nemu-bar-name" :class="{ show: showName }">HOSHINOYA {{ hotel | nameFilter }}</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({
  filters: {
    nameFilter(name: string): string {
      return name?.toUpperCase()
    }
  },
  mounted() {
    setTimeout(() => {
      (this as any).visible = true
    }, 200);
  }
})
export default class HotelBookingMenu extends Vue {
  @Prop(String) hotel: string | undefined
  @Prop(Boolean) showName: boolean | undefined
  active: boolean = false
  visible: boolean = false
  onClick(): void {
    this.active = !this.active
    this.$emit('menu-click', this.active)
  }
}
</script>


<style scoped>
.menu-bar {
  position: relative;
  height: 100%;
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
  transition: background-color 2000ms cubic-bezier(0.165, 0.84, 0.44, 1);
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

.nemu-bar-name {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1em;

  font-family: BauerBodoni;
  writing-mode: vertical-rl;
  font-size: 11px;
  letter-spacing: 1.8px;
  word-break: break-all;
  text-align: center;
  opacity: 0;
  transition: opacity 900ms cubic-bezier(0.445,0.05,0.55,0.95) 200ms;
}

.nemu-bar-name.show {
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
  transform: scale(0, 1);
  transition: width 400ms cubic-bezier(.165,.84,.44,1) 100ms;
}

.menu-bar-icon-menu.active {
  transform: scale(1, 1);
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

.menu-bar-icon-close.active {
  transform: scale(1, 1);
  transition: transform 400ms cubic-bezier(.165,.84,.44,1) 100ms
}

@media screen and (max-width: 950px) {
  .menu-bar {
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