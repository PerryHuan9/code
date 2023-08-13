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

const __ = Symbol('PLACEHOLDER');

function _getNewArg(allArgs, addArgs) {
  let start = 0;
  let len = allArgs.length;
  addArgs.forEach(arg => {
    let i;
    for (i=start;i<len;i++) {
      if (allArgs[i] === __) {
        if (arg !== __) {
          allArgs[i] = arg;
        }
        start =i+1;
        break;
      }
    }
    if (i === len) {
      allArgs.push(arg);
    }
  });
  return allArgs;
}

function placeholderCurry(fn, ...bound) {
  const args = bound;
  return function (...newArgs) {
    const allArgs = _getNewArg([...args], newArgs);
    if (allArgs.filter((item) => item !== __).length === fn.length) {
      return fn(...allArgs);
    }
    return placeholderCurry(fn, ...allArgs);
  };
}

placeholderCurry.__ = __;






module.exports = {
    curry,
    placeholderCurry
}
