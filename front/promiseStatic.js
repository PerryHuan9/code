function resolve(val) {
    if (val instanceof Promise) return val;
    if (val && val.then instanceof Function) return new Promise(val.then);
    return new Promise((resolve) => resolve(val));
}

function reject(val) {
    return new Promise((resolve, reject) => reject(val))
}

function all(promises) {
    promises = promises.map((promise) => resolve(promise))

    const results = []
    let count = 0;
    return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => {
            promise.then((result) => {
                results[index] = result;
                count++;
                if (count === promises.length) {
                    resolve(results);
                }
            }).catch((err) => {
                reject(err);
            })
        });
    })
}

function race(promises) {
    let isPending = true;
    return new Promise(
        (resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                if (!isPending) break;
                promises[i].then((result) => {
                    isPending = false;
                    resolve(result)
                }).catch((err) => {
                    isPending = false;
                    reject(err)
                })
            }
        }
    )
}

function allSelected(promises) {
    const results = []
    let count = 0;
    const check = (resolve) => {
        count++;
        if (count === promises.length) {
            resolve(results);
        }
    }
    return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => {
            promise.then((result) => {
                results[index] = {
                    status: 'fulfilled',
                    value: result
                };
                check(resolve);

            }).catch((err) => {
                results[index] = {
                    status: 'rejected',
                    reason: err
                }
                check(resolve)
            })
        });
    })
}

function any(promises) {
    const errors = []
    let count = 0;
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then((result) => {
                resolve(result)
            }).catch((err) => {
                errors[i] = err;
                count++;
                if (count === promises.length) {
                    reject(errors)
                }
            })
        }
    })
}


function myTry(callback) {
    return new Promise((resolve, reject) => {
        resolve(callback())
    })
}



module.exports = {
    resolve,
    reject,
    all,
    race,
    allSelected,
    any,
    try: myTry
}