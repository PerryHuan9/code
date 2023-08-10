function bind(fn, thisArg, ...args) {
  const symboy = Symbol();
  thisArg[symboy] = fn;
  return function(...otherArgs) {
    args.concat(otherArgs);
    return thisArg[symboy](...args)
  }
}

function apply(fn, thisArg, args) {
  thisArg = thisArg || {};
  const key = Symbol();
  thisArg[key] = fn;
  const val = thisArg[key](...args);
  delete thisArg[key];
  return val;
}

function call(func, thisArg, ...argArray) {
    return apply(func, thisArg, argArray);
}

/**
 * 实现new 关键字
 * @param {*} constructor
 * @param  {...any} args
 */
function newObj(constructor, ...args) {
  const obj = {};
  Object.setPrototypeOf(obj, constructor.prototype)
  const res = constructor.apply(obj, args);
  return typeof res === 'object' && res !== null ? res : obj;
}


/**
 * 实现 instanceOf
 * @param {*} obj
 * @param {*} constructor
 */
function instanceOf(obj, constructor) {
  if (!obj || !constructor) return false;
  let prototype = Object.getPrototypeOf(obj);
  while(prototype) {
    if (prototype === constructor.prototype) return true;
    prototype = Object.getPrototypeOf(prototype);
  }
  return false;

}

module.exports = {
    bind,
    apply,
    call,
    newObj,
    instanceOf
}
