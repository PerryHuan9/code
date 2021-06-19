const {
    clone,
    deepClone,
    newObj
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


test("测试自己实现的new", () => {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.getInfo = function () {
        return this.name + this.age;
    }
    const person = new Person('hello', 18);
    const person1 = newObj(Person, 'hello', 18);

    expect(person1.name).toEqual(person.name)
    expect(person1.age).toBe(person.age)
    expect(person1.getInfo()).toEqual(person.getInfo())

})