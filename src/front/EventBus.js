class EventBus {

  constructor() {
    this.eventMap = new Map();
  }

  on(name, fn) {
    if (!this.eventMap.has(name)) {
      this.eventMap.set(name, new Set());
    }
    const fnSet = this.eventMap.get(name);
    if(!fnSet.has(fn)) {
      fnSet.add(fn);
    }
  }

  off(name, fn) {
    const fnSet = this.eventMap.get(name);
    if (fnSet?.has(fn)) {
      fnSet.delete(fn);
    }
  }

  once(name, fn) {
    const handle = (...args) => {
      fn(...args);
      this.off(name,handle);
    }
    this.on(name, handle);
  }


  emit(name, ...args) {
    const fnSet = this.eventMap.get(name);
    if (!fnSet) return ;
    for (const fn of fnSet) {
      fn(...args);
    }
  }
}

module.exports = EventBus;
