function deepClone(val) {
    if (typeof val !== "object") return val;
    const isArr = val.constructor === Array;
    const res = isArr ? [] : {};
    for (const key in val) {
        res[key] =
            typeof val[key] === "object" ? deepClone(val[key]) : val[key];
    }
    return res;
}

const obj = {
    a: {
        c: 12,
        d: 14,
    },
    b: 45,
};

const obj2 = deepClone(obj);
obj.a.c = 88;
console.log(obj);
console.log(obj2);

const arr = [12, 34, { a: 55, b: 44 }];
const arr2 = deepClone(arr);
arr[2].a = 99;
console.log(arr);
console.log(arr2);

const bind = (func, obj) => {
    const context = obj;
    const key = Symbol();
    context[key] = func;
    return () => {
        context[key]();
        delete obj[key];
    };
};

const obj5 = {
    a: 12,
    log() {
        console.log(this.a);
    },
};
const log = obj5.log;
log();
bind(log, obj5)();

function Parent(type) {
    this.parent = type;
}

function Son(type, son) {
    this.son = params;
    Parent.call(this, type);
}

Son.prototype = Parent.prototype;
Son.prototype.constructor = Son;
