/**
 * 进制转换
 */
function convert(num, scale = 10) {
    if (scale === 10) return num.toString();
    const numStr = '0123456789ABCDEF';
    const stack = [];
    while (num) {
        stack.push(num % scale)
        num = (num / scale) | 0
    }
    let res = ''
    for (const val of stack) {
        res = val + res;
    }
    return res;
}

function thousandth2(str) {}

function thousandth(str) {
    return str.replace(/\d(?=(?:\d{3})+(?:\.\d+|$))/g, '$&,');
}

console.log(thousandth('1123123123123123.3453'))
// 1,123,123,123,123,123.3,453


module.exports = {
    convert
}