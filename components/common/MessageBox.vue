<template>
  <div class="message-box" :class="{ visible: isOpen }">
    <dialog :open="isOpen">
      <div class="message-box-container">
        <p>{{message}}</p>
        <div>
          <button class="msg-btn" @click="onConfirm">确认</button>
          <button class="msg-btn"  @click="onCancel" v-show="type === 'confirm'">取消</button>
        </div>
      </div>
    </dialog>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'

export type ConfirmType = 'info' | 'confirm'

@Component({})
export default class MessageBox extends Vue {
  isOpen: boolean = false
  message: string = ''
  type: ConfirmType = 'info'
  reject
  resolve
  onCancel () {
    this.isOpen = false
    if (this.reject) {
      this.reject()
      this.reject = null
    }
  }
  onConfirm () {
    this.isOpen = false
    if (this.resolve) {
      this.resolve()
      this.resolve = null
    }
  }
  confirm(type: ConfirmType, message: string) {
    this.type = type
    this.message = message
    this.isOpen = true
    console.log(this)
    return new Promise((resolve, reject) => {
      this.reject = reject
      this.resolve = resolve
    })
  }
}
</script>

<style scoped>
.message-box {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;

  background: rgb(0, 0, 0, 0.2);
  z-index: 999;
  visibility: hidden;

  transition: all .3s ease;
}

.message-box.visible {
  visibility: visible;
}

.message-box dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);

  border: none;
  border-radius: 5px;
  width: 560px;

  background: white;
  font-size: 15px;
  font-weight: 400;
  font-family: 'hsn-zhcn-sans-light', 'sans-serif';
  letter-spacing: 2.4px;
}

.message-box-container {
  padding: 15px;
}

.msg-btn {
  display: block;
  border: none;
  border-radius: 4px;
  height: 45px;
  width: 100%;

  margin-top: 1em;
  color: white;
  background: #666;

  cursor: pointer;
}

.msg-btn:hover {
  background: #333;
}
</style>