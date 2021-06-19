/**
 * @param {number} n
 * @return {number}
 * 使用矩阵快速幂优化
 *
 */
// const matrixMultiply = (a, b) => {
//     const c = [
//         [0, 0],
//         [0, 0],
//     ];
//     for (let i = 0; i < 2; i++) {
//         for (let j = 0; j < 2; j++) {
//             c[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j];
//         }
//     }
//     return c;
// };
// const matrixPow = (a, n) => {
//     let ans = [
//         [1, 0],
//         [0, 1],
//     ];
//     while (n) {
//         if (n & 1) {
//             ans = matrixMultiply(ans, a);
//         }
//         a = matrixMultiply(a, a);
//         n >>= 1;
//     }
//     return ans;
// };

// var climbStairs = function (n) {
//     if (n < 1) return 0;
//     const matrix = [
//         [1, 1],
//         [1, 0],
//     ];
//     const res = matrixPow(matrix, n - 1);
//     console.log(res);
//     return res[0][0];
// };

// console.log(climbStairs(3));

const pow = (x, n) => {
    if (!n) return 1;
    let ans = x;
    for (let i = 1; i < n; i++) {
        ans *= x;
    }
    return ans;
};
console.log("分割线__________________");
console.log(pow(2, 0));
console.log(pow(2, 1));
console.log(pow(2, 2));
console.log(pow(2, 3));
console.log(pow(2, 4));

const quickPow = (x, n) => {
    let ans = 1;
    let res = x;
    while (n) {
        if (n & 1) {
            ans *= res;
        }
        res *= res;
        n >>= 1;
    }
    return ans;
};

console.log("分割线__________________");
console.log(quickPow(2, 0));
console.log(quickPow(2, 1));
console.log(quickPow(2, 2));
console.log(quickPow(2, 3));
console.log(quickPow(2, 4));
console.log(quickPow(2, 16));



const fibo = (n) => {
    if (n<0) throw new Error('n can not less then 0')
    if (n === 0) return 0;
    if (n === 1) return 1;
    let fn_1 =  1;
    let fn_2 = 0;
    let fn;
    for (let i=2;i<=n;i++) {
        fn = fn_1 + fn_2;
        fn_2 = fn_1;
        fn_1 = fn;
    }
    return fn;
}

console.log("分割线__________________");
console.log(fibo(0))
console.log(fibo(1))
console.log(fibo(2))
console.log(fibo(3))
console.log(fibo(4))
console.log(fibo(5))
console.log(fibo(6))


const matrixMultiply = (a, b) => {
    const c = [[0,0],[0,0]];
    for(let i=0; i<2;i++) {
        for (let j=0;j<2;j++) {
            c[i][j] = a[i][0] * b[0][j] + a[i][1]*b[1][j];
        }
    }
    return c;
}

const matrixPow = (x, n) => {
    let ans = [[1,0],[0,1]];
    let res = x;
    while(n) {
        if (n&1) {
            ans = matrixMultiply(ans, res);
        }
        res = matrixMultiply(res, res);
        n>>=1;
    }
    return ans;
}

const matrixFibo = (n) => {
    if (n<0) throw new Error('n can not less then 0')
    if (n ==0) return 0;
    if (n === 1) return 1;
    const res = matrixPow([[1,1],[1,0]], n-1);
    return res[0][0];
}

console.log("分割线__________________");
console.log(matrixFibo(0))
console.log(matrixFibo(1))
console.log(matrixFibo(2))
console.log(matrixFibo(3))
console.log(matrixFibo(4))
console.log(matrixFibo(5))
console.log(matrixFibo(6))

