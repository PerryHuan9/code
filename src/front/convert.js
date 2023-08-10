/**
 * 进制转换
 */
function convert(num, scale = 10) {
  if (scale <2 || scale > 16) throw new Error('scale must between 2 and 16');
  const str = '0123456789ABCDEF';
  let res = '';
  while(num) {
    res = str[num % scale] + res;
    num = Math.floor(num/scale);
  }
  return res;
}

function thousandth(str) {
  return str.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, '$&,');
}



module.exports = {
    convert,
    thousandth,
}
