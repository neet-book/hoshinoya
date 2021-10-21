type actions = 'moved' | 'changed'
// 移动距离为item宽度的64%
interface Position {
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
  constructor(width: number, count: number, direction: direction = 1 ) {
    this.direction = direction
    this.count = count
    this.distance = width * 0.64    
    const pCont = this.count + 2
    const minusDis = (-width + this.distance) 
    for (let i = 0; i < pCont; i++) {
      this.positions.push({ x: minusDis + (i * width), y: 0, visible: true })  
    }
  }  

  carouselHandler(direction: direction) {
    const firstPosition = this.positions[0]
    const firstX = firstPosition.x
    const lastPosition = this.positions[this.positions.length - 1]
    const lastX = lastPosition.x
    const count = this.positions.length

    if (direction === DIRECTION.LEFT) {
      for (let i = 0; i < count - 1 ; i++) {
        this.positions[i + 1].x = this.positions[i].x
        this.positions[i] = this.positions[i + 1]
      }
      
      this.positions[count - 1] = firstPosition
      lastPosition.visible = true
      firstPosition.visible = false
      firstPosition.x = lastX
    }

    if (direction === DIRECTION.RIGHT) {
      for (let i = count - 1; i > 0; i--) {
        this.positions[i - 1].x = this.positions[i].x
        this.positions[i] = this.positions[i - 1]
      }

      this.positions[0] = lastPosition
      firstPosition.visible = true
      lastPosition.visible = false
      lastPosition.x = firstX
    }
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
}