const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook,
    AsyncHook,
} = require("tapable");

const asyncHook = new AsyncHook(["eventName"]);

console.time("sync cost");
asyncHook.tap("hello", (name, cb) => {
    console.log("hello");
});

asyncHook.tap("hello again", (name) => {
    console.log("agea");
});

console.log("---------------------------------------------------");

const asyncParallelHook = new AsyncParallelHook(["name"]);

console.time("cost");

asyncParallelHook.tapAsync("hello", (name, cb) => {
    setTimeout(() => {
        console.log(`hello ${name}`);
        cb();
    }, 2000);
});
asyncParallelHook.tapAsync("go die", (name, cb) => {
    console.log("go die", name);
});
asyncParallelHook.tapPromise("hello again", (name) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`hello ${name}, again`);
            resolve();
        }, 1000);
    });
});

asyncParallelHook.callAsync("ahonn", () => {
    console.log("done");
    console.timeEnd("cost");
});
