/**
 * 函数防抖
 * @param fun 要执行的函数 
 * @param delay 时间间隔
 * @returns 防抖函数
 */
export function debounce(fun: any, delay: number) {
    let timer: any = null
    return function (...arg: any[]) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            // @ts-ignore
            fun.apply(this, arg)
            timer = null
        }, delay)
    }
}

/**
 * 函数节流
 * @param fun 要执行的函数
 * @param delay 时间间隔
 * @param immediate true表示立即执行，false表示间隔时间之后执行
 * @param callback 间隔时间内重复调用时的回调函数
 * @returns 节流函数 
 */
export function throttle(fun: any, delay: number, immediate: boolean, callback:(millisecond: number)=> void) {
    let timer: any = null
    // 间隔时间结束的timestamp
    let timestamp: number = 0
    return function (...args: any[]) {
        if (timer === null && timestamp === 0) {
            if (immediate) {
                // @ts-ignore
                fun.apply(this, args)
            }
            timestamp = Date.now() + delay
            timer = setTimeout(() => {
                // @ts-ignore
                if (!immediate) fun.apply(this, args)
                timer = null
                timestamp = 0
            }, delay);
        } else {
            const now: number = Date.now()
            if (timestamp > now && timer !== null) {
                callback(timestamp - now)
            } else {
                clearTimeout(timer)
                timestamp = 0
                timer = null
                // @ts-ignore
                if (!immediate) fun.apply(this, args)
            }
        }
    }
}

/**
 * 返回[min, max]之间的整数随机数
 * @param min
 * @param max
 */
export function randomInt(min: number, max?: number) {
    if (max === undefined) {
        max = min
        min = 0
    }
    if (crypto) {
        const maxUint32 = 0xffffffff
        // @ts-ignore
        const randomFloat = crypto.getRandomValues(new Uint32Array(1)) / maxUint32
        return Math.floor(randomFloat * (max - min + 1) + min)
    } else {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}

/**
 * 下划线命名转换成小驼峰命名
 * @param name
 */
export function toLowerCamelCase(name: string) {
  const words = name.split('_')
  if (words.length <= 1) return name

  return words[0] + words.slice(1).map(word => {
    return word[0].toUpperCase() + word.slice(1)
  }).join()
}

export function toUnderScoreCase(name: string) {
  const words = name.split(/(?=[A-Z])/g)
  return words.map(word => word.toLowerCase()).join('_')
}