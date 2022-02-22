function debounce(fun: any, delay: number) {
    let timer = null;
    return function (...arg) {
        if (timer == null) {
            timer = setTimeout(() => {
                fun.apply(this, arg)
            }, delay);
        } else {
            clearTimeout(timer)
            timer = setTimeout(() => {
                fun.apply(this, arg)
            }, delay);
        }
    }
}