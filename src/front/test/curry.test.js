const { curry, placeholderCurry } = require('../curry');

test('currt 柯里化', () => {
  function add(a, b, c) {
    return a + b + c;
  }
  const curryAdd = curry(add);
  expect(curryAdd(1)(2, 3)).toBe(add(1, 2, 3));
  expect(curryAdd(1, 2)(3)).toBe(add(1, 2, 3));
  expect(curryAdd(1)(2)(3)).toBe(add(1, 2, 3));
});

test('placeholderCurry 柯里化', () => {
  function dot(x1, y1, x2, y2) {
    return x1 * x2 + y1 * y2;
  }

  const __ = placeholderCurry.__;

  const p1 = placeholderCurry(dot, 3, 4);
  expect(typeof placeholderCurry(dot, 2, __, __, 4)).toBe('function');
  expect(placeholderCurry(dot, 10, __, 10, __)(2, 3)).toBe(dot(10, 2, 10, 3));
  expect(placeholderCurry(dot, __, __, __, 5)(4, __, 2)(__)(3)).toBe(dot(4, 3, 2, 5));
  expect(placeholderCurry(dot, 3)(__, __)(4, __, 2)(3)).toBe(dot(3, 4, 3, 2));
  expect(placeholderCurry(dot)(3, __, __, 4)(5, 6)).toBe(dot(3, 5, 6, 4));
  expect(placeholderCurry(dot, 3, 4, 5, 3)()).toBe(dot(3, 4, 5, 3));
  expect(p1(5, 6)).toBe(dot(3, 4, 5, 6));
  expect(p1(7, 8)).toBe(dot(3, 4, 7, 8));
  expect(p1(5)(6)).toBe(dot(3, 4, 5, 6));
  expect(p1(7)(8)).toBe(dot(3, 4, 7, 8));
});
