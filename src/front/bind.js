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


module.exports = {
    bind,
    apply,
    call
}