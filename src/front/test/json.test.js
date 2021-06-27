const {
    stringify,
    parse
} = require('../json')


test('测试stringify', () => {
    expect(stringify(12)).toEqual(JSON.stringify(12))
    expect(stringify(true)).toEqual(JSON.stringify(true))
    expect(stringify(false)).toEqual(JSON.stringify(false))
    expect(stringify(null)).toEqual(JSON.stringify(null))
    expect(stringify(undefined)).toEqual(JSON.stringify(undefined))
    expect(stringify("1231")).toEqual(JSON.stringify("1231"))

    function fn() {}
    expect(stringify(fn)).toEqual(JSON.stringify(fn))
    class Cls {}
    expect(stringify(Cls)).toEqual(JSON.stringify(Cls))
    const sym = Symbol('sym')
    expect(stringify(sym)).toEqual(JSON.stringify(sym))

    const arr = [null, undefined, Symbol(), 12, 34, {
        a: 12
    }, {
        b: true,
        [Symbol()]: 999,
        abc: [12, 23]
    }]

    expect(stringify(arr)).toEqual(JSON.stringify(arr))

    const obj = {
        number: 12,
        digit: 3.14159,
        boolean: true,
        boolean1: false,
        a: undefined,
        b: "1231",
        [Symbol()]: 'hell',
        arr,
        fn: function () {},
        y: Symbol(),
    }

    expect(stringify(obj)).toEqual(JSON.stringify(obj))
})

test('测试parse', () => {

    const arr = [null, undefined, Symbol(), 12, 34, {
        a: 12
    }, {
        b: true,
        [Symbol()]: 999,
        abc: [12, 23]
    }]
    const arrStr = JSON.stringify(arr);
    expect(parse(arrStr)).toEqual(JSON.parse(arrStr))

    const obj = {
        number: 12,
        digit: 3.14159,
        boolean: true,
        boolean1: false,
        a: undefined,
        b: "1231",
        [Symbol()]: 'hell',
        arr,
        fn: function () {},
        y: Symbol(),
    }
    const objStr = JSON.stringify(obj)

    expect(parse(objStr)).toEqual(JSON.parse(objStr))
})