const Status = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

class MPromise {
  status = Status.PENDING;
  result = undefined;
  error = undefined;
  resolveCbs = [];
  rejectCbs = [];

  constructor(cb) {
    const resolve = (val) => {
      if (this.status !== Status.PENDING) return;
      this.result = val;
      this.status = Status.FULFILLED;
      this.resolveCbs.forEach((cb) => cb());
    };
    const reject = (err) => {
      if (this.status !== Status.PENDING) return;
      this.error = err;
      this.status = Status.REJECTED;
      this.rejectCbs.forEach((cb) => cb());
    };

    try {
      cb && cb(resolve, reject);
    } catch (err) {
      this.error = err;
      this.status = Status.REJECTED;
    }
  }

  then(resolveCb, rejectCb) {
    return new MPromise((resolve, reject) => {
      if (this.status === Status.FULFILLED) {
        this.onResolve(resolveCb, resolve, reject);
      } else if (this.status === Status.REJECTED) {
        this.onReject(rejectCb, resolve, reject);
      } else {
        this.resolveCbs.push(() => this.onResolve(resolveCb, resolve, reject));
        this.rejectCbs.push(() => this.onReject(rejectCb, resolve, reject));
      }
    });
  }

  catch(cb) {
    return new MPromise((resolve, reject) => {
      if (this.status === Status.FULFILLED) {
        resolve(this.result);
      } else if (this.status === Status.REJECTED) {
        this.onReject(cb, resolve, reject);
      } else {
        this.resolveCbs.push(() => resolve(this.result));
        this.rejectCbs.push(() => this.onReject(cb, resolve, reject));
      }
    });
  }

  finally(cb) {
    return new MPromise((resolve, reject) => {
      if (this.status === Status.PENDING) {
        this.rejectCbs.push(() => this.onFinally(cb, resolve, reject));
        this.resolveCbs.push(() => this.onFinally(cb, resolve, reject));
      } else if (this.status === Status.FULFILLED) {
        this.onFinally(cb, resolve, reject);
      }
    });
  }

  handleCbRes(res, resolve, reject) {
    if (res instanceof MPromise) {
      res
        .then((val) => {
          resolve(val);
        })
        .catch((err) => {
          reject(err);
        });
    } else if (typeof res === 'object' && typeof res.then === 'function') {
      res.then((val) => resolve(val));
    } else {
      resolve(res);
    }
  }

  onResolve(cb, resolve, reject) {
    setTimeout(() => {
      if (!cb) {
        return resolve(this.result);
      }
      try {
        const res = cb(this.result);
        this.handleCbRes(res, resolve, reject);
      } catch (err) {
        reject(err);
      }
    }, 0);
  }

  onReject(cb, resolve, reject) {
    setTimeout(() => {
      if (!cb) {
        return reject(this.error);
      }
      try {
        const res = cb(this.error);
        this.handleCbRes(res, resolve, res);
      } catch (err) {
        reject(err);
      }
    }, 0);
  }

  onFinally(cb, resolve, reject) {
    setTimeout(() => {
      try {
        cb && cb();
        if (this.status === Status.FULFILLED) resolve(this.result);
        if (this.status === Status.REJECTED) reject(this.error);
      } catch (err) {
        reject(err);
      }
    }, 0);
  }
}

module.exports = MPromise;
