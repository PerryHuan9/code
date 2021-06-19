

const debounce = (cb, timeout) => {
    let handler;
    return function(...param){
        clearTimeout(handler)
        handler = setTimeout(() => {
            cb(...param)
        }, timeout);
    }
}

const race = (arr) => {
    return new Promise((resolve, reject) => {
        arr.forEach(a => {
            a.then((res) => {
                resolve(res)
            }).catch((err)=> {
                reject(err)
            })
        });
    });
}


const makePromise = (value,timeout, isFullfill) => {
    return new Promise((resolve, reject)=> {
        setTimeout(() => {
            if (isFullfill){
                resolve(value)
            } else {
                reject(value);
            }
        }, timeout);
    })
}

race([
    makePromise('hello world', 0, false),
    makePromise('hello world2', 1, false),
    makePromise('年后', 2, false),
    Promise.resolve('resolve')
])
.then(valu => {
    console.log('valu', valu)
}).catch((err) => {
    console.log('reject:',err)
})



const reduce = (arr, cb, result) => {
    arr.forEach((value, index) => {
        result = cb(result, value, index, arr)
    })
    return result;
}

String.prototype._trim = function() {
    const value = this.toString();
    let start=0;
    const length = value.length;
    let end = length-1;
    let isOk = false;
    for (let i=0; i< length;i++) {
        if (value[i]) {
            start = i;
            if (isOk) {
                break;
            } else {
                isOk = true;
            }
        } 
        if (value[length-i-1]) {
            end = length - i -1;
            if (isOk) {
                break;
            } else {
                isOk = true;
            }
        }
    }
    return value.slice(start, end+1)
}

console.log('  12313  '._trim())
console.log('  12313'._trim())
console.log('  12    313  '._trim())
console.log(''._trim())




const fetchPool = (promises, limit) => {
    if (promises.length<=0) return []
    const batchPromise = promises.slice(0, limit)
    let results = [];
    return Promise.all(batchPromise).then((values) => {
        results = values;
        return fetchPool(promises.slice(limit, promises.length), limit)
    }).then((res) => {
        return results.concat(res)
    })
}

fetchPool([
    makePromise(1, 200, true),
    makePromise(2, 300, true),
    makePromise(3, 1000, true),
    makePromise(4, 2000, true),
    makePromise(5, 3000, true),
], 2).then((result) => {
    console.log('result', result)
})




  
