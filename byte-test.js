var minSubArrayLen = function (target, nums) {
    if (!nums.length) return 0;
    let left = 0;
    let right = 0;
    let sum = 0;
    let min = 0;
    while (left < nums.length) {
        while (sum < target && right < nums.length) {
            sum += nums[right];
            right++;
        }
        console.log(left, right, sum, min)
        // if (sum>=target) {}
        if (sum >= target) {
            min = min === 0 ? right - left : Math.min(right - left, min);
        }
        sum -= nums[left]
        left++;
    }
    return min;

};
// console.log(minSubArrayLen(11, [2, 3, 1, 2, 4, 3]))

class TrieNode {
    constructor() {
        this.children = [];
        this.isEnd = false;
    }
    setEnd() {
        this.isEnd = true;
    }

    setChild(char) {
        const index = this.getIndex(char);
        if (!this.children[index]) {
            this.children[index] = new TrieNode();
        }
    }

    getChild(char) {
        return this.children[this.getIndex(char)];
    }

    getIndex(char) {
        return char.codePointAt(0) - 97;
    }

    has(char) {
        return !!this.children[this.getIndex(char)];
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (const char of word) {
            node.setChild(char);
            node = node.getChild(char);
        }
        node.word = word;
        node.setEnd();
    }

    startWith(word) {
        let node = this.root;
        for (const char of word) {
            node = node.getChild(char);
            if (!node) return false;
        }
        return true;
    }
}

// const trie = new Trie();
// trie.insert('hello')
// console.log(trie.startWith('hello'))
// console.log(trie);

var findWords = function (board, words) {
    const rows = board.length;
    if (!rows || !words.length) return [];
    const trie = new Trie();
    for (const word of words) {
        trie.insert(word);
    }
    console.log(trie)
    const cols = board[0].length;

    const res = [];
    const backTrack = (i, j, root) => {
        if (i < 0 || j < 0 || i >= rows || j >= cols) return;
        root = root && root.getChild(board[i][j]);
        if (!root) return;
        if (root.isEnd) {
            res.push(root.word);
        }
        backTrack(i - 1, j, root);
        backTrack(i + 1, j, root);
        backTrack(i, j - 1, root);
        backTrack(i, j + 1, root);
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (trie.startWith(board[i][j])) {
                backTrack(i, j, trie.root)
            }
        }
    }
    return res;
};

const res = findWords(
    [
        ["o", "a", "a", "n"],
        ["e", "t", "a", "e"],
        ["i", "h", "k", "r"],
        ["i", "f", "l", "v"]
    ],
    ["oath", "pea", "eat", "rain"]
)

console.log(res)


const quickSort = (nums) => {
    const swap = (a, b) => {
        if (a === b) return;
        const temp = nums[a];
        nums[a] = nums[b];
        nums[b] = temp;
    }
    const helper = (left, right) => {
        if (left >= right) return;
        const pivotIndex = left + ((right - left) >> 1);
        const pivot = nums[pivotIndex];
        swap(pivotIndex, right);
        let index = left;
        for (let i = left; i < right; i++) {
            if (nums[i] > pivot) {
                swap(index, i);
                index++;
            }
        }
        swap(index, right);
        helper(left, index - 1);
        helper(index + 1, right);
    }
    helper(0, nums.length - 1);
}
const nums = [3, 2, 1, 5, 6, 4]
quickSort(nums)
console.log(nums)