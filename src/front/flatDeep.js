/**
 * 拍平数组，level表示拍平的层级，
 * level==1时表示仅拍平arr的子项数组
 * level -1 会全部拍平
 * @param {*} arr
 * @param {*} level
 */
function flatDeep(arr, level = 1) {
  return level === 0
    ? arr.slice()
    : arr.reduce((res, item) => (Array.isArray(item) ? res.concat(flatDeep(item, level - 1)) : res.concat(item)), []);
}

module.exports = {
  flatDeep,
};
