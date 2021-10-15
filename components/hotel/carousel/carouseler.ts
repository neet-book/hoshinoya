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
  
}