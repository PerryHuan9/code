/**
 * 返回一个柯里化的函数
 * @param {*} fn 
 * @param {*} args 
 */
function curry(fn) {
    const args = arguments[1] || []
    return function () {
        const newArgs = args.concat([...arguments])
        if (fn.length > newArgs.length) {
            return curry.call(this, fn, newArgs)
        } else {
            return fn.apply(this, newArgs);
        }
    }
}


module.exports = {
    curry
}