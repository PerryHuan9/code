function isFunction(func) {
    return typeof func === "function";
}

function isObject(obj) {
    return typeof func === "object";
}

module.exports = class Promise {
    constructor(func) {
        this.status = "PENGDING";
        this.value = undefined;
        this.error = undefined;
        this.resolveCallbacks = [];
        this.rejectCallbacks = [];

        const resolve = (val) => {
            setTimeout(() => {
                this.value = val;
                this.staus = "FULFILL";
                this.resolveCallbacks.forEach((cb) => cb());
            });
        };
        const reject = (err) => {
            setTimeout(() => {
                this.error = err;
                this.status = "REJECT";
                this.rejectCallbacks.forEach((cb) => cb());
            });
        };

        try {
            func(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }


    onResolve(onFulfilled, resolve, reject) {
        try {
            if (!isFunction(onFulfilled)) {
                resolve();
                return;
            }
            const val = onFulfilled(this.value)
            if (val instanceof Promise || (isObject(val) && isFunction(val.then))) {
                val.then(
                    (result) => {
                        resolve(result);
                    }, (error) => {
                        reject(error)
                    }
                )
            } else {
                resolve(val)
            }

        } catch (e) {
            reject(e);
        }
    }

    onReject(onRejected, resolve, reject) {
        if (!isFunction(onRejected)) {
            reject(this.error);
            return;
        }
        try {
            const val = onRejected(this.error)
            if (val instanceof Promise || (isObject(val) && isFunction(val.then))) {
                val.then(
                    (result) => {
                        resolve(result);
                    }, (error) => {
                        reject(error)
                    }
                )
            } else {
                resolve(val)
            }
        } catch (e) {
            reject(e);
        }
    }

    finally(fn) {
        const onResolve = this.onResolve.bind(this);
        const _fn = () => isFunction(fn) && fn()


        return new Promise((resolve, reject) => {
            const onReject = () => {
                const val = fn()
                if (val instanceof Promise || (isObject(val) && isFunction(val.then))) {
                    val.then(() => {
                        reject(this.error);
                    }, (error) => {
                        reject(error)
                    })
                } else {
                    reject(this.error);
                }

            }
            const _resolve = () => resolve()
            if (this.status === "PENGDING") {
                this.resolveCallbacks.push(() => onResolve(_fn, _resolve, reject))
                this.rejectCallbacks.push(onReject)
            } else if (this.status === 'FULFILL') {
                onResolve(_fn, _resolve, reject)
            } else {
                // onReject(fn, _resolve, reject);
                const val = fn()
                if (val instanceof Promise || (isObject(val) && isFunction(val.then))) {
                    val.then(() => {
                        reject(this.error);
                    }, (error) => {
                        reject(error)
                    })
                } else {
                    reject(this.error);
                }

            }
        });
    }

    then(onFulfilled, onRejected) {
        const onResolve = this.onResolve.bind(this);
        const onReject = this.onReject.bind(this);
        return new Promise((resolve, reject) => {
            if (this.status === "PENGDING") {
                this.resolveCallbacks.push(() => onResolve(onFulfilled, resolve, reject));
                this.rejectCallbacks.push(() => onReject(onRejected, resolve, reject));
            } else if (this.status === "FULFILL") {
                onResolve(onFulfilled, resolve, reject)
            } else {
                onReject(onRejected, resolve, reject);
            }
        });
    }

    catch (onRejected) {
        const onReject = this.onReject.bind(this);
        return new Promise((resolve, reject) => {
            if (this.status === "PENGDING") {
                this.resolveCallbacks.push(resolve);
                this.rejectCallbacks.push(() => onReject(onRejected, resolve, reject));
            } else if (this.status === "FULFILL") {
                resolve();
            } else {
                onReject(onRejected, resolve, reject);
            }
        })
    }
}

const promise = new Promise((resolve, reject) => {
    resolve("hello");
});

promise
    .then((val) => {
        return val + "-second";
    })
    .then((val) => {
        console.log(val);
    });
promise
    .then((val) => {
        return val + "-second2";
    })
    .then((val) => {
        return val + "-third";
    })
    .then((val) => {
        console.log(val);
    });

promise
    .then((val) => {
        // return new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve("5秒后" + val);
        //     }, 1000);
        // });
    })
    .then((val) => {
        throw new Error('wrong');
    })
    .finally(() => {
        console.log('finally')
    })
// .catch(e => {
//     console.log('when', e.message);
// }).then(() => {

// })