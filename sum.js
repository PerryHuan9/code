var twoSum = function (nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) {
            map.set(nums[i], [...map.get(nums[i]), i]);
        } else {
            map.set(nums[i], [i]);
        }
    }

    for (let i = 0; i < nums.length; i++) {
        const target2 = target - nums[i];
        const res = map.get(target2);
        if (!res) continue;
        if (target2 === nums[i]) {
            if (res.length > 1) {
                return res;
            } else {
                continue
            }
        }
        console.log(res)
        res.push(i)
        return res;
    }
};


// console.log(twoSum([3,2,4],6))
var findMedianSortedArrays = function (nums1, nums2) {
    const len1 = nums1.length;
    const len2 = nums2.length;
    const centerIndex = (len1 + len2) >> 1
    let index1 = 0;
    let index2 = 0;
    let index = 0;
    let val;
    let preVal;
    while (index <= centerIndex) {
        console.log(preVal, val)
        preVal = val;
        if (index2 >= len2 || nums1[index1] < nums2[index2]) {
            val = nums1[index1]
            index1++;
        } else {
            val = nums2[index2]
            index2++;
        }
        index++;
    }

    return (len1 + len2) % 2 ? val : (preVal + val) / 2
};

// console.log(findMedianSortedArrays([1,2],[1, 2]));

var reverse = function (x) {
    let res = 0;
    const powVal = Math.pow(2, 31)
    const MIN_VAL = -powVal;
    const MAX_VAL = powVal - 1
    while (x) {
        let pop = x % 10;
        console.log(res)
        if (res > MAX_VAL / 10 || res < MIN_VAL / 10) return 0;
        res = res * 10 + pop;
        x = Math.floor(x / 10);
    }
    return res;
};

// console.log(reverse(-123))

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

var buildTree = function (inorder, postorder) {
    if (postorder.length == 0) {
        return null;
    }
    const root = new TreeNode(postorder[postorder.length - 1]);
    const stack = [];
    stack.push(root);
    let inorderIndex = inorder.length - 1;
    for (let i = postorder.length - 2; i >= 0; i--) {
        let postorderVal = postorder[i];
        let node = stack[stack.length - 1];
        if (node.val !== inorder[inorderIndex]) {
            node.right = new TreeNode(postorderVal);
            stack.push(node.right);
        } else {
            console.log('hel', stack[stack.length - 1], inorder[inorderIndex])
            while (stack.length && stack[stack.length - 1].val === inorder[inorderIndex]) {
                node = stack.pop();
                inorderIndex--;
            }
            console.log(node, inorder[inorderIndex])
            node.left = new TreeNode(postorderVal);
            stack.push(node.left);
        }
    }
    return root;
};

// buildTree([9,3,15,20,7],[9,15,7,20,3])

var searchInsert = function (nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
        console.log('start', left, right)
        const center = left + ((right - left) >> 1);
        console.log('c', center)
        if (nums[center] === target) {
            return center;
        } else if (nums[center] > target) {
            right = center - 1;
        } else {
            left = center + 1;
        }
        console.log('end', left, right)
    }
    return left;
};

// console.log(searchInsert([1, 3, 5, 6], 2))

const data = [
    ["1", "0", "0", "1", "1", "1", "0", "1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["1", "0", "0", "1", "1", "0", "0", "1", "0", "0", "0", "1", "0", "1", "0", "1", "0", "0", "1", "0"],
    ["0", "0", "0", "1", "1", "1", "1", "0", "1", "0", "1", "1", "0", "0", "0", "0", "1", "0", "1", "0"],
    ["0", "0", "0", "1", "1", "0", "0", "1", "0", "0", "0", "1", "1", "1", "0", "0", "1", "0", "0", "1"],
    ["0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["1", "0", "0", "0", "0", "1", "0", "1", "0", "1", "1", "0", "0", "0", "0", "0", "0", "1", "0", "1"],
    ["0", "0", "0", "1", "0", "0", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1"],
    ["0", "0", "0", "1", "0", "1", "0", "0", "1", "1", "0", "1", "0", "1", "1", "0", "1", "1", "1", "0"],
    ["0", "0", "0", "0", "1", "0", "0", "1", "1", "0", "0", "0", "0", "1", "0", "0", "0", "1", "0", "1"],
    ["0", "0", "1", "0", "0", "1", "0", "0", "0", "0", "0", "1", "0", "0", "1", "0", "0", "0", "1", "0"],
    ["1", "0", "0", "1", "0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "1", "0", "1", "0", "1", "0"],
    ["0", "1", "0", "0", "0", "1", "0", "1", "0", "1", "1", "0", "1", "1", "1", "0", "1", "1", "0", "0"],
    ["1", "1", "0", "1", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "1"],
    ["0", "1", "0", "0", "1", "1", "1", "0", "0", "0", "1", "1", "1", "1", "1", "0", "1", "0", "0", "0"],
    ["0", "0", "1", "1", "1", "0", "0", "0", "1", "1", "0", "0", "0", "1", "0", "1", "0", "0", "0", "0"],
    ["1", "0", "0", "1", "0", "1", "0", "0", "0", "0", "1", "0", "0", "0", "1", "0", "1", "0", "1", "1"],
    ["1", "0", "1", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "1", "0", "1", "0", "0", "0", "0"],
    ["0", "1", "1", "0", "0", "0", "1", "1", "1", "0", "1", "0", "1", "0", "1", "1", "1", "1", "0", "0"],
    ["0", "1", "0", "0", "0", "0", "1", "1", "0", "0", "1", "0", "1", "0", "0", "1", "0", "0", "1", "1"],
    ["0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "0", "1", "0", "0", "0", "1", "1", "0", "0", "0"]
]
var numIslands = function (grid) {
    const rows = grid.length;
    if (!rows) return 0;
    const cols = grid[0].length;

    const set = new Set();
    const dfs = (row, col) => {
        if (
            row < 0 ||
            row >= rows ||
            col < 0 ||
            col >= cols ||
            grid[row][col] === '0' ||
            set.has(row + '-' + col)
        ) return;
        set.add(row + '-' + col);
        dfs(row - 1, col);
        dfs(row + 1, col);
        dfs(row, col - 1);
        dfs(row, col + 1);
    }


    let island = 0;
    let count = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                count++;
            }
            if (grid[i][j] === '1' && !set.has(i + '+' + j)) {
                dfs(i, j);
                island++;
            }
        }
    }
    console.log(set, set.size, count)
    return island;
};

// numIslands(data);


const promise = new Promise((resolve) => {
    resolve({
        then(fn) {
            fn && fn('hello')
        }
    })
})
promise.then((result) => {
    console.log('hel', result);
}).then().then((val) => {
    // console.log(val);
    throw new Error('王荣大')
}).finally(() => {
    console.log('finally');
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('hello world')
        }, 3000);
    })
}).then((val) => {
    console.log('then ' + val);
}).catch(e => {
    console.log('catch', e.message);
})