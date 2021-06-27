const {
    convert

} = require('../convert')



test("进制转换", () => {
    const num = 888;
    expect(convert(num, 2)).toBe(num.toString(2))
    expect(convert(num, 3)).toBe(num.toString(3))
    expect(convert(num, 4)).toBe(num.toString(4))
    expect(convert(num, 5)).toBe(num.toString(5))
    expect(convert(num, 6)).toBe(num.toString(6))
    expect(convert(num, 7)).toBe(num.toString(7))
    expect(convert(num, 8)).toBe(num.toString(8))
    expect(convert(num, 9)).toBe(num.toString(9))
    expect(convert(num, 10)).toBe(num.toString(10))
    expect(convert(num, 11)).toBe(num.toString(11))
    expect(convert(num, 12)).toBe(num.toString(12))
    expect(convert(num, 16)).toBe(num.toString(16))
})