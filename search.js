const findHorizontal = (matrix, target, index) => {
    const nums = matrix[index]
    let start = index + 1;
    let end = nums.length-1;
    while(start<=end) {
        const center = start + (end-start>>1)
        if (nums[center] === target) {
            return true;
        }
        if (nums[center] > target) {
            end = center - 1;
        } else {
            start = center+1;
        }
    }
    return false;
}

const findVertival = (matrix, target, index) => {
    const nums = (i) => matrix[i][index];
    let start = index+1;
    let end = matrix.length - 1;
    while(start <= end) {
        const center = start + (end-start>>1);
        if (nums(center) === target) return true;
        if (nums(center) > target) {
            end = center -1;
        } else  {
            start = center+1;
        }
    }
    return false;
}


var searchMatrix = function(matrix, target,index=0) {
    if (index>matrix.length || index > matrix[0].length ||
        target < matrix[index][index]) return false;
    if (target === matrix[index][index]) return true;
    return findHorizontal(matrix, target, index) || 
            findVertival(matrix, target, index)  ||
            searchMatrix(matrix, target, ++index);

};

console.log(searchMatrix([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]],5))