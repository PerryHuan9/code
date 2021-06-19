const p = new Promise((resolve) => {
  resolve();
});

p.finally(() => {});
p.then(() => {});

Promise.all([]);

function hello() {}

hello.apply();
hello.call();
