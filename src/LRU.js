function LinkNode(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
}


var LRUCache = function (capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = new LinkNode();
    this.tail = new LinkNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
};


LRUCache.prototype.get = function (key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this.moveToHead(node);
    return node.value;
};

LRUCache.prototype.put = function (key, value) {
    let node = this.map.get(key);
    if (node) {
        node.value = value;
        this.moveToHead(node);
    } else {
        node = new LinkNode(key, value);
        console.log(node)
        this.addToHead(node);
        this.map.set(key, node);
        if (this.map.size > this.capacity) {
            const tail = this.tail.prev
            this.remove(tail);
            this.map.delete(tail.key)
        }

    }
};

LRUCache.prototype.addToHead = function (node) {
    console.log('addToHead:', node);
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
};

LRUCache.prototype.remove = function (node) {
    if (!node) return;
    node.prev.next = node.next;
    node.next.prev = node.prev;
};

LRUCache.prototype.moveToHead = function (node) {
    this.remove(node);
    this.addToHead(node);
};

// ["LRUCache","put","put"]
// [[2],[2,1],[2,2]]


const lru = new LRUCache(2);
lru.put(2, 1);
lru.put(2, 2);