const EventBus = require('../EventBus');


test('on emit', done => {
    const eventBus = new EventBus();
    const name = 'hello'
    const ARGS = [1, 2]
    eventBus.on(name, (...args) => {
        ARGS.forEach((val, index) => {
            expect(args[index]).toBe(val);
        })
    })
    eventBus.on(name, (...args) => {
        ARGS.forEach((val, index) => {
            expect(args[index]).toBe(val);
        })
    })
    eventBus.emit(name, ...ARGS);
    done();
});


test('on off', done => {
    const eventBus = new EventBus();
    const name = 'hello'
    const ARGS = [1, 2]
    let result = []
    const handle = (...args) => {
        result = args;
    }
    eventBus.on(name, handle)
    eventBus.emit(name, ...ARGS);
    expect(result).toStrictEqual(ARGS);
    done();
});

test('on off1', done => {
    const eventBus = new EventBus();
    const name = 'hello'
    const ARGS = [1, 2]
    let result = []
    const handle = (...args) => {
        result = args;
    }
    eventBus.on(name, handle)
    eventBus.off(name, handle)
    eventBus.emit(name, ...ARGS);
    expect(result.length).toBe(0);
    done();
});


test('once', (done) => {
    const eventBus = new EventBus();
    const name = 'hello'
    let result = 0
    const handle = () => {
        result++;
    }
    eventBus.once(name, handle)
    eventBus.emit(name);
    eventBus.emit(name);
    expect(result).toBe(1);
    done();
})

test('once2', (done) => {
    const eventBus = new EventBus();
    const name = 'hello'
    let result = 0
    const handle = () => {
        result++;
    }
    eventBus.on(name, handle)
    eventBus.emit(name);
    eventBus.emit(name);
    expect(result).toBe(2);
    done();
})