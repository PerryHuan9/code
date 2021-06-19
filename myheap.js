class MyHeap {
    constructor(arr = [], isMinHeap = false) {
        this.values = isMinHeap ? arr.map(val => -val) : arr;
        this.isMinHeap = isMinHeap;
        let i = this.size >> 1;
        while (i >= 0) {
            this.downHeapify(i)
            i--;
        }
    }

    get size() {
        return this.values.length;
    }

    peek() {
        if (this.isMinHeap) return -this.values[0];
        return this.values[0];
    }

    pop() {
        if (!this.size) return undefined;
        const val = this.peek();
        const lastVal = this.values.pop();
        if (this.size) {
            this.values[0] = lastVal;
            this.downHeapify(0);
        }
        return val;
    }

    push(val) {
        const index = this.size;
        this.values[index] = this.isMinHeap ? -val : val;
        this.upHeapify(index);
    }

    swap(a, b) {
        if (a === b) return;
        const temp = this.values[a];
        this.values[a] = this.values[b];
        this.values[b] = temp;
    }

    downHeapify(index) {
        const {
            values,
            size
        } = this;
        const lIndex = 2 * index + 1;
        const rIndex = lIndex + 1;
        let max = index;
        if (lIndex < size && values[lIndex] > values[max]) {
            max = lIndex;
        }

        if (rIndex < size && values[rIndex] > values[max]) {
            max = rIndex;
        }
        if (max !== index) {
            this.swap(max, index);
            this.downHeapify(max);
        }
    }

    upHeapify(index) {
        const {
            values
        } = this;
        const pIndex = (index - 1) >> 1;
        if (pIndex >= 0 && values[index] > values[pIndex]) {
            this.swap(pIndex, index);
            this.upHeapify(pIndex);
        }
    }

}


const heap = new MyHeap();
[3, 1, 5, 99, 1, 23, 345, 56, 1, 123234, 234, 234].forEach(element => {
    heap.push(element)
});
console.log(heap.pop());
console.log(heap.pop());
console.log(heap.pop());
console.log(heap.pop());
console.log(heap.pop());
console.log(heap.pop());
console.log(heap.pop());
console.log(heap.pop());
console.log(heap.pop());
console.log(heap.pop());
console.log(heap.pop());
console.log(heap.pop());
console.log(heap.pop());
console.log('-------------')
const minHeap = new MyHeap([], true);
[3, 1, 5, 99, 1, 23, 345, 56, 1, 123234, 234, 234].forEach(element => {
    minHeap.push(element)
});
console.log(minHeap.pop());
console.log(minHeap.pop());
console.log(minHeap.pop());
console.log(minHeap.pop());
console.log(minHeap.pop());
console.log(minHeap.pop());
console.log(minHeap.pop());
console.log(minHeap.pop());
console.log(minHeap.pop());
console.log(minHeap.pop());
console.log(minHeap.pop());