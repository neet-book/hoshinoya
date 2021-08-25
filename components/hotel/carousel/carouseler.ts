
type actions = 'moved' | 'changed'

class Carouseler {
  itemCount: number = 0
  distance: number = 0
  viewWidth: number = 0
  itemWidth: number = 0 
  currentIndex: number = 2
  maxItemcount: number = 3
  itemPositions: [] = []
  status: actions = 'moved'
  timer: NodeJS.Timeout | null = null
  constructor(itemWidth: number, itemCount: number) {
    this.itemCount = itemCount
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

    this.status = 'moved'
  }

  changeAction() {
    const itemList = []
    let preIndex = currentIndex - 1,
    nextIndex = currentIndex + 1

    if (preIndex < 0) preItem = itemList.length
    if (nextIndex >= itemList.length) nextItem = 0

    let preItem = itemList[preIndex],
    currentItem = itemList[currentIndex],
    nextItem = itemList[nextIndex]

    // 处理旧preItem
    preItem.position = -100
    prefItem.visible = false

    // 处理新preItem
    preItem = currentItem
    preItem.position = prePostion


    // 处理currentItem
    currentItem = nextItem
    currentItem = currentPostion
    currentIndex = nextIndex


    // 处理
    nextIndex = nextIndex + 1
    if (nextIndex >= itemList.length) nextIndex = 0
    nextItem = itemList[nextIndex]
    
    nextItem.position = nextPosition
    nextItem.visible = true

    action = 'change'
  }
}