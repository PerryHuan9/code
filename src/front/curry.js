/**
 * 返回一个柯里化的函数
 * @param {*} fn
 * @param {*} args
 */
function curry(fn) {
  const preArgs = arguments[1] || [];
  return function (...args) {
    const allArgs = preArgs.concat(args);
    if (allArgs.length >= fn.length) {
      return fn(...allArgs);
    } else  {
      return curry(fn, allArgs)
    }
  }
}

module.exports = {
    curry
}
