/**
 * 快排， 平均时间复杂度O(nlogn)
 * @param {}} nums 
 */

const quickSort = (nums) => {
    if (nums.length <=1) return nums;
    const small = [];
    const big = [];
    const targetIndex = Math.floor(nums.length/2);
    const target = nums.splice(targetIndex, 1)[0];
    for (let i=0;i<nums.length;i++) {
        if (nums[i] <= target){
            small.push(nums[i])
        } else {
            big.push(nums[i])
        }
    }
    return quickSort(small).concat([target],quickSort(big));
}


console.log(quickSort([12,34,0,2,12,2342,5,3451,12312]))

const swap = (nums, aIndex, bIndex) => {
    if (aIndex === bIndex) return;
    const num = nums[aIndex]
    nums[aIndex] = nums[bIndex];
    nums[bIndex] = num;
}
const partition = (nums, left, right, pivotIndex) => {
    const pivot = nums[pivotIndex];
    swap(nums, right, pivotIndex);
    let index = left;
    for (let i = left+1; i< right;i++) {
        if (nums[i] <= pivot) {
            swap(nums, i, index)
            index += 1;
        }
    }
    swap(nums, index, right)
    return index;
}

/**
 * 优化版本 空间复杂度 O(1)
 * @param {}} nums 
 * @param {*} left 
 * @param {*} right 
 */
const quickSortOptimize = (nums, left=0, right=nums.length-1) => {
    if (left >=right) return nums;
    const pivotIndex = partition(nums, left, right, Math.floor((left+right)/2))
    quickSortOptimize(nums,left, pivotIndex-1)
    quickSortOptimize(nums,pivotIndex+1,right)
    return nums;
}


// console.log(quickSortOptimize([12,34,0,2,12,2342,5,3451,12312]))

const myQuickSort = (nums, left=0,right=nums.length-1) => {
    if (left >= right) return;
    let pivotIndex = (left + right)>>1;
    const pivot = nums[pivotIndex];
    swap(nums, pivotIndex, right);
    let index = left;
    for (let i=left;i<=right;i++) {
        if (nums[i] < pivot) {
            swap(nums, index, i);
            index++;
        }
    }
    swap(nums, index, right);
    myQuickSort(nums,left, index-1);
    myQuickSort(nums,index+1, right);
}
const nums_1 = [12,34,0,2,12,2342,5,3451,12312]
myQuickSort(nums_1);
console.log('1213',nums_1);

