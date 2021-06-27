const {
    curry
} = require('../curry');
const {
    expect
} = require('@jest/globals');

test("currt 柯里化", () => {
    function add(a, b, c) {
        return a + b + c;
    }
    const curryAdd = curry(add);
    expect(curryAdd(1)(2, 3)).toBe(add(1, 2, 3))
    expect(curryAdd(1, 2)(3)).toBe(add(1, 2, 3))
    expect(curryAdd(1)(2)(3)).toBe(add(1, 2, 3))

})