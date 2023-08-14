const { checkVersion } = require('../version');

test('测试版本比较', () => {
  expect(checkVersion('1.01', '1.001')).toBe(0);
  expect(checkVersion('1.0', '1.0.0')).toBe(0);
  expect(checkVersion('0.1', '1.1')).toBe(-1);
  expect(checkVersion('1.0.1', '1')).toBe(1);
  expect(checkVersion('7.5.2.4', '7.5.3')).toBe(-1);
});
