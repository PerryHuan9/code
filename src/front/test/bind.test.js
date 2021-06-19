const {
    bind,
    apply,
    call
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