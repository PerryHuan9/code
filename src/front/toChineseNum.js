function numToChinese(n) {
  const nums = '零一二三四五六七八九';
  return nums[n];
}

function chineseNumber(num) {
  const units = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿'];
  let res = '';
  let unitIndex = 0;
  while (num) {
    if (units[unitIndex] === undefined) {
      break;
    }
    const val = num % 10;
    num = Math.floor(num / 10);
    res = numToChinese(val) + units[unitIndex] + res;
    unitIndex++;
  }
  res = res
  .replace(/零(百|十|千)/g, '零')
  .replace(/十零/g, '十')
  .replace(/零$/, '')
  .replace(/零+/g, '零')
  .replace(/零亿/g, '亿')
  .replace(/零万/g, '万')
  .replace(/亿万/g, '亿')
  .replace(/^一十/g, '十');
  return res;
}

module.exports = {
  chineseNumber
}

