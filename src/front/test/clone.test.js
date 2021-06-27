const {
    clone,
    deepClone,
    create,

} = require('../clone')



test("浅克隆", () => {
    const obj = {
        a: {
            b: 12
        },
        c: 23
    };
    const obj1 = clone(obj);
    expect(obj1 === obj).toBe(false);
    expect(obj1.a === obj.a).toEqual(true);
    obj.a.b = 888;
    expect(obj1.a.b).toBe(888)
})

test("深克隆", () => {
    const obj = {
        a: {
            b: 12
        },
        c: 23
    };
    const obj1 = deepClone(obj);

    expect(obj1 === obj).toBe(false);
    expect(obj1.a === obj.a).toEqual(false);
    obj.a.b = 888;
    expect(obj1.a.b).toBe(12)
})



test("测试复制循环引用", () => {
    const a = {
        aKey: 'aaaaa'
    }
    const b = {
        bKey: 'bbbbb'
    }
    a.bObj = b;
    b.aObj = a;

    const obj = {
        a,
        b
    };
    const obj1 = deepClone(obj);

    expect(obj1.a.bObj).toBe(obj1.b);
    expect(obj1.b.aObj).toEqual(obj1.a);
})


test("测试create", () => {
    const a = {
        aKey: 'aaaaa',
        getVal() {
            return this.name;
        }
    }

    const obj1 = Object.create(a);
    const obj2 = create(a);
    obj1.aKey = 888;

    expect(obj1.__proto__.aKey).toBe(obj2.__proto__.aKey);
})