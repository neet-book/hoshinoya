/** 描述元素位置，是否显示的Position接口 */ 
export interface Position {
  x: number
  y: number
  visible: boolean
}

// 移动距离为item宽度的64%
// 切换item的移动距离为item宽度的18%
/** 
 * 滚动方向，常量
 * @readonly
 * @constant {number}
 */
export const DIRECTION = { LEFT: -1, RIGHT: 1 }
type direction = 1 | -1 

/** 控制轮播图像旋转木马一样轮播 */
export class Carouseler {
  /**
   * @param {number} width - 轮播元素的宽度
   * @param {number} count - 轮播元素数量
   * @param {DIRECTION} direction - 轮播图滚动方向
   * @private {number} timer - 定时器ID
   * @param {number} delay - 轮播时间 
   * @param {number} firstPositionX - 第一个轮播元素的起始位置
   * @param {number} lastPositionX - 最后一个轮播元素的结束位置
   */
  count: number = 0
  distance: number = 0
  positions: Position[] = []
  direction: direction
  width: number
  private timer: any = null
  delay: number = 5000 
  firstPositionX: number = 0
  lastPositionX: number = 0
  constructor(width: number, count: number, direction: direction = DIRECTION.LEFT as direction ) {
    this.direction = direction
    this.width = width
    this.count = count
    this.distance = width * 0.45    
    const minusDis = (-width + this.distance) 
    for (let i = 0; i < count; i++) {
      this.positions.push({ x: minusDis + (i * width) - width, y: 0, visible: true })  
    }
    this.firstPositionX = this.positions[0].x
    this.lastPositionX = this.positions[count - 1].x
  }  

  carouselHandler(direction: direction) {
    const count = this.count
    const width = this.width
    const firstPosition = this.positions[0]
    const lastPosition = this.positions[count - 1]
    if (direction === DIRECTION.LEFT) {
      // 将元素向前移一位
      for (let i = 0; i < count - 1 ; i++) {
        this.positions[i] = this.positions[i + 1]
      }
      // 将原来第一个元素放到最后 
      this.positions[count - 1] = firstPosition
      // 原来的第一个元素不显示，并移动到最后面
      firstPosition.visible = false
      lastPosition.visible = true
      //  将数组元素值往后移动一位 
      this.positions[0].x = this.firstPositionX
      for (let i = 0; i < count - 1; i++) {
        this.positions[i + 1].x = this.positions[i].x + width
      }
    }

    if (direction === DIRECTION.RIGHT) {
      // 元素往后移一位
      for (let i = count - 1; i > 0; i--) {
        this.positions[i] = this.positions[i - 1]
      }
      // 原来的最后一位元素移到第一位
      this.positions[0] = lastPosition
      firstPosition.visible = true
      lastPosition.visible = false
      // 数组元素的值往前移一位
      this.positions[count - 1].x = this.lastPositionX
      for (let i = count - 1; i > 0; i--) {
        this.positions[i - 1].x = this.positions[i].x - width
      }
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
    if (this.timer !== null) return 
    this.timer = window.setTimeout(() => this.carouselHandler(this.direction), this.delay)
  } 

  stop() {
    window.clearTimeout(this.timer)
    this.timer = null
  }

  reset(width: number) {
    this.distance = width * 0.64    
    this.width = width
    const minusDis = -width + this.distance 
    this.firstPositionX = -width * 2 + this.direction
    this.lastPositionX = minusDis + (this.count - 1 * width) - width
  }
}