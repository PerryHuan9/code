class Scheduler {
    constructor(num = 2) {
        this.limitNum = num;
        this.tasks = [];
        this.runNum = 0;
    }

    async run() {
        if (!this.tasks.length) {
            this.runNum = 0;
            return;
        }
        const num = this.limitNum - this.runNum
        const runTasks = this.tasks.splice(0, num);
        this.runNum += num
        await Promise.all(runTasks.map((task) => task()))
        this.run();
    }

    add(fn, ...args) {
        return new Promise((resolve, reject) => {
            const task = async () => {
                try {
                    const res = await fn(...args)
                    resolve(res)
                } catch (e) {
                    reject(e);
                } finally {
                    if (this.runNum > 0) {
                        this.runNum--;
                    }
                }
            }
            this.tasks.push(task);
            if (this.runNum < this.limitNum) {
                this.run();
            }
        })
    }
}

const scheduler = new Scheduler();

const timeout = (fn, time = 500) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(fn())
    }, time)
})

scheduler.add(() => {
    console.log('sync-1')
}).then(() => {
    console.log('sync-1-end')
})
scheduler.add(() => {
    return timeout(() => {
        console.log('async-1')
    })
}).then(() => {
    console.log('async-1-end')
})


scheduler.add(() => {
    return timeout(() => {
        console.log('async-2')
    })
}).then(() => {
    console.log('async-1-end')
})

scheduler.add(() => {
    return timeout(() => {
        console.log('async-3')
    })
}).then(() => {
    console.log('async-2-end')
})

scheduler.add(() => {
    return timeout(() => {
        console.log('async-4')
    })
}).then(() => {
    console.log('async-3-end')
})

scheduler.add(() => {
    console.log('sync-2')
}).then(() => {
    console.log('sync-2-end')
})

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