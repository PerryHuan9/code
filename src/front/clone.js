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
 *  1. Date 和 RegExp需要特殊处理
 *  2. 循环引用也需要复制过去
 * 
 * @param {*} val 
 */
function deepClone(val, map = new WeakMap()) {
    if (val instanceof RegExp) return new RegExp(val);
    if (val instanceof Date) return new Date(val);
    if (val === null || typeof val !== 'object') return val;
    if (map.has(val)) return map.get(val);
    const newObj = new val.constructor();
    map.set(val, newObj);
    for (const key in val) {
        if (val.hasOwnProperty(key)) {
            newObj[key] = deepClone(val[key], map)
        }
    }
    return newObj;
}

function isType(type) {
    return (val) => Object.prototype.toString.call(val) === `[object ${type}]`
}


function trim(str) {
    return str.replace(/^\s+|\s+$/, '');
}



/**
 * 实现obj.create
 * @param {*} proto 
 */
function create(proto) {
    const obj = {}
    Object.setPrototypeOf(obj, proto);
    return obj;
}


module.exports = {
    clone,
    deepClone,
    create,
    isType,
    trim
}