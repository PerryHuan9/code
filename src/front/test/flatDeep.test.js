const { flatDeep } = require('../flatDeep');

test('flatDeep', () => {
  const arr = [1, 2, 3, [5, 6, 7, [9, 10, 11, [12, 13, 14]]]];

  expect(flatDeep(arr)).toEqual([1, 2, 3, 5, 6, 7, [9, 10, 11, [12, 13, 14]]]);
  expect(flatDeep(arr, 2)).toEqual([1, 2, 3, 5, 6, 7, 9, 10, 11, [12, 13, 14]]);
  expect(flatDeep(arr,3)).toEqual([1, 2, 3, 5, 6, 7, 9, 10, 11, 12, 13, 14]);
});
