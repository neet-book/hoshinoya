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
                fun.apply(this, args)
            }
            timestamp = Date.now() + delay
            timer = setTimeout(() => {
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
                if (!immediate) fun.apply(this, args)
            }
        }
    }
}