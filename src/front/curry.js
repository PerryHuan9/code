/**
 * 返回一个柯里化的函数
 * @param {*} fn 
 * @param {*} args 
 */
function curry(fn) {
    const args = arguments[1] || [];

    return function() {
        const newArgs = args.concat([...arguments]);
        if (newArgs.length === fn.length) {
            return fn(...newArgs);
        }
        return curry(fn, newArgs);
    }
   
}


module.exports = {
    curry
}