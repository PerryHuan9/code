



function Persion() {
    this.name = 'hell'
    this.age = 12;
    this.getAge = function() {
        return this.age;
    }
}

Persion.prototype.getName =  function() {
    return this.name;
}


function Persion2() {

}

Persion2.prototype = new Persion();


const persion = new Persion();
const persion2 = new Persion2()

// Object.defineProperties(persion, {
//     name: {
//         configurable: true,
//         enumerable: false,
//         get() {
//             return 'hello world'
//         },
//         set(value) {
//             console.log(value)
//         }
//     }
// })
// console.log()
// console.log('JSON.stringify(persion)',JSON.stringify(persion))
// console.log('Object.keys(persion)',Object.keys(persion))

// for (a in new String('hello')) {
//     console.log(a)
// }

// console.log(Object.getOwnPropertyDescriptor(persion, 'toString'))



const isPalindrome = (arr) => {
    if (!arr) return false;
    let left = 0;
    let right = arr.length-1;
    while(left < right) {
        if (arr[left++]===arr[right--]) continue
        else return false;
    }
    return true;
}



const getPartition = (arr) => {
    if (!arr || !arr.length) return [];
    if (arr.length ===1) return [arr];
    const result = [];
    for (let i=0;i<arr.length;i++) {
        const begin = arr.slice(0,i+1); 
        if(!isPalindrome(begin)) continue;
        const sonResult  = i === arr.length-1 
            ? [[begin]]
            : getPartition(arr.slice(i+1, arr.length)).map(item => [begin, ...item])
        result.push(...sonResult)
    }
    return result;
}


const getPartition2 = (str, index, path, res) => {
    if (index===str.length) {
        res.push([path]);
        return 
    }
    for (let i=index;i<str.length;i++) {
        const son = str.slice(0, i+1);
        if (!isPalindrome(son)) continue;

        getPartition2(str,i, path, res)
    }
}



// console.log(getPartition2('aabb'))

const map  = new Map()
const wordDict =  ['a','ab'];
var wordBreak = function(s, index=0) {
    if (index >= s.length) return true
    if (!map.get(index)) {
        for (let i=0;i<wordDict.length;i++) {
            const word = wordDict[i];
            const sub = s.substr(index, word.length)
            console.log(index, i, word, sub)
            if (sub === word) {
                if (wordBreak(s, index + word.length)) {
                    map.set(index, true);
                    break;
                }
            }
            
        }
        map.set(index, false)
    }
    return map.get(index);
};

// console.log(
//     wordBreak(
//         "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaab",
//         0
//     )
// )


var wordBreak2 = function(s, wordDict) {
    const res = [];
    const pathStack = [];
    const len = s.length
    const breakWord = (index=0) => {
        console.log(index, len)
        if (index === len) {
            res.push(pathStack.join(' '));
            return;
        }
        for (let i=index;i<len;i++) {
            const sub = s.substring(index, i+1);
            if (wordDict.includes(sub)) {
                pathStack.push(sub);
                breakWord(i+1);
                pathStack.pop();
            }
        }
    }
    breakWord(0);
    return res;

};

const s="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
const words = ["a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"]

// console.log(wordBreak2(s, words))


var wordBreak3 = function(s, wordDict) {
    const map = new Map();
    const len = s.length;
    const breakWord = (index) => {
        if (index >= len) return [];
        if (map.has(index)) {
            return map.get(index);
        }
        const res = [];
        for (let i=index;i<len;i++) {
            const sub = s.slice(index, i+1);
            if (wordDict.includes(sub)) {
                // const result = i+1 < len 
                // ? breakWord(i+1).map(item => [sub,...item]) : [sub];
                const result =i+1 < len ? breakWord(i+1).map(item => [sub,...item]) : [[sub]]
                res.push(...result) 
            }
        }
        console.log(res)
        map.set(index, res);
        return res;
    }
    return breakWord(0);
};

// wordBreak3("catsanddog",["cat","cats","and","sand","dog"])

// console.log('end:',wordBreak3("catsanddog",["cat","cats","and","sand","dog"]))