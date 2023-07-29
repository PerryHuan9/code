function bind(fn, thisArg) {
    const key = Symbol();
    thisArg[key] = fn
    return (...args) => thisArg[key](...args);  
}

function apply(fn, thisArg, args) {
    if (thisArg === null || typeof thisArg !== 'object') thisArg = {}
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
    
    Object.setPrototypeOf(obj, constructor.prototype);

   const res = constructor.apply(obj, args);
   return res !== null && typeof res === 'object' ? res : obj;

}


/**
 * 实现 instanceOf
 * @param {*} obj 
 * @param {*} constructor 
 */
function instanceOf(obj, constructor) {
    let proto = Object.getPrototypeOf(obj);
    const target = constructor.prototype; 
    while(proto) {
        if (target === proto) return true;
        proto = Object.getPrototypeOf(proto);
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