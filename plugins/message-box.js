import Vue from 'vue'

Vue.use({
  install() {
    const MessageBox = Vue.extend({
      render(h) {
        return (
          <div class={{ visible: this.visible , 'message-box': true }}>
            <dialog open={ this.visible } >
              <div class={ 'message-box-container' } style={ { padding: '15px' } }>
                <p>{ this.message }</p>
                <button class={ 'msg-btn' } vOn:click={ this.onConfirm }>确认</button>
                <button class={ 'msg-btn' } vOn:click={ this.onCancel }>取消</button>
              </div>
            </dialog>
          </div>
        )
      },
      data() {
        return {
          message: '',
          visible: false,
          reject: null,
          resolve: null
        }
      },
      async confirm(message) {
        this.message = message
        this.visible = true
        return new Promise((resolve, reject) => {
          this.resolve = resolve
          this.reject = reject
        })
      },
      methods: {
        async confirm(message) {
          this.message = message
          this.visible = true
          return new Promise((resolve, reject) => {
            this.resolve = resolve
            this.reject = reject
          })
        },
        onConfirm() {
          this.visible = false
          if (this.resolve !== null) {
            this.resolve()
            this.resolve = null
          }
        },
        onCancel() {
          this.visible = false
          if (this.reject !== null) {
            this.reject()
            this.reject = null
          }
        }
      }
    })

    const div = document.createElement('div')
    const messageBox = new MessageBox()
    messageBox.$mount(div)
    document.body.appendChild(messageBox.$el)

    Vue.prototype.$message = messageBox
  }
})

