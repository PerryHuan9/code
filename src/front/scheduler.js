class Scheduler {
  constructor(num = 3) {
    this._limitNum = num;
    this._tasks = [];
    this._runNum = 0;
  }

  add(fn, ...args) {
    return new Promise((resolve, reject) => {
      const task = async () => {
        try {
          const res = await fn(...args);
          resolve(res);
        } catch (err) {
          reject(err);
        } finally {
          this._runNum--;
          this._run();
        }
      };
      this._tasks.push(task);
      this._run();
    });
  }

  _run() {
    if (!this._tasks.length || this._runNum >= this._limitNum) return;
    const allowRunCount = this._limitNum - this._runNum;
    const runTasks = this._tasks.splice(0, allowRunCount);
    this._runNum += runTasks.length;
    runTasks.forEach((task) => task());
  }
}

const scheduler = new Scheduler();

const timeout = (fn, time = 500) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, time);
  });

scheduler
  .add(() => {
    console.log('sync-1');
  })
  .then(() => {
    console.log('sync-1-end');
  });

scheduler
  .add(() => {
    return timeout(() => {
      console.log('async-1');
    }, 10000);
  })
  .then(() => {
    console.log('async-1-end');
  });
scheduler
  .add(() => {
    return timeout(() => {
      console.log('async-2');
    }, 10000);
  })
  .then(() => {
    console.log('async-2-end');
  });

scheduler
  .add(() => {
    console.log('sync-5');
  })
  .then(() => {
    console.log('sync-5-end');
  });

scheduler
  .add(() => {
    return timeout(() => {
      console.log('async-3');
    });
  })
  .then(() => {
    console.log('async-3-end');
  });

scheduler
  .add(() => {
    return timeout(() => {
      console.log('async-4');
    });
  })
  .then(() => {
    console.log('async-4-end');
  });

scheduler
  .add(() => {
    console.log('sync-2');
  })
  .then(() => {
    console.log('sync-2-end');
  });

// sync-1
// sync-1-end
// async-1
// async-1-end
// async-2
// async-1-end
// async-3
// async-2-end
// async-4
// async-3-end
// sync-2
