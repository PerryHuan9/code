function bind(func, thisArg) {
    const key = Symbol();
    thisArg[key] = func;
    return (...args) => thisArg[key](...args)
}

function apply(func, thisArg, argArray) {
    if (!thisArg) thisArg = {};
    const key = Symbol();
    thisArg[key] = func;
    const result = thisArg[key](...argArray)
    delete(thisArg, key)
    return result
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
    Object.setPrototypeOf(obj, constructor.prototype);
    const res = constructor.apply(obj, args);
    return typeof res === 'object' ? res : obj;

}


/**
 * 实现 instanceOf
 * @param {*} obj 
 * @param {*} constructor 
 */
function instanceOf(obj, constructor) {
    if (!constructor || !obj) return false;
    let prototype = Object.getPrototypeOf(obj);
    const constructorProto = constructor.prototype;
    while (true) {
        if (prototype === constructorProto) return true;
        if (!prototype) return false;
        prototype = Object.getPrototypeOf(prototype);
    }
}


module.exports = {
    bind,
    apply,
    call,
    newObj,
    instanceOf
}