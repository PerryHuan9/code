/**
 * 实现reduce
 * @param {*} arr 
 * @param {*} callback 
 * @param {*} initialVal 
 */
function reduce(arr, callback, initialVal) {
    for (let i = 0; i < arr.length; i++) {
        initialVal = callback(initialVal, arr[i], i, arr);
    }
    return initialVal;
}

const arr = [1, 2, 4, 5];

console.log(reduce(arr, (res, val) => res + val, 1))

/**
 * 返回一个已防抖函数
 * 该函数自上一次调用后，间隔timeout时间才会调用 func 
 * @param {*} func 
 * @param {*} timeout 
 */
function debounce(func, timeout) {
    let handler;
    return function (...props) {
        clearTimeout(handler)
        handler = setTimeout(() => {
            func(...props);
        }, timeout)
    }
}

const debounceFunc = debounce((a) => {
    console.log('打印', a)
}, 500)

debounceFunc(88);
debounceFunc(99);
setTimeout(() => {
    debounceFunc(100);
}, 500)


/**
 * 返回一个已节流函数
 * 改函数在 time 时间内只会调用 func 一次
 * @param {*} func 
 * @param {*} time 
 */
function throttle(func, time) {
    let canRun = true;
    return (...params) => {
        if (!canRun) return;
        canRun = false;
        func(...params);
        setTimeout(() => {
            canRun = true;
        }, time)
    }
}

const throttleFunc = throttle((a, b) => {
    console.log('节流：', a, b)
}, 300)

throttleFunc(1, 2)
throttleFunc(2, 3)
throttleFunc(4, 5)
setTimeout(() => {
    throttleFunc(6, 7)
}, 300)

// 节流： 1 2
// 节流： 6 7