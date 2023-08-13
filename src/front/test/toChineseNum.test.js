const { chineseNumber } = require('../toChineseNum');

test('数字转中文数字', () => {
  expect(chineseNumber(1234_5678_9098_7654)).toBe('一千二百三十四万五千六百七十八亿九千零九十八万七千六百五十四');
  expect(chineseNumber(1000_0000_0000_0002)).toBe('一千万亿零二');
});
