type actions = 'moved' | 'changed'
interface Position {
  id: number
  x: number
  y: number
}

export default class Carouseler {
  itemCount: number = 0
  distance: number = 0
  viewWidth: number = 0
  itemWidth: number = 0 
  currentIndex: number = 2
  maxItemcount: number = 3
  itemPositions: Position[] = []
  status: actions = 'moved'
  timer: NodeJS.Timeout | null = null
  constructor(itemWidth: number, itemCount: number) {
    this.itemCount = itemCount
    for (let i = 0; i < itemCount; i ++) {
      this.itemPositions[i] = {
        id: i,
        x: 0,
        y: 0
      }
    }
    this.resize(itemWidth)
  }

  resize(itemWidth: number) {
    const viewWidth = document.documentElement.clientWidth
    if (viewWidth / itemWidth > 3) {
      // 页面显示4个item
      this.maxItemcount = 4
      this.distance = (viewWidth - itemWidth * 2) / 2 
    } else {
      // 页面显示3个item
      this.maxItemcount = 3
      this.distance = (viewWidth - itemWidth) / 2
    }

    this.viewWidth = viewWidth
  }

  carrouselHander() {
    // 判断刚才执行完的行为是什么
    if (this.status === 'moved') {
      // 移动结束，转为切换
      this.changeAction()
      this.timer = setTimeout(this.carrouselHander, 2000)
    }

    if (this.status === 'changed') {
      // 切换结束，转为移动
      this.movingAction()
      this.timer = setTimeout(this.carrouselHander, 3000)
    }
  }

  movingAction() {
    let preIndex = this.currentIndex - 1,
    nextIndex = this.currentIndex + 1

    if (preIndex < 0) preIndex = this.itemCount - 1
    if (nextIndex >= this.itemCount) nextIndex = 0

    let prePosition = this.itemPositions[preIndex],
    currentPosition = this.itemPositions[this.currentIndex],
    nextPosition = this.itemPositions[nextIndex]

    prePosition.x = -this.distance
    currentPosition.x = prePosition.x + this.itemWidth
    nextPosition.x

    this.status = 'moved'
  }

  changeAction() {
    let preIndex = this.currentIndex - 1,
    nextIndex = this.currentIndex + 1

    if (preIndex < 0) preIndex = this.itemCount
    if (nextIndex >= this.itemCount) nextIndex = 0

    let prePosition = this.itemPositions[preIndex],
    currentPosition = this.itemPositions[this.currentIndex],
    nextPosition = this.itemPositions[nextIndex]


    // 处理旧preItem
    prePosition.x = prePosition.x - this.distance
    // 处理新preItem
    currentPosition.x = prePosition.x + this.itemWidth

    // 处理currentItem
    prePosition = currentPosition 
    currentPosition = nextPosition 
    this.currentIndex += 1

    // 处理nextItem
    nextIndex = this.currentIndex + 1
    if (nextIndex >= this.itemCount) nextIndex = 0
    nextPosition = this.itemPositions[nextIndex]
    
    nextPosition.x = currentPosition.x + this.itemWidth 

    this.status = 'changed'
  }
}