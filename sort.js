var merge2 = function(nums1, m, nums2, n) {
    if (n=== 0) return;
    let index1 = 0;
    let index2 = 0;
    while(nums2 < n) {
        console.log(index1, index2)
        if (index1 >= m) {
            nums1.splice(index1,n-index2, ...nums2.slice(index2, n))
            break;
        }
        if (nums1[index1] > nums2[index2]) {
            nums1.splice(index1, 0, nums2[index2]);
            nums1.length -= 1;
            m++;
            index2++;
        }
        index1++;
    }
    
};
var merge = function(nums1, m, nums2, n) {
    if (n=== 0) return;
    let index1 = 0;
    let index2 = 0;
    let index=0;
    let result = new Array(nums1.length);
    while(index1 < m && index2 < n) {
        console.log(index1, index2, m, n)
       result[index++] = nums1[index1]<nums2[index2] ? nums1[index1++] : nums2[index2++];
    }
    nums1.splice(0, nums1.length, ...result)
    
};

const a = [1,2,3,0,0,0]
const b = [2,5,6];
merge(a, 3,b ,3);
console.log(a)