const MyPromise = require('../MyPromise');
// const MyPromise = Promise;

test('错误穿透', (done) => {
  const errorVal = '错误';
  new MyPromise((resolve, reject) => {
    reject(errorVal);
  })
    .then()
    .catch()
    .then(() => {})
    .catch((err) => {
      expect(err).toBe(errorVal);
      done();
    });
});

test('异步promise', (done) => {
  const VAL = 888;
  new MyPromise((resolve) => {
    setTimeout(() => {
      resolve(VAL);
    }, 100);
  }).then((val) => {
    expect(val).toBe(VAL);
    done();
  });
});

test('then中返回resolved 状态 的promise', (done) => {
  const VAL = 888;
  new MyPromise((resolve) => {
    resolve(VAL);
  })
    .then((val) => {
      return new MyPromise((resolve) => {
        setTimeout(() => {
          resolve(val);
        }, 100);
      });
    })
    .then((val) => {
      expect(val).toBe(VAL);
      done();
    });
});

test('then中返回rejected状态的promise', (done) => {
  const VAL = 888;
  new MyPromise((resolve) => {
    resolve(VAL);
  })
    .then((val) => {
      return new MyPromise((resolve, reject) => {
        setTimeout(() => {
          reject(val);
        }, 100);
      });
    })
    .then((val) => {})
    .catch((val) => {
      expect(val).toBe(VAL);
      done();
    });
});

test('then穿透', (done) => {
  const VAL = 888;
  new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(VAL);
    }, 100);
  })
    .then()
    .catch((val) => {})
    .then((val) => {
      expect(val).toBe(VAL);
      done();
    });
});

test('catch 穿透', (done) => {
  const VAL = 888;
  new MyPromise((resolve, reject) => {
    setTimeout(() => {
      reject(VAL);
    }, 100);
  })
    .catch()
    .then((val) => {})
    .catch((val) => {
      expect(val).toBe(VAL);
      done();
    });
});

test('finally: 同步resolve', (done) => {
  const VAL = 999;
  new MyPromise((resolve, reject) => {
    resolve(VAL);
  })
    .finally((val) => {
      expect(val).toBeUndefined();
    })
    .catch((err) => {})
    .then((val) => {
      expect(val).toBe(VAL);
      done();
    });
});

test('finally: 异步resolve', (done) => {
  const VAL = 999;
  new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(VAL);
    }, 100);
  })
    .finally((val) => {
      expect(val).toBeUndefined();
    })
    .catch((err) => {})
    .then((val) => {
      expect(val).toBe(VAL);
      done();
    });
});

test('finally: 抛出错误', (done) => {
  const VAL = '999';
  new MyPromise((resolve, reject) => {
    resolve();
  })
    .finally((val) => {
      throw new Error(VAL);
    })
    .then((val) => {})
    .catch((err) => {
      expect(err.message).toBe(VAL);
      done();
    });
});
