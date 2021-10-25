type actions = 'moved' | 'changed'
// 移动距离为item宽度的64%
export interface Position {
  x: number
  y: number
  visible: boolean
}

// 移动距离为item宽度的64%
// 切换item的移动距离为item宽度的18%
export const DIRECTION = { LEFT: -1, RIGHT: 1 }
type direction = 1 | -1 
export class Carouseler {
  count: number = 0
  distance: number = 0
  positions: Position[] = []
  direction: direction
  timer: any
  delay: number = 5000 
  firstPositionX: number = 0
  lastPositionX: number = 0
  constructor(width: number, count: number, direction: direction = 1 ) {
    this.direction = direction
    this.count = count
    this.distance = width * 0.64    
    const minusDis = (-width + this.distance) 
    for (let i = 0; i < count; i++) {
      this.positions.push({ x: minusDis + (i * width) - width, y: 0, visible: true })  
    }
    this.firstPositionX = this.positions[0].x
    this.lastPositionX = this.positions[count - 1].x
  }  

  carouselHandler(direction: direction) {
    const count = this.count
    const firstPosition = this.positions[0]
    const lastPosition = this.positions[this.count - 1]
    if (direction === DIRECTION.LEFT) {
      // 将元素向前移一位
      for (let i = 0; i < count - 1 ; i++) {
        this.positions[i] = this.positions[i + 1]
      }
      // 将原来第一个元素放到最后 
      this.positions[count - 1] = firstPosition
      //  将数组元素值往后移动一位 
      for (let i = count - 1 ; i < 1; i--) {
        this.positions[i].x = this.positions[i - 1].x
      }

      this.positions[0].x = this.firstPositionX 

      lastPosition.visible = true
      firstPosition.visible = false
    }

    if (direction === DIRECTION.RIGHT) {
      // 元素往后移一位
      for (let i = count - 1; i > 0; i--) {
        this.positions[i] = this.positions[i - 1]
      }
      // 原来的最后一位元素移到第一位
      this.positions[0] = lastPosition
      // 数组元素的值往前移一位
      for (let i = 0; i < count - 2; i++) {
        this.positions[i].x = this.positions[i + 1].x
      }
      this.positions[count - 1].x = this.lastPositionX 

      firstPosition.visible = true
      lastPosition.visible = false
    }

    this.timer = setTimeout(() => {
      this.carouselHandler(direction) 
    }, this.delay );
  }

  previous() {
    this.stop()
    this.timer = window.setTimeout(() => {
      const direction = this.direction * -1
      this.carouselHandler(direction as direction)
    }, this.delay)
  }

  next() {
    this.stop()
    this.timer = window.setTimeout(() => this.carouselHandler(this.direction), this.delay)
  }

  start() {
    if (this.timer === null) return
    this.timer = window.setTimeout(() => this.carouselHandler(this.direction), this.delay)
  } 

  stop() {
    window.clearTimeout(this.timer)
    this.timer = null
  }

  reset(width: number) {
    this.distance = width * 0.6
    const pCont = this.positions.length 
    const minusDis = (-width + this.distance) 
    for (let i = 0; i < pCont; i++) {
      this.positions[i].x =  minusDis + (i * width)
    }
  }
}