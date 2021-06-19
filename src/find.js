/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
const quickSort = (nums) => {
    const swap = (a, b) => {
        if (a === b) return;
        const temp = nums[a];
        nums[a] = nums[b];
        nums[b] = temp;
    }
    const helper = (left, right) => {
        if (left >= right) return;
        const pivotIndex = (left + right) >> 1;
        const pivot = nums[pivotIndex];
        swap(pivotIndex, right);
        let index = left;
        for (let i = left; i < right; i++) {
            if (nums[i] < pivot) {
                swap(i, index);
                index++;
            }
        }
        swap(index, right);
        helper(left, index - 1);
        helper(index + 1, right);
    }
    helper(0, nums.length - 1);
}

var findBestValue = function (arr, target) {
    if (!arr.length) return 0;
    quickSort(arr);
    console.log(arr)
    const len = arr.length;
    const prefix = [0];
    for (let i = 1; i <= len; i++) {
        prefix[i] = prefix[i - 1] + arr[i - 1];
    }
    const getSum = (val) => {
        if (val > arr[len - 1]) return prefix[len];
        let left = 0;
        let right = len - 1;
        let mid;
        let target;
        while (left < right) {
            console.log(left, right);
            mid = (left + right) >> 1;
            if (arr[mid] >= val) {
                right = mid;
                target = mid;
            } else {
                left = mid + 1;
            }
        }
        console.log('getSum', val);
        return target === undefined ? prefix[len] : prefix[target] + (len - target) * val;
    }

    const check = (val) => {
        let sum = 0;
        for (const a of arr) {
            sum += Math.min(a, val);
        }
        return sum;
    }

    let left = 0;
    let right = arr[len - 1];
    let mid;
    let ans;
    while (left <= right) {
        mid = (left + right) >> 1;
        const sum = getSum(mid);
        if (sum <= target) {
            left = mid + 1;
            ans = mid;
        } else {
            right = mid - 1;
        }
    }
    const sum1 = check(ans)
    const sum2 = check(ans + 1)
    return Math.abs(sum1 - target) > Math.abs(sum2 - target) ? ans + 1 : ans;
};


console.log(findBestValue([4, 9, 3], 10))