const {
    bind,
    apply,
    call,
    newObj,
    instanceOf
} = require('../bind')


test('bind', done => {
    function myDo() {
        return this.value;
    }
    const obj = {
        value: 888,
        myDo
    }
    expect(obj.value).toBe(obj.myDo())
    const obj1 = {
        value: 999,
        myDo
    }
    expect(obj1.value).toBe(obj1.myDo())

    myDo = bind(myDo, {
        value: 666
    })
    // myDo = myDo.bind({
    //     value: 666
    // })

    const obj2 = {
        value: 777,
        myDo
    }
    const obj3 = {
        value: 555,
        myDo
    }

    expect(obj2.myDo()).toBe(666)
    expect(obj3.myDo()).toBe(666)
    done()
});



test('apply', done => {
    function myDo(a, b) {
        return this.value + a + b;
    }
    const obj = {
        value: 1
    }
    expect(apply(myDo, obj, [2, 3])).toBe(6)

    expect(apply(myDo, null, [2, 3])).toBe(NaN)

    expect(call(myDo, {
        value: 2
    }, 2, 3)).toBe(7)


    done()
});

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

    expect(Object.getPrototypeOf(person1)).toEqual(Object.getPrototypeOf(person1))
    expect(person.constructor).toEqual(person1.constructor)
    expect(person1.name).toEqual(person.name)
    expect(person1.age).toBe(person.age)
    expect(person1.getInfo()).toEqual(person.getInfo())

})

test("测试实现的instanceOf", () => {
    const obj = {};
    expect(instanceOf(obj, Object)).toBe(obj instanceof Object)
    const arr = []
    expect(instanceOf(arr, Array)).toBe(arr instanceof Array)
    expect(instanceOf(arr, Object)).toBe(arr instanceof Object)
    const reg = new RegExp();
    expect(instanceOf(reg, RegExp)).toBe(reg instanceof RegExp)
    expect(instanceOf(reg, Object)).toBe(reg instanceof Object)

})