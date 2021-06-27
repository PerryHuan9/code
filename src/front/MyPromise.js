function nextTick(fn) {
    return () => setTimeout(() => fn())
}

class MyPromise {
    constructor(func) {
        this.status = 'pending'
        this.result = undefined;
        this.error = undefined;

        this.resoledCallbacks = [];
        this.rejectedCallbacks = [];

        const resolve = (result) => {
            this.status = 'resolved'
            this.result = result;
            setTimeout(() => {
                this.resoledCallbacks.forEach((callback) => callback())
            })
        };
        const reject = (error) => {
            this.status = 'rejected'
            this.error = error;
            setTimeout(() => {
                this.rejectedCallbacks.forEach((callback) => callback())
            })
        };
        try {
            func && func(resolve, reject);
        } catch (err) {
            this.status = 'rejected';
            this.error = err;
        }
    }

    onResolve(callback, resolve, reject) {
        if (!callback) return resolve();
        try {
            const result = callback(this.result);
            if (result instanceof MyPromise) {
                result.then((res) => {
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                })
            } else if (result instanceof Object && result.then instanceof Function) {
                result.then(res => {
                    resolve(res);
                })
            } else {
                resolve(result);
            }
        } catch (err) {
            reject(err)
        }
    }

    onReject(callback, resolve, reject) {
        if (!callback) return reject(this.error);
        try {
            const res = callback(this.error);
            resolve(res)
        } catch (err) {
            reject(err);
        }
    }

    then(resolveCallback, rejectedCallback) {
        return new MyPromise((resolve, reject) => {
            setTimeout(() => {
                if (this.status === 'resolved') {
                    this.onResolve(resolveCallback, resolve, reject);
                } else if (this.status === 'rejected') {
                    this.onReject(rejectedCallback, resolve, reject);
                } else {
                    this.resoledCallbacks.push(() => this.onResolve(resolveCallback, resolve, reject));
                    this.rejectedCallbacks.push(() => this.onReject(rejectedCallback, resolve, reject));
                }
            })
        })
    }

    catch (callback) {
        return new MyPromise((resolve, reject) => {
            setTimeout(() => {
                if (this.status === 'resolved') {
                    resolve(this.result);
                } else if (this.status === 'rejected') {
                    this.onReject(callback, resolve, reject);
                } else {
                    this.resoledCallbacks.push(() => resolve(this.result));
                    this.rejectedCallbacks.push(() => this.onReject(callback, resolve, reject));
                }
            })
        })
    }

    onFinally(callback, resolve, reject) {
        try {
            callback && callback();
            if (this.status === 'resolved') resolve(this.result);
            if (this.status === 'rejected') reject(this.error);
        } catch (err) {
            reject(err)
        }
    }

    /**
     * 
     * @param {*} callback 
     */
    finally(callback) {
        return new MyPromise((resolve, reject) => {
            if (this.status === 'pending') {
                this.resoledCallbacks.push(() => this.onFinally(callback, resolve, reject));
                this.rejectedCallbacks.push(() => this.onFinally(callback, resolve, reject));
            } else {
                this.onFinally(callback, resolve, reject);
            }
        })
    }
}

module.exports = MyPromise