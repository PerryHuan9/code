const MyPromise = require('../promiseStatic');
// const MyPromise = Promise

test('Promise.reject', done => {
    const p = Promise.resolve(999)
    MyPromise.reject(p).catch((err) => {
        expect(err).toBe(p)
        done()
    })
})

test('Promise all', done => {
    const RESULTS = [888, 999, 1000, 1111, 2222]
    const p1 = new Promise((resolve, reject) => {
        resolve(RESULTS[0])
    });
    const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(RESULTS[1]);
        }, 300)
    });
    const p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(RESULTS[2])
        }, (500));
    })

    const p4 = {
        then(resolve) {
            resolve(RESULTS[3])
        }
    }

    const p5 = RESULTS[4];

    MyPromise.all([p1, p2, p3, p4, p5]).then((res) => {
        res.forEach((r, index) => {
            expect(r).toBe(RESULTS[index])
        })
        done();
    })
});

test('Promise race', done => {
    const RESULTS = [888, 999, 1000, 1111, 2222]

    MyPromise.race([
        Promise.resolve(RESULTS[0]),
        Promise.resolve(RESULTS[1]),
        Promise.resolve(RESULTS[2]),
        Promise.resolve(RESULTS[3]),
    ]).then((res) => {
        expect(res).toBe(RESULTS[0])
        done();
    })
});

test('异步Promise race', done => {
    const RESULTS = [888, 999, 1000]

    const p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(RESULTS[0])
        }, (100));
    })
    const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(RESULTS[1])
        }, (200));
    })
    const p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(RESULTS[2])
        }, (300));
    })


    MyPromise.race([p1, p2, p3]).then((res) => {
        expect(res).toBe(RESULTS[0])
        done();
    })
});

test('Promise race reject', done => {
    const RESULTS = [888, 999, 1000]

    const p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(RESULTS[0])
        }, (100));
    })
    const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(RESULTS[1])
        }, (200));
    })
    const p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(RESULTS[2])
        }, (300));
    })


    MyPromise.race([p1, p2, p3])
        .then((res) => {})
        .catch((err) => {
            expect(err).toBe(RESULTS[0])
            done()
        })
});

test('Promise allSelected', done => {
    const RESULTS = [888, 999, 1000]

    const p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(RESULTS[0])
        }, (100));
    })
    const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(RESULTS[1])
        }, (200));
    })
    const p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(RESULTS[2])
        }, (300));
    })


    MyPromise.allSelected([p1, p2, p3])
        .then(([r1, r2, r3]) => {
            expect(r1.status).toBe('rejected')
            expect(r1.reason).toBe(RESULTS[0])

            expect(r2.status).toBe('fulfilled')
            expect(r2.value).toBe(RESULTS[1])

            expect(r3.status).toBe('fulfilled')
            expect(r3.value).toBe(RESULTS[2])

            done()
        })
});


test('Promise any', done => {
    const RESULTS = [888, 999, 1000]

    const p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(RESULTS[0])
        }, (100));
    })
    const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(RESULTS[1])
        }, (200));
    })
    const p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(RESULTS[2])
        }, (300));
    })


    MyPromise.any([p1, p2, p3])
        .then((res) => {
            expect(res).toBe(RESULTS[1])
            done()
        })
});

test('Promise any reject', done => {
    const RESULTS = [888, 999, 1000]

    const p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(RESULTS[0])
        }, (100));
    })
    const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(RESULTS[1])
        }, (200));
    })
    const p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(RESULTS[2])
        }, (300));
    })


    MyPromise.any([p1, p2, p3])
        .catch((res) => {
            res.forEach((r, index) => {
                expect(r).toBe(RESULTS[index])
            })
            done()
        })
});

test('Promise try', done => {
    const results = [];
    const mydo = () => {
        results.push(888)
    }

    MyPromise.try(mydo)
        .then((res) => {
            expect(results[0]).toBe(888)
            expect(results[1]).toBe(999)
            done()
        })
    results.push(999);
});

test('Promise try async', done => {
    const results = [];
    const mydo = () => {
        return Promise.resolve().then(() => {
            results.push(888)
            return 666;
        })
    }

    MyPromise.try(mydo)
        .then((res) => {
            expect(res).toBe(666)
            expect(results[0]).toBe(999)
            expect(results[1]).toBe(888)
            done()
        })
    results.push(999);
});