/**
 * 拍平数组，level表示拍平的层级，
 * level==1时表示仅拍平arr的子项数组
 * level -1 会全部拍平
 * @param {*} arr 
 * @param {*} level 
 */
function flatDeep(arr, level = 1) {
    return level !== 0 ?
        arr.reduce((res, item) => Array.isArray(item) ? res.concat(flatDeep(item, level - 1)) : res.concat([item]), []) :
        arr.slice();
}


const arr = [1, 2, 3, [5, 6, 7, [9, 10, 11, [12, 13, 14]]]]

console.log(flatDeep(arr))
// [ 1, 2, 3, 5, 6, 7, [ 9, 10, 11, [ 12, 13, 14 ] ] ]

console.log(flatDeep(arr, 2))
// [ 1, 2, 3, 5, 6, 7, 9, 10, 11, [ 12, 13, 14 ] ]

console.log(flatDeep(arr, -1))
// [1,  2,  3,  5,  6,7,  9, 10, 11, 12,13, 14]


function Persion() {
    this.name = 'hello'
    this[Symbol('obj')] = 'symbol'
}

Persion.prototype.age = 888;
Persion.prototype.getName = () => {}
Persion.prototype[Symbol('prototype')] = () => {}


const p = new Persion();

for (let key in p) {
    console.log(key)
}

const names = Object.getOwnPropertyNames(p);
const names2 = Object.getOwnPropertySymbols(Object.getPrototypeOf(p))

console.log(names)
console.log(names2)