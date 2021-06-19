/**
 * @param {number} k
 */
var MyCircularQueue = function (k) {
    this.values = [];
    this.maxSize = k;
    this.index = -1;
    this.size = 0;

};

/** 
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function (value) {
    if (this.size >= this.maxSize) return false;
    const newIndex = (this.index + 1) % this.maxSize
    this.values[newIndex] = value;
    this.index = newIndex;
    this.size++;
    return true;

};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function () {
    if (!this.size) return false;
    // const {
    //     index
    // } = this;
    // if (index === 0) this.index = this.maxSize - 1;
    // else if (index === this.maxSize - 1) this.index = 0;
    // else this.index--;
    this.size--;
    return true;
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Front = function () {
    if (!this.size) return -1;
    return this.values[this.index + 1 - this.size]
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function () {
    if (!this.size) return -1;
    return this.values[this.index];
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function () {
    return !this.size;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function () {
    return this.size = this.maxSize;
};

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */


const queue = new MyCircularQueue(8)
console.log(queue.enQueue(3))
console.log(queue.enQueue(9))
console.log(queue.enQueue(5))
console.log(queue.enQueue(0))

console.log(queue.deQueue(0))
console.log(queue.deQueue(0))

console.log(queue.isEmpty())
console.log(queue.isEmpty())
console.log(queue)
console.log(queue.Rear())
console.log(queue.Rear())
console.log(queue.deQueue())

["MyCircularQueue", "enQueue", "deQueue", "Front", "deQueue", "Front", "Rear", "enQueue", "isFull", "deQueue", "Rear", "enQueue"]
[
    [3],
    [7],
    [],
    [],
    [],
    [],
    [],
    [0],
    [],
    [],
    [],
    [3]
]

size = 3
index = 1
maxSize = 5
0, 1, 2, 3, 4

newIndex = (index + 1) > size？(index + 1) - size: maxSize - (size - index - 1)