/**
 * 浅克隆
 * @param {*} val 
 */
function clone(val) {
    if (typeof val !== 'object') return val;
    return {
        ...val
    };
}

/**
 * 深克隆
 * @param {*} val 
 */
function deepClone(val) {
    if (typeof val !== 'object') return val;
    const isArr = val instanceof Array;
    const res = isArr ? [] : {};
    for (let key in val) {
        res[key] = typeof val[key] === 'object' ? deepClone(val[key]) : val[key];
    }
    return res;
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

module.exports = {
    clone,
    deepClone,
    newObj
}