type actions = 'moved' | 'changed'
interface Position {
  id: number
  x: number
  y: number
  visible: boolean
}

// 移动距离为item宽度的64%
// 切换item的移动距离为item宽度的18%

export default class Carouseler {
  itemCount: number = 0
  moveDistance: number = 0
  changeDistance: number = 0
  viewWidth: number = 0
  itemWidth: number = 0 
  currentIndex: number = 2
  maxItemcount: number = 3
  itemPositions: Position[] = []
  status: actions = 'changed'
  // item移动和切换间隔和持续时间
  moveTime: number = 5000
  changeTime: number = 600
  timer: NodeJS.Timeout | null = null
  constructor(itemWidth: number, itemCount: number) {
    this.itemCount = itemCount
    this.resize(itemWidth)
    for (let i = 0; i < itemCount; i ++) {
      this.itemPositions[i] = {
        id: i,
        x: this.itemWidth * i - (this.moveDistance + this.changeDistance),
        y: 0,
        visible: true
      }
    }

    // for (let i = 0; i < this.maxItemcount; i++) {
    //   this.itemPositions[i].x = -this.distance + this.itemWidth * i
    // }
  }

  resize(itemWidth: number) {
    this.itemWidth = itemWidth
    const viewWidth = document.documentElement.clientWidth
    // if (viewWidth / itemWidth > 3) {
    //   // 页面显示4个item
    //   this.maxItemcount = 4
    //   this.distance = (viewWidth - itemWidth * 2) / 2 
    // } else {
    //   // 页面显示3个item
    //   this.maxItemcount = 3
    //   this.distance = (viewWidth - itemWidth) / 2
    // }

    this.moveDistance = itemWidth * 0.64
    this.changeDistance = itemWidth * 0.18
    this.viewWidth = viewWidth
  }

  carouselHandler() {
    let delay = 1000
    console.info('hander')
    if (this.status === 'moved') {
      // 移动结束，转为切换
      this.exchangeAction()
      delay = this.changeTime 
    } else {
      // 切换结束，转为移动
      this.moveAction()
      delay = this.moveTime 
    }
    this.timer = setTimeout(() => this.carouselHandler(), delay)
  }

  moveAction() {
    let preIndex = this.currentIndex - 1,
    nextIndex = this.currentIndex + 1,
    currentIndex = this.currentIndex
    if (preIndex < 0) preIndex = this.itemCount - 1
    if (nextIndex >= this.itemCount) nextIndex = 0

    let prePosition = this.itemPositions[preIndex],
    currentPosition = this.itemPositions[currentIndex],
    nextPosition = this.itemPositions[nextIndex]

    prePosition.x -= this.moveDistance
    currentPosition.x -= this.moveDistance
    nextPosition.x  -= this.moveDistance 

    this.status = 'moved'
  }

  exchangeAction() {
    let preIndex = this.currentIndex - 1,
    nextIndex = this.currentIndex + 1

    if (preIndex < 0) preIndex = this.itemCount - 1
    if (nextIndex >= this.itemCount) nextIndex = 0

    let prePosition = this.itemPositions[preIndex],
    currentPosition = this.itemPositions[this.currentIndex],
    nextPosition = this.itemPositions[nextIndex]


    // 处理旧preItem
    let oldPreIndex = preIndex - 1 < 0 ? this.itemCount - 1 : preIndex - 1
    this.itemPositions[oldPreIndex].visible = false
    this.itemPositions[oldPreIndex].x = this.viewWidth

    prePosition.x = -this.itemWidth
    currentPosition.x = -this.changeDistance
    nextPosition.x  = currentPosition.x + this.itemWidth
    // 处理新的nextItem
    currentPosition = nextPosition 
    this.currentIndex = nextIndex
    // 处理nextItem
    nextIndex += 1
    if (nextIndex >= this.itemCount) nextIndex = 0
    nextPosition = this.itemPositions[nextIndex]
    nextPosition.visible = true    
    nextPosition.x = currentPosition.x + this.itemWidth 

    this.status = 'changed'
  }

  stop() {
    clearTimeout(this.timer as NodeJS.Timeout)
    this.timer = null
  }

  start() {
    if (this.timer === null ) this.carouselHandler() 
  }
}