class Heap {
    /**
     * 直接堆化 O(n)
     * @param {} arr 
     * @param {*} type 
     */
    constructor(arr=[], type=Heap.MAX) {
        this.isMax = type === Heap.MAX;
        this.heap = this.isMax ? [...arr] : arr.map(val => -val);
        const len = arr.length
        let i = len >> 1;
        while(i>=0) {
            this.heapify(i);
            i--;
        }
    }
    swap(a, b) {
        if(a === b) return;
        const arr = this.heap;
        const temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    }
    /**
     * 添加元素 O(logn)
     * @param {*} val 
     */
    push(val) {
        const len = this.heap.length;
        this.heap[len] = this.isMax ? val : -val;
        this.upHeapify(len);
    }
    /**
     * 删除元素
     */
    pop() {
        const len = this.heap.length;
        if (len <= 0) return undefined;
        const res = this.heap[0]
        this.heap[0] = this.heap[len-1];
        this.heap.length--;
        this.heapify(0);
        return this.isMax ? res : -res;
    }

    top() {  
        const top = this.heap[0];
        return this.isMax ? top : -top;
    }

    size() {
        return this.heap.length;
    }
    /**
     * 向上堆化
     * @param {} index 
     */
    upHeapify(index) {
        const parent = (index-1)>>1;
        const { heap } = this
        if (parent>=0 && heap[parent]<heap[index]){
            this.swap(parent, index);
            this.upHeapify(parent);
        }
    }
    /**
     * 向下堆化
     * @param {} index 
     */
    heapify(index) {
        const arr = this.heap;
        const len = arr.length;
        const l = 2*index +1;
        const r = l+1;
        let largest = index;
        if (l<len && arr[l] >arr[largest]) {
            largest = l;
        }
        if (r<len && arr[r] > arr[largest]) {
            largest = r;
        }
        if (largest !== index) {
            this.swap(largest, index);
            this.heapify(largest);
        }
    }
}
Heap.MAX = 1;
Heap.MIN = 0;

const arr = [12, 32,23,1,2,23,34,66,23,12,17,89];

const maxHeap = new Heap(arr, Heap.MIN);
console.log(maxHeap.heap)
maxHeap.pop();
console.log(maxHeap.heap)
maxHeap.pop();
console.log(maxHeap.heap)
maxHeap.pop();
console.log(maxHeap.heap)
maxHeap.pop();
console.log(maxHeap.heap)

console.log('————————————————————————')

maxHeap.push(88)
console.log(maxHeap.heap)
maxHeap.push(55)
console.log(maxHeap.heap)
maxHeap.push(99)
console.log(maxHeap.heap)
maxHeap.push(22)
console.log(maxHeap.heap)
maxHeap.push(1)
console.log(maxHeap.heap)
maxHeap.push(10)
console.log(maxHeap.heap)




