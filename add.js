



var isPalindrome = function(x) {
    if (x < 0 || (x>=10 && x%10===0)) return false;
    if (x<10) return true;
    let revert = 0;
    while(revert < x) {
        revert = revert* 10 + x % 10;
         x = Math.floor(x / 10);
    }
    console.log(x, revert)
    return revert === x || revert/10 === x;
};
isPalindrome(11)
isPalindrome(121)


var removeDuplicates = function(nums) {
    if (!nums.length) return [];
    let size = 0;
    for (let i=1;i<nums.length;i++) {
        if (nums[size] !== nums[i]) {
            nums[++size] = nums[i]
        }
    }
    return nums.slice(0, size+1);
};

console.log(removeDuplicates([1,1,2]))


