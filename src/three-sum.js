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

var threeSum = function (nums) {
    quickSort(nums);
    const res = [];
    let pre;
    for (let i = 0; i < nums.length - 2; i++) {
        if (pre !== undefined && pre === nums[i]) continue;
        pre = nums[i];
        let left = i + 1;
        let right = nums.length - 1;
        let sum;˜
        while (left < right) {
            console.log(left, right)
            sum = nums[left] + nums[right];
            console.log('sum', sum)
            if (sum === -nums[i]) {
                res.push([nums[i], nums[left], nums[right]]);
                left++;
                right--;
            } else if (nums[i] > 0 && sum > nums[i]) {
                right--;
            } else {
                left++;
            }
        }
    }
    return res;

};

console.log(threeSum([-1, -1, 0, 1]))